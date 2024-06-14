import React, { useEffect } from 'react'
import "./Alert.css";
import { AiOutlineClose } from "react-icons/ai";


export default function Alert(props) {

  useEffect(()=>{
  setTimeout(()=>{
  props.setAlert(false);
  },2000)
  },[])
  const capitalize=(word)=>{
    if(word==='danger'){
      word='failed';
    }
    
    return word.toUpperCase() 
  }


  return (
    <div className={`alert-container ${props.type}`}>
       <div className="alert" role='alert'>
        <span><strong>{capitalize(props.type)}:</strong></span>
        <span>{props.msg} </span>
       
        </div>
      <button className='btn' onClick={()=> props.setAlert(false)}><AiOutlineClose /></button>
    </div>
   
  )
}
