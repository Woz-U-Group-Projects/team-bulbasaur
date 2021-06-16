import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'



const validate = yup.object({
  body: yup.string().required()
})

const ProfileCommentForm = ({postId, userId, loggedInUser, onMakeCommentByUserId}) => {

  const formik = useFormik({
    initialValues: {
      postId: postId,
      userId: loggedInUser === undefined ? 1 : loggedInUser.id,
      profileId: userId,
      body: ''
    },
    validationSchema: validate,
    onSubmit: (values, actions) => {
      actions.resetForm()
      onMakeCommentByUserId(values)
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor='body'>Comment</label>
        <input 
          id='body'
          name='body'
          type='text'
          value={formik.values.body}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.body && formik.errors.body ? <div>{formik.errors.body}</div> : null}
      </div>
      <div>
        <button type='submit'>Submit</button>
      </div>
    </form>
  )
}

export default ProfileCommentForm