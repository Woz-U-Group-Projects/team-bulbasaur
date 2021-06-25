import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'



const validate = yup.object({
  body: yup.string().required()
})

const ProfileCommentForm = ({ postId, userId, loggedInUser, onMakeCommentByUserId }) => {

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
      <div className="comment-wrapper">
        <div className="comment-input">
          <textarea
            id='body'
            name='body'
            type='text'
            value={formik.values.body}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder='Write a comment ...'
          >
          </textarea>
        </div>

        <div className="comment-submit-btn">
          <button type="submit">Send</button>
        </div>
      </div>
    </form>

  )
}

export default ProfileCommentForm