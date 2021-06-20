import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

import './signup.css';

const validate = yup.object({
  name: yup.string().required('Your Full Name Is Required').min(3, 'Your Name Must Be 4 Characters Long Or More'),
  email: yup.string().email('Invalid Email Address').required('You Need An Email To Sign Up'),
  userName: yup.string().required('You Need To Create A User Name').min(5, 'Your User Name Must Required A Minimum Of 5 Characters'),
  password: yup.string().required().min(8, 'Your Password Must Be A Minimum Of 8 Characters')
})

const SignUp = ({ onSignup, signupStatus }) => {
  let [signUpSuccessful, setSuccess] = useState(false)

  useEffect(() => {
    setSuccess(signupStatus.result)
  }, [signupStatus])

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      userName: '',
      password: ''
    },
    validationSchema: validate,
    onSubmit: (values, actions) => {
      actions.resetForm()
      onSignup(values)
    }
  })

  if (signUpSuccessful) {
    return <Redirect to='/login' />
  }

  return (
    <div className="signup-container">
      <div className="signup-text">
        <h1>Sign Up</h1>
      </div>

      <form onSubmit={formik.handleSubmit} className="signup-form-wrapper">
        <div className="signup-fullname">
          {/* <label htmlFor='name'>Full Name:</label> */}
          <input
            id='name'
            name='name'
            type='text'
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}
        </div>
        <div className="signup-email">
          {/* <label htmlFor='email'>Email:</label> */}
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
        <div className="signup-username">
          {/* <label htmlFor='userName'>User Name:</label> */}
          <input
            id='userName'
            name='userName'
            type='text'
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.userName && formik.errors.userName ? <div>{formik.errors.userName}</div> : null}
        </div>
        <div className="signup-password">
          {/* <label htmlFor='password'>Password:</label> */}
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
        <div className="signup-btn">
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default SignUp;