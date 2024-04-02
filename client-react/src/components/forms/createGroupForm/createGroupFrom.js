import React from 'react'
import { Formik, Field, Form } from 'formik'
import * as yup from 'yup';

import './createGroupForm.css';

const CreateGroupForm = ({ setFormView, onCreateGroup }) => (
  <Formik
    className="modal"
    initialValues={{
      groupName: '',
      description: '',
      private: false,
    }}
    validationSchema={yup.object({
      groupName: yup.string().required().min(4).max(20),
      description: yup.string().max(500),
      private: yup.boolean()
    })}
    onSubmit={(values, actions) => {
      onCreateGroup(values);
      actions.resetForm();
      setFormView(false);
    }}
  >
    <Form className='create-group-form-wrapper'>
      <div className="group-form-name">
        <Field
          id='groupName'
          name='groupName'
          type='text'
          placeholder='Enter group name...'
        />
      </div>
      <div className="group-form-input">
        <Field
          id='description'
          name='description'
          placeholder='Enter group description...'
          type='text'
          component='textarea'
        />
      </div>
      <div className="group-form-private">
        <label htmlFor='private' >Make it private</label>
        <Field
          id='private'
          name='private'
          type='checkbox'
        />
      </div>
      <div className="group-form-btn">
        <button className="group-form-cancel-btn" type="button" onClick={() => setFormView(false)}>Cancel</button>
        <button className="group-form-submit-btn" type='submit' >Submit</button>
      </div>
    </Form>
  </Formik>
)

export default CreateGroupForm;
