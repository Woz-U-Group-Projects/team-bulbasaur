import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

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
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor='groupName' >Enter the name of your group</label><br/>
        <input 
          id='groupName' 
          name='groupName'
          type=''
          value={formik.values.groupName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} 
        />
      </div>
      <div>
        <label htmlFor='discription' >And a description</label><br/>
        <textarea
          id='discription' 
          name='discription'
          value={formik.values.discription}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        ></textarea>
      </div>
      <div>
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
      <div>
        <button type="button"  onClick={() => setFormView(false)}>Cancel</button>
        <button type='submit' >Submit</button>
      </div>
    </form>
  )
}

export default CreateGroupForm