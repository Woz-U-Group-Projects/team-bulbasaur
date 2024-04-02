import React from 'react'
import { useFormik, Formik, Form, Field, ErrorMessage } from 'formik'
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

const Login = ({ onLogin }) => (
  <div className="login-container">
    <div className="login-text">
      <h1>Login</h1>
    </div>

    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={validate}
      onSubmit={(values, actions) => {
        onLogin(values);
        actions.resetForm()
      }}
    >
    <Form className="login-form-wrapper">
      <div className="login-email">
        {/* <label htmlFor='email'>Email: </label> */}
        <Field
          id='email'
          name='email'
          type='email'
          placeholder='Email'
        />
        <FontAwesomeIcon className="icon-login" icon="envelope" />
        <ErrorMessage name="email" component="div" />
      </div>

      <div className="login-password">
        {/* <label htmlFor='password'>Password</label> */}
        <Field
          id='password'
          name='password'
          type='password'
          placeholder='Password'
        />
        <FontAwesomeIcon className="icon-login" icon="lock" />
        <ErrorMessage name="password" component="div" />
      </div>

      <div className="login-btn">
        <button type='submit'>Login</button>
      </div>
    </Form>
    </Formik>
  </div>
)

export default Login