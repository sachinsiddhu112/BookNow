import React, { useEffect, useState,useRef } from 'react'
import { useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar.jsx";
import Header from "../../components/header/Header.jsx";
import { DateRange } from 'react-date-range';
import "./List.css";
import { format } from 'date-fns';
import SearchItem from '../../components/searchItem/SearchItem.jsx';
import useFetch from '../../hooks/useFetch';
import { pt } from 'date-fns/locale';

export default function List() {

  const location = useLocation();


  let d1 = new Date();
  let d2 = new Date();
  d2.setDate(d2.getDate() + 1);

  const [destination, setDestination] = useState(location.state?location.state.destination:"mumbai" );
  
  const newDestination=useRef("mumbai");

  const [dates, setDates] = useState(location.state ? location.state.dates : (
    [{ endDate: d2, startDate: d1, key: "selection" }]
  ));
 
  const [options, setOptions] = useState(location.state ? location.state.options : { adult: 1, children: 0, room: 1 });

  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [typeOpen,setTypeOpen]=useState(false);
  const [pType,setPType]=useState([]);
  const [hotel,setHotel]=useState(false);
  
  const { data, loading, error, reFetch } =useFetch(`/hotels?city=${destination}&min=${min || 0}&max=${max || 1000000}`)

  const handleClick = () => {
    
    setDestination(newDestination.current.toLowerCase());
    
    reFetch()
  }

  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    window.screen.width < 900 ? setMobileView(true) : setMobileView(false);
  }, [])
  
const handleType = () => {
  setTypeOpen((prev)=> !prev);
}
const addType=(ty)=>{
 const newType= pType.filter((item,i)=>{
                return item==ty?false:true;
  })
  setPType(newType);
}
console.log(pType,typeOpen)

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          { mobileView ? "" : (<div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label >Desitination</label>
              <input type='text' defaultValue={destination} 
              onChange={(e)=>newDestination.current=e.target.value}/>
            </div>
            <div className="lsItem">
              <label >Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>

              {openDate && (<DateRange onChange={(item) => setDates([item.selection])} minDate={new Date()} ranges={dates} editableDateInputs={true} moveRangeOnFirstSelection={false} />
              )}
            </div>
            <div className="lsItem">
              <div className="lsOption">
                <label >Options</label>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Min price <small>per night</small></span>
                  <input type="number" onChange={e => setMin(e.target.value)} className='lsOptionInput' />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Max price <small>per night</small></span>
                  <input type="number" onChange={e => setMax(e.target.value)} className='lsOptionInput' />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input type="number" defaultValue={options.adult} 
                 onChange={(e)=>setOptions({adult:options.adult,children:e.target.value,room:options.room})}
                  className='lsOptionInput' min={1} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input type="number" defaultValue={options.children} 
                  onChange={(e)=>setOptions({adult:options.adult,children:e.target.value,room:options.room})} className='lsOptionInput' min={0} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input type="number" defaultValue={options.room} 
                 onChange={(e)=>setOptions({adult:options.adult,children:e.target.value,room:options.room})}
                  className='lsOptionInput' min={1} />
                </div>
                {typeOpen===false?(
                <div className="lsOptionItem">
                  <span className='lsOptionText'>Type</span>
                  <input type='text'  className='lsOptionInput' onClick={handleType}/>
                </div>):(
                   <div className="tlist">
                    <div className="titem">
                      <span className='itemtext'>Hotel</span>
                      <input type='checkbox' className='iteminput' onClick={}/>
                    </div>
                    <div className="titem">
                      <span className='itemtext'>Apartment</span>
                      <input type='checkbox' className='iteminput' />
                    </div>
                    <div className="titem">
                      <span className='itemtext'>Resort</span>
                      <input type='checkbox' className='iteminput' />
                    </div>
                    <div className="titem">
                      <span className='itemtext'>Villa</span>
                      <input type='checkbox' className='iteminput'/>
                    </div>
                    <div className="titem">
                      <span className='itemtext'>Cabin</span>
                      <input type='checkbox' className='iteminput'/>
                    </div>
                    <button className='closebtn' onClick={handleType}>Close</button>
                   </div>
                
                )}
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>)}
          <div className="listResult">
            {loading ? "loading" :
              <>{data.map(item => (
                <SearchItem item={item} key={item._id} mobileView={mobileView} />


              ))}
              </>}
          </div>
        </div>
      </div>

    </div>
  )
}
