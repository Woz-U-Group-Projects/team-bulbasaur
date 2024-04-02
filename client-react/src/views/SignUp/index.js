// Styles
import './signup.css';
// Dependencies
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
// Icon Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faEnvelope, faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core'

const validate = yup.object({
  fullName: yup.string().required('Your Full Name Is Required').min(3, 'Your Name Must Be 4 Characters Long Or More'),
  email: yup.string().email('Invalid Email Address').required('You Need An Email To Sign Up'),
  userName: yup.string().required('You Need To Create A User Name').min(5, 'Your User Name Must Required A Minimum Of 5 Characters'),
  password: yup.string().required().min(8, 'Your Password Must Be A Minimum Of 8 Characters')
})

library.add(faUserCircle, faEnvelope, faUser, faLock);

const SignUp = ({ onSignup }) => (
  <div className="signup-container">
    <div className="signup-text">
      <h1>Sign Up</h1>
    </div>

    <Formik
      initialValues={{
        fullName: '',
        email: '',
        userName: '',
        password: ''
      }}
      validationSchema={validate}
      onSubmit={(values, actions) => {
        onSignup(values)
        actions.resetForm();
      }}
    >
      <Form className="signup-form-wrapper">
        <div className="signup-fullname">
          {/* <label htmlFor='name'>Full Name:</label> */}
          <Field
            id='fullName'
            name='fullName'
            type='text'
            placeholder='Full Name'
          />
          <FontAwesomeIcon className="icon-signup" icon="user-circle" />
          <ErrorMessage name='fullName' component='div' />
        </div>

        <div className="signup-email">
          {/* <label htmlFor='email'>Email:</label> */}
          <Field
            id='email'
            name='email'
            type='email'
            placeholder='Email'
          />
          <FontAwesomeIcon className="icon-signup" icon="envelope" />
          <ErrorMessage name='email' component="div" />
        </div>
        <div className="signup-username">
          {/* <label htmlFor='userName'>User Name:</label> */}
          <Field
            id='userName'
            name='userName'
            type='text'
            placeholder='User Name'
          />
          <FontAwesomeIcon className="icon-signup" icon="user" />
          <ErrorMessage name="userName" component="div" />
        </div>

        <div className="signup-password">
          {/* <label htmlFor='password'>Password:</label> */}
          <Field
            id='password'
            name='password'
            type='password'
            placeholder='Password'
          />
          <FontAwesomeIcon className="icon-signup" icon="lock" />
          <ErrorMessage name='password' component='div' />
        </div>

        <div className="signup-btn">
          <button type='submit'>CREATE ACCOUNT</button>
        </div>
      </Form>
    </Formik>
  </div>
)

export default SignUp;