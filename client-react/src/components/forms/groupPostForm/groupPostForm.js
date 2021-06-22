import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

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
      onCreateGroupPost(values)
      actions.resetForm()
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
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
      <div>
        <label htmlFor='body'>Body: </label>
        <input
          id='body'
          name='body'
          type='text'
          values={formik.values.body}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        { formik.touched.body && formik.errors.body ? <div>{formik.errors.body}</div>:null}
      </div>
      <div style={isOwner || isAdmin ? {display:'inline'}:{display:'none'}}>
        <label htmlFor='private'>Private: </label>
        <input 
          id='private'
          name='private'
          type='checkbox'
          value={formik.values.private}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        /> 
      </div>
      <div>
        <button type='button'>Cancel</button>
        <button type='submit'>Submit</button>
      </div>
    </form>
  )
}

export default GroupPostForm