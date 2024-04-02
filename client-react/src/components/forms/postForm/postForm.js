import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import './postForm.css';


const validate = yup.object({
  groupId: yup.string().notRequired(),
  title: yup.string().required('(A Title Is Required To Make A Post)').min(3, 'Must Be 3 Characters Or Longer'),
  body: yup.string().required('Content Must Be Added To The Post').min(20, 'The Post Must Be at Least 20 Characters Long'),
  private: yup.boolean()
})

const PostForm = ({ onCreatePost, selectedGroup }) => (
  <Formik
    initialValues={{
      groupId: selectedGroup ? selectedGroup.groupId : undefined,
      title: '',
      body: '',
      private: false
    }}
    validationSchema={validate}
    onSubmit={(values, actions) => {
      onCreatePost(values)
      actions.resetForm()
    }}
  >
    <Form className='form-container'>
      <div className='form-title'>
        <label htmlFor='title'>Title</label>
        <Field
          id='title'
          name='title'
          type='text'
          placeholder="...Your post's title here..."
        />
        <ErrorMessage name='title' component="div" />
      </div>

      <div className='form-post-body'>
        <label htmlFor='body'></label>
        <Field
          id='body'
          name='body'
          component='textarea'
        />
        <ErrorMessage name='body' component="div" />
      </div>

      <div className='form-btn-wrapper'>
        <div className='private-option'>
          <label htmlFor='private'>Private</label>
          <Field
            id='private'
            name='private'
            type='checkbox'
          />
        </div>

        <div className='form-submit-btn'>
          <button className='form-submit-btn-action' type='reset'>Reset</button>
          <button className='form-submit-btn-action' type='submit'>Create</button>
        </div>
      </div>
    </Form>
  </Formik>
);

export default PostForm;
