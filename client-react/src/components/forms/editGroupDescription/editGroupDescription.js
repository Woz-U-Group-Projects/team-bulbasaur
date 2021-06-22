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
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor='discription'>Edit Description: </label><br />
        <textarea
          id='discription'
          name='discription'
          value={formik.values.discription}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        ></textarea>
      </div>
      <div>
        <button type='submit'>Submit</button>
        <button type='button' onClick={() => setView(false)}>Cancel</button>
      </div>
    </form>
  )
}

export default EditGroupDescription