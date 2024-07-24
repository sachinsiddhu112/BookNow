import React, { useEffect, useState } from 'react'
import "./SearchItem.css";
import { useNavigate } from 'react-router-dom';
import Alert from "../alert/Alert.jsx";
import { LiaRupeeSignSolid } from "react-icons/lia";
export default function SearchItem({ item, mobileView, dates }) {
  const [noMore, setNoMore] = useState(true);
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();

  const next = () => {
    console.log(dates);
    const date1=new Date();
    if (dates[0].startDate.getTime() != dates[0].endDate.getTime()) {
      navigate(`/hotels/${item._id}`);
    }
    else {
      setAlert(true);
    }
  }
  return (
    <div className="container">
      {alert && <div>
        <Alert alert={alert} setAlert={setAlert} type="warning" msg="Please select dates before selecting the hotel." />
      </div>
      }
      <div className='searchItem'>
        <img
          src={item.photos[0] ? item.photos[0] : "https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"}
          alt=""
          className="siImg"
        />
        <div className="siDesc">
          <h1 className="siTitle">{item.name}</h1>

          <span className="siDistance">{item.distance}m from center</span>
          <span className="siTaxiOp">Free airport taxi</span>
          <span className="siSubtitle">
            {item.title}
          </span>
          <span className='siSubtitle'>Type:{item.type}</span>
          <span className='siSubtitle'>City:{item.city}</span>


          <span className="siFeatures">

            {mobileView && noMore ? item.desc.substring(0, 30) + "..." : item.desc}
            {mobileView && <button className='more' onClick={() => { setNoMore(!noMore) }}>
              {noMore ? "more" : "less"}
            </button>}
          </span>
          <span className="siCancelOp">Free cancellation </span>
          <span className="siCancelOpSubtitle">
            You can cancel later, so lock in this great price today!
          </span>
        </div>
        <div className="siDetails">

          {item.rating && <div className="siRating">
            <span>Excellent</span>
            <button>{item.rating}</button>
          </div>}
          <div className="siDetailTexts">
            <span className="siPrice"><LiaRupeeSignSolid style={{ position: "relative", top: "5px" }} />
              {item.cheapestPrice}</span>
            <span className="siTaxOp">Includes taxes and fees</span>
            {

              <button className="siCheckButton" onClick={next}>See availability</button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
