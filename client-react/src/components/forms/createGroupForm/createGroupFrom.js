import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup';

import './createGroupForm.css';

const validate = yup.object({
  groupName: yup.string().required().min(4).max(20),
  discription: yup.string().max(500),
  private: yup.boolean()
})

const CreateGroupForm = (props) => {
  let { setFormView, loggedInUser, isLoggedIn, onCreateGroup } = props

  const formik = useFormik({
    initialValues: {
      groupName: '',
      discription: '',
      private: false,
      userId: isLoggedIn?loggedInUser.id:undefined
    },
    validationSchema: validate,
    onSubmit: (values, actions) => {
      onCreateGroup(values)
      actions.resetForm()
      setFormView(false)
    }
  })

  return (
    <div className="modal">
      <form onSubmit={formik.handleSubmit} className='create-group-form-wrapper'>
        <div className="group-form-name">
          <input 
            id='groupName' 
            name='groupName'
            type=''
            placeholder='Enter group name...'
            value={formik.values.groupName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} 
          />
        </div>
        <div className="group-form-input">
          <textarea
            id='discription' 
            name='discription'
            placeholder='Enter group description...'
            value={formik.values.discription}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></textarea>
        </div>
        <div className="group-form-private">
          <label htmlFor='private' >Make it private</label>
          <input 
            id='private' 
            name='private'
            type='checkbox'
            value={formik.values.private}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} 
          />
        </div>
        <div className="group-form-btn">
          <button className="group-form-cancel-btn" type="button"  onClick={() => setFormView(false)}>Cancel</button>
          <button className="group-form-submit-btn" type='submit' >Submit</button>
        </div>
      </form>
    </div>
  )
}

export default CreateGroupForm