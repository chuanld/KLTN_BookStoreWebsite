import categoryApi from 'api/categoryApi'
import React, { useState, useEffect } from 'react'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import TableCategories from './components/TableCategories'
import ModalCategory from './components/ModalCategory'

function Categories() {
  const [categories, setCategories] = useState([])
  const [onEdit, setOnEdit] = useState(false)

  const [modalIsOpen, setIsOpen] = useState(false)
  const [selectionRow, setSelectionRow] = useState([])
  const [category, setCategory] = useState('')
  const [id, setID] = useState('')
  const [callback, setCallback] = useState(false)
  const getCategories = async () => {
    try {
      const res = await categoryApi.getCategories()
      setCategories(res)
    } catch (err) {}
  }
  useEffect(() => {
    getCategories()
  }, [callback])
  //
  const createCategory = async (values) => {
    try {
      if (onEdit) {
        const res = await categoryApi.updateCategories(id, values)
        toast.success(res.msg)
      } else {
        const res = await categoryApi.createCategories(values)
        toast.success(res.msg)
      }
      setOnEdit(false)
      setCategory('')
      setCallback(!callback)
    } catch (err) {
      toast.error(err.response.msg)
    }
  }
  //
  const handleOpenCreateCate = () => {
    setCategory('')
    setOnEdit(false)
    openModal()
  }
  function openModal() {
    setIsOpen(true)
  }
  function closeModal() {
    setIsOpen(false)
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = "#f000";
  }
  const submitSelectRow = (selects) => {
    if (!selects) return

    setSelectionRow(selects)
  }
  const handleFilterChange = (values) => {}

  const handleOpenEditCate = (id, name) => {
    openModal()
    const Cate = categories.filter((item) => item._id === id)
    setID(id)
    setCategory(Cate[0].name)

    setOnEdit(true)
  }
  const handleDeleteItem = async (id) => {
    //Delete Item
    try {
      const res = await categoryApi.deleteCategories(id)
      toast.success(res.msg)
      setOnEdit(false)
      setCategory('')
      setCallback(!callback)
    } catch (err) {
      toast.error(err.response.data.msg)
    }
  }
  const handleDeleteListItem = () => {
    //Delete Items
    if (
      window.confirm(
        `Are you sure about action delete  (${selectionRow.length}) categories`
      )
    ) {
      selectionRow.forEach((item) => {
        handleDeleteItem(item.toString())
      })
    }
    setOnEdit(false)
    setCategory('')
  }
  return (
    <>
      <div className="categoriesList">
        <div className="categoriesListTitle">
          <h4>System have {categories.length} categories</h4>
          <div className="create-category">
            {selectionRow.length !== 0 && (
              <button
                className="productDelAllButton"
                onClick={handleDeleteListItem}
              >
                Delete ({selectionRow.length})
              </button>
            )}
            {selectionRow.length === 1 ? (
              <button
                className="btn-create-category"
                onClick={() => handleOpenEditCate(selectionRow[0].toString())}
              >
                Edit item
              </button>
            ) : (
              <button
                className="btn-create-category"
                onClick={handleOpenCreateCate}
              >
                Create Cate
              </button>
            )}
          </div>
        </div>
        <div className="categories-list">
          <TableCategories
            categories={categories}
            onSubmit={handleFilterChange}
            selectionRow={selectionRow}
            submitSelectRow={submitSelectRow}
          />
        </div>
      </div>
      <div className="form-category-modal">
        {/* <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles2}
      //portalClassName="modal"
      contentLabel="Example Modal"
    >
      <button className="btnclose-modal" onClick={closeModal}>
        X
      </button>
      <div className="categories-create">
        <form onSubmit={createCategory}>
          <label htmlFor="category">Category Management</label>
          <input
            type="text"
            name="category"
            value={category}
            required
            onChange={(e) => setCategory(e.target.value)}
          />

          <button type="submit">{onEdit ? "Update" : "Save"}</button>
        </form>
      </div>
    </Modal> */}
        <ModalCategory
          category={category}
          modalIsOpen={modalIsOpen}
          afterOpenModal={afterOpenModal}
          closeModal={closeModal}
          onSubmit={createCategory}
        />
      </div>
    </>
  )
}

export default Categories
