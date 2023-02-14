import React, { useContext } from "react";
import { AuthContext, AuthProvider } from "./components/auth/AuthProvider";
import Login from "./views/auth/Login.js"
import Register from "./views/auth/Register.js"
import { 
  Routes, 
  Route,
  Navigate
} from "react-router-dom"

import firebaseConfig from "../config";
import { 
  getDatabase,
  ref,
  set,
  get 
} from "firebase/database";

import NavBar from "./components/NavBar";



function Game() {

  const { currentUser } = useContext(AuthContext);
  const db = getDatabase(firebaseConfig);

  const submitWord = (e) => {

    e.preventDefault();

    var { word } = e.target.elements;
    var enteredWord = word.value.toUpperCase();

    // Clear box
    word.value = '';

    const wordsRef = ref(db, 'words/' + enteredWord);
    const userStatsRef = ref(db, 'user-stats/' + currentUser.uid);
    const userWordRef = ref(db, 'user-words/' + currentUser.uid + '/' + enteredWord);

    Promise.all([
      get(wordsRef),
      get(userStatsRef),
      get(userWordRef)
    ])
      .then((snapshots) => {

        var unique = true;
        var valid = snapshots[0].exists();

        if (snapshots[2].exists()) {

          unique = false;

          const userWordObj = snapshots[2].val();

          const newUserWordObj = {
            'num-enters': userWordObj['num-enters'] + 1
          };

          set(userWordRef, newUserWordObj);

        } else if (valid) {

          const initializedUserWordObj = {
            'num-enters': 1
          };

          set(userWordRef, initializedUserWordObj);
        }

        if (valid) {

          const wordObj = snapshots[0].val();

          const newWordObject = {
            'num-enters': wordObj['num-enters'] + 1,
            'num-unique-enters': wordObj['num-unique-enters'] + ((unique) ? 1 : 0)
          };

          set(wordsRef, newWordObject);

        } else {

          valid = false;
        }

        if (snapshots[1].exists()) {

          const statsObj = snapshots[1].val();

          var newUserStats = {
            'num-enters': statsObj['num-enters'] + 1,
            'num-words': statsObj['num-words'] + ((unique && valid) ? 1 : 0),
            'score': statsObj['score'] + ((unique && valid) ? 1 : 0)
          }

          set(userStatsRef, newUserStats)

        } else {

          const initializedUserStats = {
            'num-enters': 1,
            'num-words': 1,
            'score': (unique && valid) ? 1 : 0
          }

          set(userStatsRef, initializedUserStats)
        }
      });
    // const newWordRef = push(wordsRef);
  };

  return(
    
    <div className="h-full w-full flex justify-center items-center">
      {
        (currentUser === null || currentUser === undefined) ?
          
          <></> :
          <form onSubmit={ submitWord } autoComplete="off">
            <input className="text-center p-1 bg-neutral-900 focus:bg-neutral-900 active:bg-neutral-900 rounded border-none focus:outline-none" 
              type="text" name="word"/>
          </form>
      }
    </div>
    
  );
}

function MainPage() {

  return (
      <div className="h-full w-full">
        <NavBar />
        <Game />
      </div>
  )
}

function Words() {
  
  return (
    <React.StrictMode>
      <AuthProvider>
        <Routes>
          <Route path="/" element={ <MainPage /> } />
          <Route path="/auth/login" element={ <Login /> } />
          <Route path="/auth/register" element={ <Register /> } />
          <Route path="/auth" element={ <Navigate replace to="/words/auth/login" /> } />
        </Routes>
      </AuthProvider>
    </React.StrictMode>
  );
}

export default Words;
