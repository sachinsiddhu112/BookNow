import React, { useEffect, useState, useRef, useContext } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar.jsx";
import Header from "../../components/header/Header.jsx";
import { DateRange } from 'react-date-range';
import "./List.css";
import { format } from 'date-fns';
import SearchItem from '../../components/searchItem/SearchItem.jsx';
import useFetch from '../../hooks/useFetch';
import { da, pt } from 'date-fns/locale';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";

import { SearchContext } from '../../context/SearchContext.js';
import Alert from '../../components/alert/Alert.jsx';
import Loading from '../../components/loading/Loading.jsx';


export default function List() {


  const navigate = useNavigate();
  //some condition checking variables.
  const [openDate, setOpenDate] = useState(false);
  const min = useRef(undefined);
  const max = useRef(undefined);
  const [typeOpen, setTypeOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [priceFilter, setPriceFilter] = useState(false);




  //handling the type of service customer wants.
  const [pType, setPType] = useState([]);
  const thotel = useRef(false);
  const tresort = useRef(false);
  const tvilla = useRef(false);
  const tapartment = useRef(false);
  const tcabin = useRef(false);
  const [filterData,setFilterData] = useState([]);
  const { dispatch, dates, city, options } = useContext(SearchContext);

  //setting search parameters 
  // const [destination, setDestination] = useState(location.state ? location.state.destination : "mumbai");
  const destination = useRef(city ? city : "mumbai")

  const [inDates, setInDates] = useState(dates ? dates :
    [[{
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }]]);
  const [inOptions, setInOptions] = useState(options ? options : { adult: 1, children: 0, room: 1 });

  //fetching data from api

  const { data, loading, error, reFetch } = useFetch(`https://booknow-6odc.onrender.com/api/hotels?city=${destination.current}&min=${min.current || 0}&max=${max.current || 1000000}`)


  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    window.screen.width < 750 ? setMobileView(true) : setMobileView(false);
    dispatch({ type: "NEW_SEARCH", payload: { city: destination.current, dates: inDates, options: inOptions } })
    dataFilter()
    console.log("handleClick",data)
  }, [destination.current, inOptions, inDates, window.screen.width,data])


  //search functionalty 
  const handleClick = () => {
    
    setOpenFilter(false);
    dispatch({ type: "NEW_SEARCH", payload: { city: destination.current, dates: inDates, options: inOptions } })
    dataFilter()
    
    
  }

  //for opening date modal
  const settinginDates = () => {
    if (openDate == false) {
      setOpenDate(true);
    }
    else {
      setOpenDate(false);
    }
  }
  //for filtering the data and store in filterData.
  const dataFilter = () => {
   
    const filteredData = pType.flatMap(ty => data.filter(item => item.type === ty));
  
  if (pType.length % 5 === 0) {
    setFilterData(data);
  } else {
    setFilterData(filteredData);
  }
  }

  //setting the typeOpen variable to open type modal.
  const handleType = () => {
    setTypeOpen((prev) => !prev);
  }

  //adding new type or removing existing one
  const addType = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setPType([...pType, value]);

    } else {
      const newPType = pType.filter((item, i) => {
        return item !== value;
      })
      setPType(newPType);
    }
  }



 
  
  return (
    <div>
      
        <> <Navbar />
          <Header type="list" />
        </>

      <div className="listContainer">
        <div className="listWrapper">
          <div className={`listSearch ${openFilter?"showSearchList":""}`}>
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label >Desitination</label>
              <input type='text' defaultValue={destination.current}
                onChange={(e) => {
                  destination.current = e.target.value
                }} />
            </div>
            <div className="lsItem">
              <label >Check-in Date</label>
              <span onClick={settinginDates}>{`${format(inDates[0].startDate, "dd/MM/yyyy")} to ${format(inDates[0].endDate, "dd/MM/yyyy")}`}</span>

              {openDate && (<DateRange onChange={(item) => setInDates([item.selection])} minDate={new Date()} ranges={inDates} editableDateInputs={true} moveRangeOnFirstSelection={true} />
              )}
            </div>
            <div className="lsItem">
              <div className="lsOption">
                <label >options</label>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Min price <small>per night</small></span>
                  <input type="number" onChange={e => min.current = e.target.value} className='lsOptionInput' />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Max price <small>per night</small></span>
                  <input type="number" onChange={e => max.current = e.target.value} className='lsOptionInput' />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input type="number" defaultValue={inOptions.adult}
                    onChange={(e) => setInOptions({ adult: e.target.value, children: inOptions.children, room: inOptions.room })}
                    className='lsOptionInput' min={1} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input type="number" defaultValue={inOptions.children}
                    onChange={(e) => setInOptions({ adult: inOptions.adult, children: e.target.value, room: inOptions.room })} className='lsOptionInput' min={0} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input type="number" defaultValue={inOptions.room}
                    onChange={(e) => setInOptions({ adult: inOptions.adult, children: inOptions.children, room: e.target.value })}
                    className='lsOptionInput' min={1} />
                </div>
                {typeOpen === false ? (
                  <div className="lsOptionItemPType">
                    <div className='lsOptionItem'>
                      <span className='lsOptionText'>Type</span>

                      <button className='pTypeBtn' onClick={handleType} >{pType.length % 5 == 0 ? "all" : "applied"}</button>
                    </div>
                    <div className='pTypeList'>
                      { !mobileView && (pType.map((item, i) => (
                        <div className='pTypeItem' key={i}>
                          <button className=''>{item}</button>
                          <span className='pTypeItemRemove' value={item} onClick={() => {

                            if (item == 'apartment') {
                              tapartment.current = !tapartment.current
                            }
                            else if (item == 'resort') {
                              tresort.current = !tresort.current;
                            }
                            else if (item == 'cabin') {
                              tcabin.current = !tcabin.current
                            }
                            else if (item == 'villa') {
                              tvilla.current = !tvilla.current
                            }
                            else if (item == 'hotel') {
                              thotel.current = !thotel.current;

                            }
                            const newPType = pType.filter((val) => {
                              return item !== val;
                            })
                            setPType(newPType);

                          }}>{<IoCloseSharp />}</span>

                        </div>
                      )))
                      }
                    </div>

                  </div>) : (
                  <div className="tlist">
                    <div className="titem">
                      <span className='itemtext'>Hotel</span>
                      <input type='checkbox' value="hotel" className='iteminput'
                        defaultChecked={thotel.current} onChange={(e) => {
                          addType(e);
                          thotel.current = !thotel.current;
                        }} />
                    </div>
                    <div className="titem">
                      <span className='itemtext'>Apartment</span>
                      <input type='checkbox' className='iteminput' value="apartment"
                        defaultChecked={tapartment.current} onChange={(e) => {
                          addType(e);
                          tapartment.current = !tapartment.current;
                        }} />
                    </div>
                    <div className="titem">
                      <span className='itemtext'>Resort</span>
                      <input type='checkbox' className='iteminput' value="resort"
                        defaultChecked={tresort.current} onChange={(e) => {
                          addType(e);
                          tresort.current = !tresort.current;
                        }} />
                    </div>
                    <div className="titem">
                      <span className='itemtext'>Villa</span>
                      <input type='checkbox' className='iteminput' value="villa"
                        defaultChecked={tvilla.current} onChange={(e) => {
                          addType(e);
                          tvilla.current = !tvilla.current;
                        }} />
                    </div>
                    <div className="titem">
                      <span className='itemtext'>Cabin</span>
                      <input type='checkbox' className='iteminput' value='cabin'
                        defaultChecked={tcabin.current} onChange={(e) => {
                          addType(e);
                          tcabin.current = !tcabin.current;
                        }} />
                    </div>
                    <button className='closebtn' onClick={handleType}>Close</button>
                  </div>

                )}
              </div>
            </div>
            <button onClick={handleClick}>{openFilter?(<>Apply</>):(<>Search</>)}</button>
          </div>
          <div className={`listResult ${openFilter ? "toggleListResult":""}`}>
            {loading ? <Loading /> :
              <>
                {destination.current ? (
                  <>
                   
                      <>
                        {filterData.length > 0 && pType.length>0 && pType.length<5 ?
                          <>
                            { mobileView && <span className='filterText' onClick={() => setOpenFilter(true)}>Filter</span>}

                            {filterData.map(item => (
                              <SearchItem item={item} key={item._id}
                                mobileView={mobileView} dates={inDates} openFilter={openFilter} />


                            ))}
                          </>
                          : (data.length > 0 ?
                            <>
                            { mobileView &&  <span className='filterText' onClick={() => setOpenFilter(true)}>Filter</span>}
                              {data.map(item => (
                                <SearchItem item={item} key={item._id}
                                  mobileView={mobileView} dates={inDates} />


                              ))}
                            </>
                            : <span style={{ marginLeft: "20%" }} >NO ITEM TO SHOW,CHECK YOUR PREFERENCE</span>)
                        }
                      </>
                    

                  </>
                ) : <span style={{ marginLeft: "20%" }} >NO ITEM TO SHOW,CHECK YOUR DESTINATION</span>}
              </>

            }


          </div>
        </div>
      </div>

    </div>
  )
}
