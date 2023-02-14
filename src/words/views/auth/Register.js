import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import firebaseConfig from "../../../config";
import firebase from "firebase/compat/app";

import { AuthContext } from "../../components/auth/AuthProvider";

export const auth = firebaseConfig.auth();
export default function Register() {

  // const [currentUser, setCurrentUser] = useState(null);
  const { currentUser } = useContext(AuthContext);

  const handleSubmit = (e) => {

    e.preventDefault();
    const { email, password } = e.target.elements
    try {
      firebaseConfig.auth().createUserWithEmailAndPassword(email.value, password.value);

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

  if (currentUser) {
    return <Navigate to="/words" />
  }

  return (
    <div className="w-full h-full flex flex-col justify-center content-center items-center">
      <div className="w-fit flex flex-row items-center mb-4">
        <h1>Sign in with</h1>
        <button type="button" onClick={ () => handleGoogleLogin() }
          className="ml-2 p-2 border-2 text-center rounded">Google</button>
      </div>
      <small>Or create an account with email</small>
      <form onSubmit={ handleSubmit }>
        <div className="flex flex-row m-2">
          <label htmlFor="grid-password" className="basis-1/3">
            Name 
          </label>
          <input type="text" placeholder="Name" 
            className="text-black text-center grow ml-2"/>
        </div>
        <div className="flex flex-row m-2">
          <label htmlFor="grid-password" className="basis-1/3">
            Email
          </label>
          <input type="email" placeholder="Email" name="email"
            className="text-black text-center grow ml-2"/>
        </div>
        <div className="flex flex-row m-2">
          <label htmlFor="grid-password" className="basis-1/3">
            Password
          </label>
          <input type="password" placeholder="Password" name="password"
            className="text-black text-center grow ml-2"/>
        </div>
        <div>
          {/* <label>
            <input type="checkbox" />
            <span>I agree with the{" "} 
              <a href="#temp">Privacy Policy</a>
            </span>
          </label> */}
        </div>
        <div className="text-center border-2 rounded m-4">
          <button type="submit">
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}