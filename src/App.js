import React,  {useState, useEffect} from "react";
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Dashboard from "../src/views/Dashboard";
import { initializeApp } from "firebase/app";
import {app, provider} from "../src/config/firebaseConfig";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import VideoBlog from "../src/views/Videoblog"
import NotfoundPage from "../src/views/NotFoundPage.jsx"
import "../src/App.css"
import VideoOnly from "./views/VideoOnly";
export const appContext = React.createContext([]);


function App() {

    //localStorage.setItem("login_data", '');
    
      
      // Initialize Firebase

    
    
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const loginData = localStorage.getItem("login_data") ? JSON.parse(localStorage.getItem("login_data")) : "";
    const INITIAL_STATE = {
        mail:loginData !== "" ? loginData.mail : "",
        password: '',
        error: '',
        isLoading: false,
        nameUser:loginData !== "" ? loginData.name : "María Beatriz Vivanco",
        isLogged: loginData !== "" ? true : true,
        token: loginData !== "" ? loginData.token : ''
    }

    const [ state, setState ] = useState(INITIAL_STATE);
	//const { isLogged } = state;

    const tryLogin = () => {
            //e.preventDeffault();
            
            signInWithPopup(auth, provider)
                .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    // The signed-in user info.
                    
                    const user = result.user;
                    console.log(user)
                    console.log(token)
                    
                    localStorage.setItem("login_data", JSON.stringify({user: user, token: token}));
                })
                .catch((error) => {
                        // Handle Errors here.
                        const errorCode = error.code;
                        console.log(error)
                        console.log(error.code)
                        console.log(error.message)
                        const errorMessage = error.message;
                        // The email of the user's account used.
                        const email = error.email;
                        // The AuthCredential type that was used.
                        const credential = GoogleAuthProvider.credentialFromError(error);
                        localStorage.setItem("login_data", '');
                    });}

        return(
            <appContext.Provider value={state}>
                <Router>
                
                {/* Route Switch */}
                    <Switch>
                    {/* Redirections to protect our routes */}
                        <Route exact path='/'> <Redirect from='/' to='/dashboard' /> </Route>
                        <Route path='/dashboard' > <Dashboard tryLogin={tryLogin}/> </Route>
                        <Route path='/videoonly/:idvideo' ><VideoOnly></VideoOnly></Route>
                        <Route component={NotfoundPage}/>
                </Switch>
                </Router>
            </appContext.Provider>
    
    )}

export default App;