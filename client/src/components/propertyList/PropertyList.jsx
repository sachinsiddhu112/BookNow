import React, { useEffect, useMemo } from 'react'

import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import "./PropertyList.css"
export default function PropertyList() {
  const { data, loading, error } = useFetch("/hotels/countByType");
  

  //We made Images array of object because data[i].count and type is showing undefinde in <h1> && <h2> tags this is because we were using map on two arrays and map accessed only the first array in syntax data && images.map(()=>{})
  //  so we have to some how get counts of particular type of property.Therefore we made images array with extra properties (count and type) show that we can directly access both images and count and type
  const images=[
   { img:"https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
   count:0,
   type: "Hotel" ,
   
  },
    {img:"https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
    count:0,
    type: "Apartment" ,  
  
  },
    {img:"https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
    count:0,
   type: "Resort" ,
  
  },
    {img:"https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
    count:0,
   type: "Villa" ,



},{
    img:"https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
    count:0,
    type: "Cabin" ,
  
  
  }
  ]
  
 
  return (
    <div className='pList'>
      { data.length===0  ?"loading":(
        <>
       {images.map((element,i)=>( <div className="pListItem" key={i} >
          <img
            src={element.img}
            alt=""
            className="pListImg"
          />
          <div className="pListTitles">
            
          <h1>{element.type}</h1>
            
            <h2> {data[i].count||0} {element.type}</h2>
          </div>
        </div>
       ))
      }
        
      </>
      )}
      
    </div>
  )
}
