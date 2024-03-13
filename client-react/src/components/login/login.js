import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Redirect } from 'react-router'

import './login.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faEnvelope, faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core'

const validate = yup.object({
  email: yup.string().email('Must Be A Valid Email Address').required('An Email Is Needed To'),
  password: yup.string().required().min(8, 'Your Password Must Be A Minimum Of 8 Characters')
})

library.add(faUserCircle, faEnvelope, faUser, faLock);

const Login = ({ onLogin, loggedInUser, isLoggedIn }) => {

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

  if(isLoggedIn){
    return <Redirect to='/' />
  }

  return (
    <div className="login-container">
      <div className="login-text">
        <h1>Login</h1>
      </div>

      <form onSubmit={formik.handleSubmit} className="login-form-wrapper">
        <div className="login-email">
          {/* <label htmlFor='email'>Email: </label> */}
          <input
            id='email'
            name='email'
            type='email'
            placeholder='Email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FontAwesomeIcon className="icon-login" icon="envelope" />
          {/* {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null} */}
        </div>

        <div className="login-password">
          {/* <label htmlFor='password'>Password</label> */}
          <input
            id='password'
            name='password'
            type='password'
            placeholder='Password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FontAwesomeIcon className="icon-login" icon="lock" />
          {/* {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null} */}
        </div>

        <div className="login-btn">
          <button type='submit'>Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login