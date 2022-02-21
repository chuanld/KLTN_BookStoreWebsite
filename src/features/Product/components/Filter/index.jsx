import {
  Apps,
  Loyalty,
  Search,
  ViewList,
  Mic,
  MicOff,
} from '@mui/icons-material'
import React, { useRef, useState, useEffect } from 'react'

import ProTypes from 'prop-types'

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResult = true
mic.lang = 'vi-VN'
Filters.propTypes = {
  onSubmit: ProTypes.func,
}
Filters.defaultProps = {
  onSubmit: null,
}
function Filters(props) {
  const { onSubmit, params } = props
  const [searchFT, setSearchFT] = useState('')
  const [isListen, setIsListen] = useState(false)
  const typingTimeOutRef = useRef(null)

  // const handleCategory = (e) => {
  //   setCategory(e.target.value);
  //   setSearch("");
  // };
  const handleSearchChange = (e) => {
    // if (e.target.value) {
    setSearchFT(e.target.value)
    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current)
    }
    typingTimeOutRef.current = setTimeout(() => {
      const formValues = {
        'title[regex]': e.target.value,
      }
      onSubmit(formValues)
    }, 1500)
    // }
  }

  useEffect(() => {
    handleListen()
    // eslint-disable-next-line
  }, [isListen])

  const handleListen = () => {
    if (isListen) {
      mic.start()
      mic.onend = () => {
        console.log('we are listening you...')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('On the mic')
    }
    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('')
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      console.log(transcript)
      setSearchFT(transcript)
      if (typingTimeOutRef.current) {
        clearTimeout(typingTimeOutRef.current)
      }
      typingTimeOutRef.current = setTimeout(() => {
        const formValues = {
          'title[regex]': transcript,
        }
        onSubmit(formValues)
      }, 1500)
      mic.onerror = (event) => {
        console.log(event.error)
      }
    }
  }
  const handleChangeMic = () => {
    if (isListen) {
      setIsListen((prevState) => !prevState)
    } else {
      setIsListen((prevState) => !prevState)
      setSearchFT('')
    }
  }

  const handleSortSelect = (value) => {
    if (!onSubmit) return
    if (!value) {
      const newParams = { ...params }
      delete newParams['sort']
      onSubmit({ ...newParams })
      return
    }
    if (params['sort'] === value) {
      return
    } else {
      onSubmit({ ...params, sort: value })
    }
  }
  const handleSortTagNew = () => {
    if (!onSubmit) return
    if (!params['sort']) {
      return
    }
    const newParams = { ...params }
    delete newParams['sort']
    onSubmit(newParams)
  }
  const handleSortTagAsc = () => {
    if (!onSubmit) return
    if (params['sort'] === 'price') {
      const newParams = { ...params }
      delete newParams['sort']
      onSubmit(newParams)
    } else {
      const newParams = { ...params }
      onSubmit({ ...newParams, sort: 'price' })
    }
  }
  const handleSortTagDesc = () => {
    if (!onSubmit) return
    if (params['sort'] === '-price') {
      const newParams = { ...params }
      delete newParams['sort']
      onSubmit(newParams)
    } else {
      const newParams = { ...params }
      onSubmit({ ...newParams, sort: '-price' })
    }
  }
  const handleSortTagSold = () => {
    if (!onSubmit) return
    if (params['sort'] === '-sold') {
      const newParams = { ...params }
      delete newParams['sort']
      onSubmit(newParams)
    } else {
      onSubmit({ ...params, sort: '-sold' })
    }
  }

  return (
    <>
      {/* <div className="filters">
        <ul>
          <li className="active" data-filter="*">
            All Products
          </li>
          <li data-filter=".des">Featured</li>
          <li data-filter=".dev">Flash Deals</li>
          <li data-filter=".gra">Last Minute</li>
        </ul>
      </div> */}
      <div className='filters'>
        <div className='filter-menu '>
          <div className='row'>
            {/* <span>Categories: </span>
            <select name="category" value={category} onChange={handleCategory}>
              <option value="">All Product</option>
              {categories.map((category) => (
                <option value={"category=" + category.name} key={category._id}>
                  {category.name}
                </option>
              ))}
            </select> */}
            <Apps />
            <ViewList />
          </div>
          <div className='search_input'>
            {isListen ? (
              <MicOff onClick={() => handleChangeMic()} />
            ) : (
              <Mic onClick={() => handleChangeMic()} />
            )}

            <Search />
            <input
              type='text'
              value={searchFT}
              placeholder={isListen ? 'Talk to search...' : 'Enter your search'}
              onChange={(e) => handleSearchChange(e)}
            />
          </div>
          <div className='search_input'>
            <span>Sort By: </span>
            <select
              value={params['sort'] ? params['sort'] : ''}
              onChange={(e) => handleSortSelect(e.target.value)}
            >
              <option value=''>Newest</option>
              <option value='oldest'>Oldest</option>
              <option value='-sold'>Best Seller</option>
              <option value='-price'>Price: Hight-Low</option>
              <option value='price'>Price: Low-Hight</option>
            </select>
          </div>
        </div>
        <div className='hastag-sort'>
          <div className='hastag-tag'>
            <div className='tag-title'>
              <Loyalty />
              <i>Tags</i>
            </div>
            <div className='tag-content'>
              <ul>
                <li
                  className={!params['sort'] ? 'active' : ''}
                  onClick={() => handleSortTagNew()}
                >
                  New product
                </li>
                <li
                  className={params['sort'] === '-sold' ? 'active' : ''}
                  onClick={() => handleSortTagSold()}
                >
                  Top Sale
                </li>
                <li
                  className={params['sort'] === 'price' ? 'active' : ''}
                  onClick={() => handleSortTagAsc()}
                >
                  Inexpensive
                </li>
                <li
                  className={params['sort'] === '-price' ? 'active' : ''}
                  onClick={() => handleSortTagDesc()}
                >
                  Expensive
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Filters
