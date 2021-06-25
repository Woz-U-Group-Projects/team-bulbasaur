import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup';

import './profilePostForm.css';

const validate = yup.object({
  title: yup.string().required('A Title Is Required To Make A Post').min(3, 'Must Be 3 Characters Or Longer'),
  body: yup.string().required('Content Must Be Added To The Post').min(20, 'The Post Must Be at Least 20 Characters Long'),
  isHidden: yup.boolean()
})

const ProfilePostForm = (props) => {
  let { onMakePostByUserId, userId } = props
  const formik = useFormik({
    initialValues: {
      userId: userId,
      title: '',
      body: '',
      isHidden: false
    },
    validationSchema: validate,
    onSubmit: (values, actions) => {
      actions.resetForm()
      onMakePostByUserId(values)
    }
  })

  return (
    <form className='form-container' onSubmit={formik.handleSubmit}>
        <div className='form-title'>
          <label htmlFor='title'>Title</label>
          <input
            id='title'
            name='title'
            type='text'
            placeholder="...Your post's title here..."
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.title && formik.errors.title ? <div>{formik.errors.title}</div> : null}
        </div>
        <div className='form-post-body'>
          <label htmlFor='body'></label>
          <textarea
            id='body'
            name='body'
            type='text'
            value={formik.values.body}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.body && formik.errors.body ? <div>{formik.errors.body}</div> : null}
        </div>
        <div className='form-btn-wrapper'>
          <div className='private-option'>
            <label htmlFor='isHidden'>Private</label>
            <input
              id='isHidden'
              name='isHidden'
              type='checkbox'
              onChange={formik.handleChange}
            />
          </div>
          <div className='form-submit-btn'>
            <button className='form-submit-btn-action' type='submit'>Submit</button>
          </div>
        </div>
      </form>

  )
} 

export default ProfilePostForm