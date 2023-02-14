import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "./auth/AuthProvider";
import firebaseConfig from "../../config.js";

export default function NavBar(props) {

  // const [navbarOpen, setNavbarOpen] = React.useState(false);
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="w-full fixed">

      <div className="flex flex-row justify-between p-8">
        <h1 className="font-bold text-xl">Words</h1>

        {
          (currentUser === null || currentUser === undefined) ?
            <div className="flex">
              <button>
                <Link to="/words/auth/login">Login</Link>
              </button>
              <button className="pl-4">
                <Link to="/words/auth/register">Register</Link>
              </button>
            </div> :
            <div className="flex">
              <button type="button" onClick={ () => firebaseConfig.auth().signOut()}>
                <Link to="/words/">Sign Out</Link>
              </button>
            </div>
        }
      </div>
    </div>
  );
}