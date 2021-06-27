import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'



const validate = yup.object({
  body: yup.string().required()
})

const GroupCommentForm = ({postId, loggedInUser, onMakeGroupComment, groupId}) => {

  const formik = useFormik({
    initialValues: {
      groupId: groupId,
      postId: postId,
      userId: loggedInUser === undefined ? 1 : loggedInUser.id,
      body: ''
    },
    validationSchema: validate,
    onSubmit: (values, actions) => {
      actions.resetForm()
      onMakeGroupComment(values)
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
          />
          {formik.touched.body && formik.errors.body ? <div>{formik.errors.body}</div> : null}
        </div>

        <div className="comment-submit-btn">
          <button type='submit'>Send</button>
        </div>
      </div>
    </form>
  )
}

export default GroupCommentForm