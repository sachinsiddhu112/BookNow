import React, { useEffect, useState } from 'react'
import "./SearchItem.css";
import { Link, useActionData } from 'react-router-dom';


export default function SearchItem({ item, mobileView }) {
  const [noMore, setNoMore] = useState(true);
  
  return (
    <div className="searchItem">
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
         { mobileView && <button className='more' onClick={() => { setNoMore(!noMore) }}>
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
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
            <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
