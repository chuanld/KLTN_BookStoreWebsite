import React, { useEffect, useRef } from 'react'
import { AccountCircle, SendAndArchive } from '@mui/icons-material'

function ReplyCommentItem({ id, name, onSubmit }) {
  const contentRef = useRef(null)
  useEffect(() => {
    if (name) {
      contentRef.current.innerHTML = `<a href="#!" style="color: crimson; font-weight: 600; text-transform: capitalize;">${name}:&ensp;</a>`
    }
  }, [name])
  const handleSubmitReply = () => {
    if (!onSubmit) return
    onSubmit(contentRef.current.innerHTML)
    contentRef.current = ''
  }
  return (
    <>
      <div className='reply-comment-outer'>
        <div className='reply-comment-avt'>
          <AccountCircle />
        </div>
        <div className='reply-comment-wrapper'>
          <div
            className='div-textarea'
            ref={contentRef}
            contentEditable='true'
          ></div>

          <div
            className='btn-send_reply'
            style={{ minHeight: '40px' }}
            onClick={handleSubmitReply}
          >
            <SendAndArchive />
          </div>
        </div>
      </div>
    </>
  )
}

export default ReplyCommentItem
