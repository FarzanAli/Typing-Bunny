import React, { useEffect, useState } from 'react';
import './login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let Login = (props) => {

    const [username, SetUsername] = useState("")
    const [email, SetEmail] = useState("")
    const [verifyEmail, SetVerifyEmail] = useState("")
    const [password, SetPassword] = useState("")
    const [verifyPassword, SetVerifyPassword] = useState("")

    const [loginEmail, SetLoginEmail] = useState("")
    const [loginPassword, SetLoginPassword] = useState("")
    const notifyUE = () => toast.error('Username and email already exists');
    const notifyU = () => toast.error('Username already exists');
    const notifyE = () => toast.error('Email already exists');
    const notifyUnexpected = () => toast.error('Unexpected error')
    const notifyInvalidEmail = () => toast.error('Invalid email')
    const notifyInvalidCredentials = () => toast.error('Invalid credentials')
    var usernameRegex = /^[a-zA-Z0-9]+$/;

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    let handleSignUp = async () => {
        let submittable = true
        if(verifyEmail !== email){
            toast.error("Email does not match")
            submittable = false
        }
        if(verifyPassword !== password){
            toast.error('Passwords dont match')
            submittable = false
        }
        console.log(usernameRegex.test(username))
        if(usernameRegex.test(username) == false){
            toast.error('Username can only contain alphanumeric characters')
            submittable = false
        }
        if(username.length > 16){
            toast.error('Username must be less than or equal to 16 characters')
            submittable = false
        }
        if(!validateEmail(email)){
            notifyInvalidEmail()
            submittable = false
        }
        if(!submittable){
            return;
        }
        var data = {}
        data["username"] = username
        data["email"] = email
        data["hash"] = password
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }
        const response = await fetch('/user/signup', options)
        if(response.status === 202){
            notifyUE()

        }
        else if(response.status === 203){
            notifyE()
        }
        else if(response.status === 204){
            notifyU()
        }
        else if(response.status === 201){
            props.setCredentials({username: username, email: email})
            props.handleLogin()
        }
        else{
            notifyUnexpected()
        }
    }

    let handleLogin = async () => {
        let submittable = true
        if(!validateEmail(loginEmail)){
            notifyInvalidEmail()
            submittable = false
        }
        if(!submittable){
            return;
        }
        var data = {}
        data["email"] = loginEmail
        data["password"] = loginPassword
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }
        fetch('/user/login', options)
        .then((response) => {
            // const response = await fetch('/user/login', options)
            if(response.status === 202){
                props.handleLogin()
            }
            else if(response.status === 203){
                notifyInvalidCredentials()
            }
            else{
                notifyUnexpected()
            }
            return response.json()
        }).then((data) => {
            props.setCredentials(data)
        })
        
    }

    return (
        <>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
        <div className='login-page'>
            <div className='fields'>
                <input type="text" placeholder={"username"} onChange={(e) => SetUsername(e.target.value)}></input>
                <input type="text" placeholder={"email"} onChange={(e) => SetEmail(e.target.value)}></input>
                <input type="text" placeholder={"verify email"} onChange={(e) => SetVerifyEmail(e.target.value)}></input>
                <input type="text" placeholder={"password"} onChange={(e) => SetPassword(e.target.value)}></input>
                <input type="text" placeholder={"verify password"} onChange={(e) => SetVerifyPassword(e.target.value)}></input>
                <button onClick={handleSignUp}>Sign Up</button>
            </div>
            <p>OR</p>
            <div className='fields'>
                <input type="text" placeholder={"email"} onChange={(e) => SetLoginEmail(e.target.value)}></input>
                <input type="text" placeholder={"password"} onChange={(e) => SetLoginPassword(e.target.value)}></input>
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
        </>
    )
}

export default Login;