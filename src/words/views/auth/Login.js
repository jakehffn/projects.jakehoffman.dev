import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";

import { AuthContext } from "../../components/auth/AuthProvider";
import firebaseConfig from "../../../config";
import firebase from "firebase/compat/app";

export const auth = firebaseConfig.auth();
const Login = () => {

  const handleSubmit = (e) => {

    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      firebaseConfig.auth().signInWithEmailAndPassword(email.value, password.value);
    } catch (error) {
      alert(error);
    }
  };

  const handleGoogleLogin = () => {
    try {
      const googleProvider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(googleProvider);
    } catch (error) {
      alert(error);
    }
  };

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Navigate to="/words" />;
  }

  return (
    <div className="w-full h-full flex flex-col justify-center content-center items-center">
      <div className="w-fit flex flex-row items-center mb-4">
        <h1>Sign in with</h1>
        <button type="button" onClick={ () => handleGoogleLogin() }
          className="ml-2 p-2 border-2 text-center rounded">Google</button>
      </div>
      <div>
        <h1 className="m-2">Or sign in with email:</h1>
        <form onSubmit={ handleSubmit }>
          <div className="flex flex-row m-2">
            <label htmlFor="grid-password" className="basis-1/3">Email</label>
            <input type="email" placeholder="Email" name="email" 
              className="text-black text-center grow ml-2"/>
          </div>
          <div className="flex flex-row m-2">
            <label htmlFor="grid-password" className="basis-1/3">Password</label>
            <input type="password" placeholder="Password" name="password" 
              className="text-black text-center grow ml-2"/>
          </div>
          <div>
            <label htmlFor="grid-password" className="ml-2">
              <input type="checkbox" />
              <span className="m-2">Remember me</span>
            </label>
          </div>
          <div className="text-center border-2 rounded m-4">
            <button type="submit">
              Sign In
            </button>
          </div>
        </form>
      </div>
      <div>
        <div>
          <a href="#temp" onClick={ (e) => e.preventDefault() }>
            <small>Forgot password?</small>
          </a>
        </div>
        <div>
          <Link to="words/auth/register">
            <small>Create new account</small>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;