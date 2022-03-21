import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'

Modal.setAppElement(document.getElementById('root'))
const customStyles2 = {
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    border: 'none',
    zIndex: '999',
  },
  content: {
    top: '375px',
    overflow: 'unset',
    border: 'none',
    background: 'transparent',
    height: 'auto',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}
function ModalCategory(props) {
  const { category, modalIsOpen, afterOpenModal, closeModal, onSubmit } = props
  const [tempCate, setTempCate] = useState('')
  useEffect(() => {
    setTempCate(category)
  }, [category])

  const createCategory = (e) => {
    e.preventDefault()
    if (!onSubmit) return
    onSubmit(tempCate)
  }
  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles2}
      //portalClassName="modal"
      contentLabel='Example Modal'
    >
      <button className='btnclose-modal' onClick={closeModal}>
        X
      </button>
      <div className='categories-create'>
        <form onSubmit={createCategory}>
          <label htmlFor='category'>Category Management</label>
          <input
            type='text'
            name='category'
            value={tempCate}
            required
            onChange={(e) => setTempCate(e.target.value)}
          />

          <button type='submit'>{category !== '' ? 'Update' : 'Save'}</button>
        </form>
      </div>
    </Modal>
  )
}

export default ModalCategory
