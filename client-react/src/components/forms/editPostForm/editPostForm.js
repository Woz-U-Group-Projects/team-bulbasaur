import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup';
import './editPostForm.css'

const validate = yup.object({
  body: yup.string().required('You must provide An Edit To The Post')
})

const EditPostForm = ({ setEditModal, post, onEditPost }) => {
  const formik = useFormik({
    initialValues: {
      postId: post.id,
      body: post.body
    },
    validationSchema: validate,
    onSubmit: (values, actions) => {
      actions.resetForm()
      onEditPost(values)
      setEditModal(false)
    }
  })

  return (
    <div className='modal'>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor='body'><p>Edit Post:</p></label>
          <textarea
            name='body'
            id='body'
            cols={25}
            rows={5}
            value={formik.values.body}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></textarea>
          {formik.touched.body && formik.errors.body ? <div>{formik.errors.body}</div> : null}
        </div>
        <div>
          <button onClick={() => setEditModal(false)}>Cancel</button>
          <button type='submit' >Submit</button>
        </div>
      </form>
    </div>
  )
}

export default EditPostForm