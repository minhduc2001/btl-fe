import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PWResetRoute, registerRoute, activeRoute, passwordRoute } from '../utils/APIRoutes'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import { loginUser } from '../redux/requestApi';
import { Dialog, Typography, Box, TextField, Card, Button, Backdrop } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const reduxResponse = useSelector((state) => state.auth.login);
  const user = reduxResponse.currentUser;
  const [currentView, setCurrentView] = useState('login');
  const [values, setValues] = useState({ username: '', password: '', email: '' })
  const [dialog, setDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toastOption = {
    position: 'top-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark'
  }

  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const changeView = (view) => {
    setValues({ username: '', password: '', email: '' })
    setCurrentView(view)
  }

  const handleSubmitRegister = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    const userData = {
      username: values.username,
      password: values.password,
      email: values.email
    }
    
    try {
      const data = await axios.post(registerRoute, userData);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, toastOption)
      setIsLoading(false)
    }

  }

  const handleSubmitLogin = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    const userData = {
      username: values.username,
      password: values.password
    }
    const data = await loginUser(userData, dispatch, navigate);
    if (data) {
      toast.error(data.msg, toastOption)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if(user) navigate('/')
  }, [])

  const view = () => {
    switch (currentView) {
      case "signup":
        return (
          <form onSubmit={(e) => { handleSubmitRegister(e) }}>
            <h2>Sign Up!</h2>
            <fieldset>
              <legend>Create Account</legend>
              <ul>
                <li>
                  <label htmlFor="username">Username:</label>
                  <input type="text" id="username" name="username" value={values.username} required onChange={(e) => handleChange(e)} />
                </li>
                <li>
                  <label htmlFor="email">email:</label>
                  <input type="email" id="email" name="email" value={values.email} required onChange={(e) => handleChange(e)} />
                </li>
                <li>
                  <label htmlFor="password">Password:</label>
                  <input type="password" id="password" name="password" value={values.password} required onChange={(e) => handleChange(e)} />
                </li>
              </ul>
            </fieldset>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => changeView("login")}>Have an Account?</button>
          </form>
        )
        break
      case "login":
        return (
          <form onSubmit={(e) => handleSubmitLogin(e)}>
            <h2>Welcome Back!</h2>
            <fieldset>
              <legend>Log In</legend>
              <ul>
                <li>
                  <label htmlFor="username">Username:</label>
                  <input type="text" id="username" name="username" value={values.username} required onChange={(e) => handleChange(e)} />
                </li>
                <li>
                  <label htmlFor="password">Password:</label>
                  <input type="password" id="password" name="password" value={values.password} required onChange={(e) => handleChange(e)} />
                </li>
                <li>
                  <i />
                  <a onClick={() => changeView("PWReset")} href="#">Forgot Password?</a>
                </li>
              </ul>
            </fieldset>
            <button type="submit">Login</button>
            <button type="button" onClick={() => changeView("signup")}>Create an Account</button>
          </form>
        )
        break
      case "PWReset":
        return (
          <form>
            <h2>Reset Password</h2>
            <fieldset>
              <legend>Password Reset</legend>
              <ul>
                <li>
                  <em>A reset link will be sent to your inbox!</em>
                </li>
                <li>
                  <label htmlFor="email">email:</label>
                  <input type="tel" id="email" name="email" value={values.email} required onChange={(e) => handleChange(e)} />
                </li>
              </ul>
            </fieldset>
            <button type="submit">Send Reset Link</button>
            <button type="button" onClick={() => changeView("login")}>Go Back</button>
          </form>
        )
      default:
        break
    }
  }
  return (
    <>
      <Container>
        <div className="body">
          {view()}
        </div>
        <div id='sign-in-button'></div>
      </Container>
      <ToastContainer />
      <Backdrop
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}
const Container = styled.div`
    .body {
    display: grid;
    grid-template-columns: 1fr minmax(200px,400px) 1fr;
    grid-template-rows: 1fr minmax(auto,1fr) 1fr;
    grid-gap: 10px;
    width: 100%;
    height: 100vh;
    background: linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB);
    background-size: 400% 400%;
    animation: Gradient 15s ease infinite;
    box-sizing: border-box;
    form {
      grid-column: 2;
      grid-row: 2;
      display: grid;
      grid-gap: 10px;
      margin: auto 0;
      padding: 20px;
      background-color: rgba(255,255,255,0.9);
      border-radius: 10px;
      box-shadow: 0 32px 64px rgba(0,0,0,0.2);
      h2 {
        margin-bottom: 5px;
        text-align: center;
        text-shadow: 0 4px 16px #fff;
        font-size: 30px;
        font-weight: 100;
      }
      fieldset {
        margin: 0;
        background-color: #fff;
        border: none;
        border-radius: 5px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        legend {
          padding: 5px;
          background-color: #fff;
          border-radius: 5px;
        }
        ul {
          margin: 0;
          padding: 0;
          li {
            display: grid;
            align-items: center;
            margin: 10px;
            a {
              color: #02c;
            }
            em {
              grid-column: span 2;
              text-align: center;
              padding: 5px;
            }
            label {
              text-align: left;
              padding-bottom: 2px;
            }
            input {
              padding: 5px;
              border: 1px solid #ddd;
              border-radius: 5px;
              &:hover {
                border: 1px solid #aaf;
              }
            }
          }
        }
      }
      button {
        padding: 10px;
        border:1px solid rgba(0,0,0,0);
        border-radius: 5px;
        background: #fff;
        box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        &:hover {
          background-color: #eef;
          border: 1px solid #aaf;
        }
      }
    }
  }
  @media only screen and (min-width: 420px) {
    form {
      h2 {
        font-size: 40px;
      }
      fieldset {
        ul {
          li {
            grid-template-columns: 100px 1fr;
            label {
              padding-right: 10px;
              padding-bottom: 0;
              text-align: right !important;
            }
          }
        }
      }
    }
  }
  
  @keyframes Gradient {
    0% {
      background-position: 0% 50%
    }
    50% {
      background-position: 100% 50%
    }
    100% {
      background-position: 0% 50%
    }
  }
`;
export default Login