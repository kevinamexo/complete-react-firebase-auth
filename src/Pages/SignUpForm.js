import React, {useState} from 'react';
import { useAuth } from '../Context/AuthContext'
import { useHistory } from 'react-router-dom';
import './SignUpForm.css'
import * as yup from 'yup';
import { FcGoogle } from 'react-icons/fc';
import { ImFacebook2 } from 'react-icons/im';
import { AiFillApple } from 'react-icons/ai';
import { GoTasklist } from 'react-icons/go';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {Link} from 'react-router-dom'



const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';
const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

export const SignupForm = () => {
  const [errorMsg, setErrorMsg]= useState(null)
  const history = useHistory();
  const auth= useAuth()
  const signupSchema = yup.object().shape({
    firstName: yup.string('Invalid name').required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup
      .string('Invalid email address')
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Enter a valid e-mail address')
      .required('Email address is required'),
      
    password: yup
      .string()
      .matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must contain 8 characters, one uppercase, one lowercase, one number and one special case character'
      ).required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Password is required'),
    terms: yup
      .bool()
      .oneOf([true], 'You must agree to the terms and conditions to sign up')
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    
  } = useForm({
    resolver: yupResolver(signupSchema)
  });
  const submitRegisterForm = async (data) => {
   
    try {
      await auth.signup(data.email, data.password);
      window.alert('Welcome! 👋');
   
      history.push('/profile');
      console.log('done')
    } catch(e){
       if(e.code === ERROR_CODE_ACCOUNT_EXISTS){
         setErrorMsg(ERROR_MSG_ACCOUNT_EXISTS)
       }
    }
  };


 


  return (
    <div className="signup-page">
      <div className="signup-page-container">
        <span className="signup-page-header">
          <GoTasklist className="signup-logo" />
          <p className="signup-logo-text">todoist</p>
        </span>
        <p className="signup-text">Sign up</p>
        <div className="signup-services-container">
          <ul className="signup-services-list">
            <li className="signup-service-item">
              <button className="signup-service">
                <FcGoogle className="signup-google-icon" />
                <p>Continue with Google</p>
              </button>
            </li>
            <li className="signup-service-item">
              <button className="signup-service">
                <ImFacebook2 className=" signup-fb-icon" />{' '}
                <p>Continue with Facebook</p>
              </button>
            </li>
            <li className="signup-service-item">
              <button className="signup-service">
                <AiFillApple className="signup-apple-icon"/>
                <p>Continue with Apple</p>
              </button>
            </li>
          </ul>
        </div>
        <form className="signup-form" onSubmit={handleSubmit(submitRegisterForm)}>
          {/* <div className="form-group">
            <label htmlFor="firstName">Name</label>
            <input type="text" {...register('name')} />
            <p>{errors.firstName?.message}</p>
          </div> */}
          {/* <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" {...register('lastName')} />
            <p>{errors.lastName?.message}</p>
          </div> */}
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="text" {...register('email')} />
            <p>{errors.email?.message}</p>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="text" {...register('password')} />
            <p>{errors.password?.message}</p>
          </div> 
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="text" {...register('confirmPassword')} />
            <p>{errors.confirmPassword?.message}</p>
          </div>
          <button className="signup-button" type="submit">
            Sign Up with Email
          </button>
          <p className="terms">
            By continuing with Google, Apple, or Email, you agree to Todoist's
            Terms of Service and Privacy Policy.
          </p>
        </form>
        <p className="already-signedup">
          Already signed up? <Link  className="already-signedup__loginLink" to='/login'>Go to login</Link>
        </p>
        <p>{errorMsg&& errorMsg}</p>
      </div>
    </div>
  );
};

export default SignupForm;




