// Styles
import './commentForm.css'
// Dependencies
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'


const validate = yup.object({
  body: yup.string().required()
})

const CommentForm = ({ postId, onCreateComment }) => (
  <Formik
    initialValues={{
      postId: postId,
      body: ''
    }}
    validationSchema={validate}
    onSubmit={(values, actions) => {
      onCreateComment(values);
      actions.resetForm();
    }}
  >
    <Form>
      <div className="comment-wrapper">
        <div className="comment-input">
          <Field
            id='body'
            name='body'
            type='text'
            placeholder='Write a comment ...'
            component='textarea'
          />
          <ErrorMessage name='body' component="div" />
        </div>

        <div className="comment-submit-btn">
          <button type="submit">Send</button>
        </div>
      </div>
    </Form>
  </ Formik>
);

export default CommentForm;
