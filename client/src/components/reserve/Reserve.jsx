import React, { useContext, useState } from 'react'
import "./Reserve.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import useFetch from "../../hooks/useFetch"
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext.js';
import axios from 'axios';
import Alert from '../alert/Alert.jsx';


export default function Reserve(props) {
  
  const navigate = useNavigate();
  const location = useLocation();
  const id = props.hotelId
  const { user } = useContext(AuthContext);
  const [alert,setAlert]=useState(false);
  const [msg,setMsg]=useState("");
  const { data, loading, error,reFetch } = useFetch(`/hotels/room/${id}`);
   
  let len=data.length;
  ;


  const { dates ,options} = useContext(SearchContext);
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    let list = [];

    while (date <= end) {
      list.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return list;
  }
  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailabel = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some(date =>
      allDates.includes(new Date(date).getTime()));
    return !isFound;
  }

  const [selectedRooms, setSelectedRooms] = useState([]);
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter(item => item !== value));

  }


  const handleClick = async () => {
    reFetch();
    try {
       await Promise.all(selectedRooms.map((roomId) => {
         const res = axios.put(`/rooms/availability/${roomId}`, { dates: allDates })
        return res.data;

       }))
      checkoutHandler(props.data.title,props.days * options.room *props.data.cheapestPrice);;
      
    } catch (err) {

    }
  }

  const back = () => {
    navigate("/");
  }

  const checkoutHandler=async(name,amount)=>{
    const res=await axios.post("/payment/checkout",{
      name,amount
    })
    const order=res.data
   console.log(order)
    var options = {
      "key":"rzp_test_N3syLFnTZSAOec",
      "amount": amount, 
      "currency": "INR",
      "name": "BookNow!",
      "description": "Test Transaction",
      "image":"",
      "order_id": order.id,
      
      "handler":function (response){
        // Capture payment details
        var paymentDetails = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature
        };

        // Send payment details to the backend for verification
        fetch('/payment/payment-verification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paymentDetails)
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            if (data.success) {
                // Payment verified successfully
               navigate("/")
            } 
            
        }).catch(function(error) {
          setMsg(error.message);
           setAlert(true);
        });
    },
      "prefill": {
          "name": user.username,
          "email": user.email,
          "contact":"9999999999"
      },
      
      "theme": {
          "color": "#3a86ff"
      },
     
  };
  var rzp1 = new window.Razorpay(options);
  rzp1.open();
    
  }
  return (
    <div className='reserve'>
      <Alert alert={alert} setAlert={setAlert} msg={msg} type="danger" />
      <div className="rContainer">
        <FontAwesomeIcon icon={faCircleXmark} className='rClose' onClick={back} />
        <span>Select your room:</span>
          <div className="rItem" >
            <div className="rItemInfo">
              <div className="rTitle">{data[len-1] ? data[len-1].title : "Luxary Rooms"}</div>
              <div className="rDesc">{data[len-1]?data[len-1].desc:"It is comfortable and cheaper hotel so give us a chace of serving you"}</div>
              <div className="rMax">Max people: <b>{data[len-1]?data[len-1].maxPeople:"3"}</b></div>
            </div>
            <div className="rSelectRooms">
              {data[len-1]?(data[len-1].roomNumbers.map((roomNumber, i) => (
                <div className="room" key={i}>
                  <label > {roomNumber.number}</label>
                  <input type="checkbox" value={roomNumber._id} onChange={handleSelect} disabled={!isAvailabel(roomNumber)} />
                </div>

              ))):"Not available any room"
            }
            </div>
          </div>
       

        <button disabled={len>=1?false:true} onClick={handleClick} className="rButton">Reserve Now!</button>
      </div>
    </div>
  )
}
