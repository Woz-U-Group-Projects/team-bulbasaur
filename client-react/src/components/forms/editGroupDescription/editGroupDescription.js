import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

const valitade = yup.object({
  discription: yup.string().required().max(500)
})

const EditGroupDescription = (props) => {
  let { group, setView, onEditGroupDescription } = props
  const formik = useFormik({
    initialValues: {
      groupId: group.groupId,
      discription: group.discription
    },
    validationSchema:valitade,
    onSubmit: (values, actions) => {
      onEditGroupDescription(values)
      actions.resetForm()
      setView(false)
    }
  })

  return (
    <div className='modal'>
      <form onSubmit={formik.handleSubmit} className='edit-form-wrapper'>
        <div className='edit-form-title'>
          <p>Description</p>
        </div>

        <div className='edit-form-body'>
          <label htmlFor='description'></label>
          <textarea
            id='description'
            name='description'
            value={formik.values.discription}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></textarea>
        </div>

        <div className='edit-form-btn'>
          <button className='edit-form-cancel-btn' type='button' onClick={() => setView(false)}>Cancel</button>
          <button className='edit-form-submit-btn' type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default EditGroupDescription