import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

const validate = yup.object({
  email: yup.string().email('Must Be A Valid Email Address').required('An Email Is Needed To'),
  password: yup.string().required().min(8, 'Your Password Must Be A Minimum Of 8 Characters')
})

const Login = ({ onLogin }) => {

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validate,
    onSubmit: (values, actions) => {
      actions.resetForm()
      onLogin(values)
    }
  })

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor='email'>Email: </label>
          <input
            id='email'
            name='email'
            type='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            name='password'
            type='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
        </div>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Login