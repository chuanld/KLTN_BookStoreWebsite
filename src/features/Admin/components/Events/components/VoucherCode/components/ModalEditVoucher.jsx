import React from 'react'
import Modal from 'react-modal'
import FormEditVoucher from './FormEditVoucher'

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
function ModalEditVoucher({
  isOpenModal,
  voucher,
  afterOpenModal,
  closeModal,
  handleSubmitUpdateVoucher,
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
            <FormEditVoucher
              voucher={voucher}
              onSubmit={handleSubmitUpdateVoucher}
            />
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ModalEditVoucher
