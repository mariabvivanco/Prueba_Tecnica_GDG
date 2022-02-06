import React,  {useState} from "react";
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Dashboard from "../src/views/Dashboard";
import { initializeApp } from "firebase/app";
import {app, provider} from "../src/config/firebaseConfig";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import NotfoundPage from "../src/views/NotFoundPage.jsx"
import "../src/App.css"
import VideoOnly from "./views/VideoOnly";
export const appContext = React.createContext([]);


function App() {

    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const loginData = localStorage.getItem("login_data") ? JSON.parse(localStorage.getItem("login_data")) : "";
    const INITIAL_STATE = {
        nameUser: loginData ? loginData.nameUser: '',
        email: loginData ? loginData.email: '',
        isLogged: loginData? true: false,
        token:  loginData ? loginData.token: ''
    }

    const [ state, setState ] = useState(INITIAL_STATE);
	

    const tryLogin = () => {
                      
            signInWithPopup(auth, provider)
                .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    // The signed-in user info.
                    //const displayName= credential.user.email
                    
                    const user = result.user;
                    const stateTemp=state;
                    stateTemp.nameUser=result.user.displayName;
                    stateTemp.token=token;
                    stateTemp.email=result.user.email;
                    stateTemp.isLogged=true;
                    console.log(user)
                    console.log(token)
                    console.log(stateTemp)
                    setState(stateTemp);
                    
                    localStorage.setItem("login_data", JSON.stringify({email:stateTemp.email, nameUser: stateTemp.nameUser, token: token}));
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