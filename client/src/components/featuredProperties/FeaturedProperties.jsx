import React, { useEffect, useState } from 'react'
import "./FeaturedProperties.css"
import useFetch from '../../hooks/useFetch';
import { useSearchParams } from 'react-router-dom';

export default function FeaturedProperties() {

  const { data, loading, error } = useFetch("/hotels?featured=true,limit=6");
 console.log(data);
 
 
  return (
    <div className='fp'>
      {loading ? "loading" :
     
        (
          <>
            {data.map((item,i) => (
              <div className="fpItem" key={i}>
                <img
                  src={ item.photos[0]}
                  alt=""
                  className="fpImg"
                />
                <span className="fpName">{item.name}</span>
                <span className="fpCity">{item.city}</span>
                <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
                { item.rating && <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>}
              </div>
            ))}
          </>
        )
      }
    </div>
  )
}
