import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

const validate = yup.object({
  edit: yup.string().required('You must provide An Edit To The Post')
})

const EditPostForm = ({ setEditModal, postId, onEditPost }) => {
  const formik = useFormik({
    initialValues: {
      postId: postId,
      edit: ''
    },
    validationSchema: validate,
    onSubmit: (values, actions) => {
      actions.resetForm()
      onEditPost(values)
      setEditModal(false)
    }
  })

  return (
    <form onSubmit={formik.handleSubmit} style={{ width: '25%' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor='edit'><p>Edit Post:</p></label>
        <textarea
          name='edit'
          id='edit'
          cols={25}
          rows={5}
          value={formik.values.edit}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        ></textarea>
        {formik.touched.edit && formik.errors.edit ? <div>{formik.errors.edit}</div> : null}
      </div>
      <div>
        <button onClick={() => setEditModal(false)}>Cancel</button>
        <button type='submit' >Submit</button>
      </div>
    </form>
  )
}

export default EditPostForm