import React from 'react'
import "./MailList.css";
export default function MailList() {
  return (
    <div className='mail'>
      <h1 className='mailTitle'>Save time, save money!</h1>
      <span className="mailDesc">Sign up and we'all send the best deals to you.</span>
      <div className="mailInputController">
        <input type="text" placeholder='Your email'/>
            <button>Subscribe</button>
    
      </div>
    </div>
  )
}
