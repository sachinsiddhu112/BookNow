import React, { useEffect, useState, useRef, useContext } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar.jsx";
import Header from "../../components/header/Header.jsx";
import { DateRange } from 'react-date-range';
import "./List.css";
import { format } from 'date-fns';
import SearchItem from '../../components/searchItem/SearchItem.jsx';
import useFetch from '../../hooks/useFetch';
import { pt } from 'date-fns/locale';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { IoCloseSharp } from "react-icons/io5";
import { SearchContext } from '../../context/SearchContext.js';
import Alert from '../../components/alert/Alert.jsx';
export default function List() {
 
  const location = useLocation();
  const navigate = useNavigate();
 //some condition checking variables.
  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [typeOpen, setTypeOpen] = useState(false);

  
  //handling the type of service customer wants.
  const [pType, setPType] = useState([]);
  const thotel = useRef(false);
  const tresort = useRef(false);
  const tvilla = useRef(false);
  const tapartment = useRef(false);
  const tcabin = useRef(false);
  const filterData = useRef([]);
  const { dispatch } = useContext(SearchContext);

  //setting search parameters 
  const [destination, setDestination] = useState(location.state ? location.state.destination : "mumbai");
  const [dates, setdates] = useState(location.state ? location.state.dates :
    [[{
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
  }]]);
  const [options, setOptions] = useState(location.state ? location.state.options : { adult: 1, children: 0, room: 1 });

  //fetching data from api
  const { data, loading, error, reFetch } = useFetch(`/hotels?city=${destination}&min=${min || 0}&max=${max || 1000000}`)


  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    window.screen.width < 900 ? setMobileView(true) : setMobileView(false);


  }, [])
  
  const handleClick = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } })
    navigate("/hotels", { state: { destination, dates, options } })
    
    pType.map((ty, i) => {

      const newData = data.filter((item, j) => {
        return item.type == ty;
      })
      if (i == 0 && newData.length > 0) {
        filterData.current = newData;
      } else {
        filterData.current = [...filterData.current, ...newData];
      }

    })

    if (pType.length % 5 == 0) {
      filterData.current = data;
    }


    reFetch()
  }


  const settingDates = () => {
    if (openDate == false) {
      setOpenDate(true);
    }
    else {
      dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } })
      navigate("/hotels", { state: { destination, dates, options } })
      setOpenDate(false);
    }
  }
  //handling the type of room customer looking
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
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          {mobileView ? "" : (<div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label >Desitination</label>
              <input type='text' defaultValue={destination}
                onChange={(e) => setDestination(e.target.value)} />
            </div>
            <div className="lsItem">
              <label >Check-in Date</label>
              <span onClick={settingDates}>{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>

              {openDate && (<DateRange onChange={(item) => setdates([item.selection])} minDate={new Date()} ranges={dates} editableDateInputs={true} moveRangeOnFirstSelection={false} />
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
                    onChange={(e) => setOptions({ adult: e.target.value, children:options.children , room: options.room })}
                    className='lsOptionInput' min={1} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input type="number" defaultValue={options.children}
                    onChange={(e) => setOptions({ adult: options.adult, children: e.target.value, room: options.room })} className='lsOptionInput' min={0} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input type="number" defaultValue={options.room}
                    onChange={(e) => setOptions({ adult: options.adult, children: e.target.value, room: e.target.value})}
                    className='lsOptionInput' min={1} />
                </div>
                {typeOpen === false ? (
                  <div className="lsOptionItemPType">
                    <div className='lsOptionItem'>
                      <span className='lsOptionText'>Type</span>

                      <button className='pTypeBtn' onClick={handleType} >{pType.length % 5 == 0 ? "all" : "applied"}</button>
                    </div>
                    <div className='pTypeList'>
                      {pType.map((item, i) => (
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
                      ))
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
            <button onClick={handleClick}>Search</button>
          </div>)}

          <div className="listResult">
            {loading ? "loading" :
              <>{(filterData.current.length > 0 ? 
                filterData.current.map(item => (
                <SearchItem item={item} key={item._id} 
                mobileView={mobileView} dates={dates} />


              )) : data.map(item => (
                <SearchItem item={item} key={item._id} 
                mobileView={mobileView} dates={dates} />


              )))}
              </>}
          </div>
        </div>
      </div>

    </div>
  )
}
