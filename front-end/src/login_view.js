import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import './styles/LoginView.css'
import {Link, Redirect} from "react-router-dom"
import {Header} from './home_view'

const BACKEND_IP = process.env.NODE_ENV === "production"? "http://204.48.25.3:5000" :"http://127.0.0.1:5000";

const LoginView = () => {
    return (
        <div className={'LoginView'}>

            <div>
                <header>
                    <Link to="/home" id="logo">Biazza</Link>
                </header>
            </div>

            <div id="main">
                <div id="login">
                    <h2>LOGIN</h2>
                    <LoginForm/>
                </div>
            </div>

            <div>
                <footer>
                    <a href="https://github.com/nyu-software-engineering/spring-2020-basic-thunder">&copy; 2020 Biazza</a>
                </footer>
            </div>

        </div>
    )
};

const LoginForm = (props) => {
    const [doneLogin,setDoneLogin] = useState(false);
    const [loginErrMsg,setLoginErrMsg] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target['email'].value;
        const pw = e.target['pass'].value;
        axios.post(`${BACKEND_IP}/login`,{
            email: email,
            password: pw,
        }).then(res=>{
            // register success: store access token
            console.log("access-token:",res.data['access-token']);
            localStorage.setItem('access-token',res.data['access-token']);
            setLoginErrMsg(false);
            setDoneLogin(true);
        }).catch(err=>{
            // login failed
            localStorage.removeItem('access-token');
            setLoginErrMsg(true);
            document.getElementById("pass").value = null;
        });
    };


    if (doneLogin){
        return <Redirect push to={`/LoggedInHome`} />;
    }

    return (
        <div>
            <ErrorMsg activate={loginErrMsg} />
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Email:</span>
                    <input type="email" name="email" id={"email"} required={true} className={"LoginRegisInputs"}/>
                </label>

                <label>
                    <span>Password:</span>
                    <input type="password" name="password" id={"pass"} required={true} minLength={3} className={"LoginRegisInputs"}/>
                </label>

                <input type="submit" value="Log In"/>

                <p>Don't have an account? <br/>
                    <Link to="sign-up" className={"SignUpLink"}>
                        <span>Sign Up</span>
                    </Link>
                </p>

            </form>
        </div>
    )
};


const ErrorMsg = ({activate}) =>{
    if(activate){
        return (
            <div className={"LoginErrMsgBlock"}>
                <h3>Login Failed</h3>
                Incorrect email or password!
            </div>
        );
    }
    return null;
};

export {LoginView}
