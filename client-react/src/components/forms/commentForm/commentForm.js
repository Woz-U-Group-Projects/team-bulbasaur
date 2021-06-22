import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

import './commentForm.css'

const validate = yup.object({
  body: yup.string().required()
})

const CommentForm = ({postId, loggedInUser, onMakeComment}) => {

  const formik = useFormik({
    initialValues: {
      postId: postId,
      userId: loggedInUser === undefined ? 1 : loggedInUser.id,
      body: ''
    },
    validationSchema: validate,
    onSubmit: (values, actions) => {
      actions.resetForm()
      onMakeComment(values)
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
        {/* {formik.touched.body && formik.errors.body ? <div>{formik.errors.body}</div> : null} */}
        {/* <button className="comment-btn" type='submit'>Send</button> */}
        {/* <FontAwesomeIcon className="send-icon" icon="paper-plane" /> */}
        
      </div>
    </form>
  )
}

export default CommentForm