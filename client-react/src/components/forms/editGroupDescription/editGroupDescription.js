import React from 'react';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';

const EditGroupDescription = ({ group, setView, onEditGroup }) => (
  <div className='modal'>
    <Formik
      initialValues={{
        groupId: group.groupId,
        description: group.description
      }}
      validationSchema={yup.object({
        description: yup.string().required().max(500)
      })}
      onSubmit={(values, actions) => {
        onEditGroup(values)
        actions.resetForm()
        setView(false)
      }}
      onReset={(values, actions) => {
        // actions.resetForm();
        setView(false);
      }}
    >
      <Form className='edit-form-wrapper'>
        <div className='edit-form-title'>
          <p>Description</p>
        </div>

        <div className='edit-form-body'>
          <label htmlFor='description'></label>
          <Field
            id='description'
            name='description'
            type='text'
            component='textarea'
          />
        </div>

        <div className='edit-form-btn'>
          <button className='edit-form-cancel-btn' type='reset'>Cancel</button>
          <button className='edit-form-submit-btn' type='submit'>Submit</button>
        </div>
      </Form>
    </Formik>
  </div>
)

export default EditGroupDescription