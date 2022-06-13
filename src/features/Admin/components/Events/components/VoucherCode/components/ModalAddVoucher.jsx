import React from 'react'
import Modal from 'react-modal'
import FormAddVoucher from './FormAddVoucher'

Modal.setAppElement(document.getElementById('root'))
const customStyles1 = {
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
function ModalAddVoucher({
  isOpenModal,

  afterOpenModal,
  closeModal,
  onSubmit,
}) {
  return (
    <>
      <Modal
        isOpen={isOpenModal}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles1}
        //portalClassName="modal"
        contentLabel='Example Modal'
      >
        <button className='btnclose-modal' onClick={closeModal}>
          X
        </button>
        <div className='edit-modal-voucher'>
          <div className='edit-container'>
            {/* <FormEditVoucher
            voucher={voucher}
            onSubmit={handleSubmitUpdateVoucher}
          /> */}
            <FormAddVoucher onSubmit={onSubmit} />
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ModalAddVoucher
