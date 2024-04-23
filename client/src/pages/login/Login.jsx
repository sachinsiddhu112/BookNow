import React, { useContext, useState } from 'react'
import "./Login.css";
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function Login() {

  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined
  })

  const { loading, error, dispatch } = useContext(AuthContext);
  const [errormsg,setErrormsg] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {

      const res = await axios.post(`/auth/login`, credentials);

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");

    }
    catch (err) {
      setErrormsg(true)
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data })
    }
  }

  const handleReg = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {

      const res = await axios.post(`/auth/register`, credentials);

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");

    }
    catch (err) {
      setErrormsg(true)
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data })
    }
  }
  return (

    <div className='login'>
      <div className="lcontainer">
        <div className='usernameinput'>
          <label htmlFor="username"> Username:</label>
          <input type="text" placeholder='username' id="username" onChange={handleChange} className='lInput' />
        </div>
        <div className='emailinput'>
          <label htmlFor="email">Email:</label>
          <input type="email" placeholder='Email...' id="email" onChange={handleChange} className='lInput' />
        </div>
        <div className='passinput'>
          <label htmlFor="username"> Password:</label>
          <input type="text" placeholder='password' id="password" onChange={handleChange} className='lInput' />
        </div>
        <div>
          <button disabled={loading} onClick={handleLogin} className="lButton">Login</button>

          <button disabled={loading} onClick={handleReg} className="lButton">Register</button>

        </div>
        {error && errormsg && <div className='errcontainer'>
          <div className='error'>

         <h2 className='errmsg' >{error.message}</h2>
        <AiOutlineCloseCircle className='cancelBtn' size={25} onClick={()=>setErrormsg(false)} />

          </div>
        </div>}
      </div>
    </div>
  )
}
