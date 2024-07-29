import React, { useContext, useState } from 'react'
import "./Signup.css";
import Alert from "../../components/alert/Alert.jsx";
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Signup() {

  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined
  })
  const [alert,setAlert]=useState(false);
  const [msg,setMsg]=useState("");

  const { loading,dispatch } = useContext(AuthContext);
  

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  
  const handleReg = async (e) => {
    e.preventDefault();
    //validate user credentials
    if (!credentials.email || !credentials.password || !credentials.username) {
      setAlert(true);
      setMsg("Check your credentials");
      return;
  } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
    setMsg('Email address is invalid');
    setAlert(true);
    return;
  } 
    //start signup
    dispatch({ type: "LOGIN_START" });

    try {

      const res = await axios.post(`https://booknow-6odc.onrender.com/api/auth/register`, credentials);

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");

    }
    catch (err) {
       setAlert(true);
       setMsg("USER NOT FOUND")
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data })
    }
  }
  return (

    <div className='register'>
      <div className="rcontainer">
       { alert &&  <Alert alert={alert} setAlert={setAlert} type="warning" msg={msg} />}
        <div className='usernameinput'>
          <label htmlFor="username"> Username</label>
          <input type="text" placeholder='username' id="username" onChange={handleChange} className='lInput' />
        </div>
        <div className='emailinput'>
          <label htmlFor="email">Email</label>
          <input type="email" placeholder='Email...' id="email" onChange={handleChange}  className='lInput' />
        </div>
        <div className='passinput'>
          <label htmlFor="username"> Password</label>
          <input type="password" placeholder='password' id="password" onChange={handleChange} className='lInput' />
        </div>
        
          <button disabled={loading} onClick={handleReg} className="button">Register</button>
      </div>
    </div>
  )
}
