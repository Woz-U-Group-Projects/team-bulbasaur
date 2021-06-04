import React from 'react'
import { formik } from 'formik'
import * as yup from 'yup'

const  validate = yup.object({
  email: yup.string().email('Must Be A Valid Email Address').required('An Email Is Needed To')
})

const Login = (props) => {
  return (
    <div>
      <h1>Login Page</h1>
    </div>
  )
}

export default Login