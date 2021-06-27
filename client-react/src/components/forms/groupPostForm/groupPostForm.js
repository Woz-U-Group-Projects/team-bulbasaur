import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup';

import './groupPostForm.css';

const validate = yup.object({
  title: yup.string().required(),
  body: yup.string().required()
})

const GroupPostForm = (props) => {
  let { group, loggedInUser, onCreateGroupPost, isAdmin, isOwner } = props

  const formik = useFormik({
    initialValues: {
      groupId: group.groupId,
      userId: loggedInUser?loggedInUser.id:undefined,
      title: '',
      body: '',
      private: false
    },
    validationSchema: validate,
    onSubmit: (values, actions) => {
      actions.resetForm()
      onCreateGroupPost(values)
    }
  })

  return (
    <form onSubmit={formik.handleSubmit} className="profile-form-container">
      <div className="profile-form-title">
        <label htmlFor='title'>Title: </label>
        <input
          id='title'
          name='title'
          type='text'
          values={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        { formik.touched.title && formik.errors.title ? <div>{formik.errors.title}</div>:null}
      </div>

      <div className="profile-form-post-body">
        <label htmlFor='body'></label>
        <textarea
          id='body'
          name='body'
          type='text'
          values={formik.values.body}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        { formik.touched.body && formik.errors.body ? <div>{formik.errors.body}</div>:null}
      </div>

      <div style={isOwner || isAdmin ? {display:'flex'}:{display:'none'}} className="profile-form-btn-wrapper">
        <div>
          <label htmlFor='private'>Private </label>
          <input 
            id='private'
            name='private'
            type='checkbox'
            value={formik.values.private}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="profile-form-submit-btn">
          <button className="form-cancel-btn-action" type='reset'>Cancel</button>
          <button className="form-submit-btn-action" type='submit'>Submit</button>
        </div> 
      </div>
    </form>
  )
}

export default GroupPostForm