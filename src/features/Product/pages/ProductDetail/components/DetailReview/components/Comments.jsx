import React, { useState, useEffect, useMemo } from 'react'
import { Rating } from '@mui/material'
import moment from 'moment'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import commentApi from 'api/commentApi'
import { useParams, useLocation, useHistory } from 'react-router-dom'
import { AccountCircle, SendAndArchive } from '@mui/icons-material'
import CommentItem from './CommentItem'
import LoadingComment from './LoadingComment'
import Paginate from './Paginate'
import FilterTab from './FilterTab'

const queryString = require('query-string')
/*Note queryString: obj{
    limit,  page,  sort, rating
}
End note */
function Comments(props) {
  const { id } = useParams()
  const history = useHistory()
  const location = useLocation()
  const { product_id, info, user, socket } = props
  const [comments, setComments] = useState([])
  const [onReply, setOnReply] = useState(false)
  const [isHideAll, setIsHideAll] = useState(false)
  const [loading, setLoading] = useState(false)

  //query
  const [page, setPage] = useState()
  const [totalPage, setTotalPage] = useState()
  const [result, setResult] = useState()
  const [totalResult, setTotalResult] = useState()
  const [callback, setCallback] = useState(false)
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search)
    console.log(params, 'queryParams Comment')
    return {
      ...params,
    }
  }, [location.search])
  const handleFilterChanges = (values) => {
    console.log(values, 'filterChange')
    const filters = {
      ...values,
    }
    // if (filters['title[regex]'] && filters['title[regex]'] !== ' ') {
    //   const newHisSearch = [...hisSearch]
    //   newHisSearch.unshift(filters['title[regex]'])
    //   const rmMultiSearch = Array.from(new Set(newHisSearch))
    //   setHisSearch(rmMultiSearch)
    //   localStorage.setItem('hisSearch', JSON.stringify(rmMultiSearch))
    // } else {
    //   delete filters['title[regex]']
    // }

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    })
  }

  const getComments = async () => {
    try {
      setLoading(true)
      const res = await commentApi.getComments(product_id, queryParams)
      setComments(res.comments)
      setPage(res.page)
      setResult(res.result)
      setTotalResult(res.totalResult)
      setTotalPage(Math.ceil(res.totalResult / 9))
    } catch (err) {}
    setLoading(false)
  }
  useEffect(() => {
    if (user) {
      getComments()
    }
    return () => {
      setComments([])
    }
    // eslint-disable-next-line
  }, [user, id, product_id, queryParams, callback])

  //Realtime + received comment
  useEffect(() => {
    if (socket) {
      socket.on('sendCommentToClient', (msg) => {
        setComments([msg, ...comments])
      })
    }
    return () => socket.off('sendCommentToClient')
  }, [socket, comments])

  //Realtime + received ReplyComment
  useEffect(() => {
    if (socket) {
      socket.on('sendReplyCommentToClient', (msg) => {
        // setComments([msg, ...comments])

        const newComments = [...comments]
        newComments.forEach((cm) => {
          if (cm._id === msg._id) {
            cm.reply = msg.reply
          }
        })
        setComments(newComments)
        setLoading(false)
      })
    }
    return () => socket.off('sendReplyCommentToClient')
  }, [socket, comments])

  const handleSubmitReply = async (values) => {
    try {
      if (!values) return
      if (!values.content || values.content.trim().length < 5)
        return toast.warn('Comment must be at least 5 characters')
      console.log(values)
      setLoading(true)
      socket.emit('createComment', {
        idComment: values.idComment,
        username: values.username,
        content: values.content,
        product_id: values.product_id,
        createdAt: values.createdAt,
        send: values.send,
      })

      // const res = await commentApi.updateRating(product._id, values.rate)
      // toast.success(res.msg)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <FilterTab params={queryParams} onSubmit={handleFilterChanges} />
      {loading && <LoadingComment />}
      {comments.length !== 0 &&
        comments.map((comment) => (
          <div className="" key={comment._id}>
            <CommentItem
              key={comment._id}
              info={info}
              comment={comment}
              onSubmit={handleSubmitReply}
            />
          </div>
        ))}
      <Paginate
        params={queryParams}
        page={page}
        countPage={totalPage}
        onSubmit={handleFilterChanges}
      />
    </>
  )
}

export default Comments
