import React, { useContext, useState } from 'react'
import "./Login.css";
import { AuthContext } from '../../context/AuthContext';
import Alert from '../../components/alert/Alert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Login() {

  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined
  })
  const [alert,setAlert]=useState(false);
  const [msg,setMsg]= useState("");
  const { loading, dispatch } = useContext(AuthContext);
  

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }
  const handleLogin = async (e) => {
    e.preventDefault();

    //validate user credentials
    if (!credentials.password || !credentials.username) {
      setAlert(true);
      setMsg("Check your credentials");
      return;
  } 

    dispatch({ type: "LOGIN_START" });
    try {

      const res = await axios.post(`https://booknow-6odc.onrender.com/api/auth/login`, credentials);

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");

    }
    catch (err) {
      setAlert(true);
      setMsg("USER NOT FOUND");
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data })
    }
  }

 
  return (

    <div className='login'>
      <div className="lcontainer">
        {alert && <Alert setAlert={setAlert} msg={msg} type="warning" />}
        <div className='usernameinput'>
          <label htmlFor="username" className='inputLabel' > Username</label>
          <input type="text" placeholder='username' id="username" onChange={handleChange} className='lInput' />
        </div>
        <div className='passinput'>
          <label htmlFor="username" className='inputLabel'> Password</label>
          <input type="password" placeholder='password' id="password" onChange={handleChange} className='lInput' />
        </div>
          <button disabled={loading} onClick={handleLogin} className="button">Login</button>
      </div>
    </div>
  )
}
