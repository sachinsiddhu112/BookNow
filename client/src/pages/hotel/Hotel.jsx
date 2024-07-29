import React, { useContext, useMemo, useState, useRef, useEffect } from 'react'
import "./Hotel.css";
import Navbar from "../../components/navbar/Navbar.jsx";
import Header from "../../components/header/Header.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import MailList from '../../components/mailList/MailList.jsx';
import Footer from '../../components/footer/Footer.jsx';
import useFetch from '../../hooks/useFetch';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext.js';
import { AuthContext } from '../../context/AuthContext.js';
import Reserve from '../../components/reserve/Reserve.jsx';
import axios from 'axios';
import { LiaRupeeSignSolid } from "react-icons/lia";
import Loading from '../../components/loading/Loading.jsx';


export default function Hotel() {
  const location = useLocation();

  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [noMore, setNoMore] = useState(false);
  const { data, loading, error } = useFetch(`https://booknow-6odc.onrender.com/api/hotels/find/${id}`)

  const [freeRooms, setFreeRooms] = useState(0);

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const photos = [

    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    ,
    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    ,
    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    ,
    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    ,
    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    ,
    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",

  ];


  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);

  }
  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    }
    else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  }
  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {

    const timeDiff = Math.abs(new Date(date2) - new Date(date1));

    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].startDate, dates[0].endDate);

  const handlClick = () => {
    if (user) {

      //navigate(`/hotels/find/${id}/book`)
      setOpenModal((prev) => !prev);

    }
    else {
      navigate("/login");
    }
  }




  //checking available rooms

  //function to fetch all rooms in selected hotel
  const fetchRooms = async () => {

    try {

      const res = await axios.get(`https://booknow-6odc.onrender.com/api/hotels/room/${id}`)

      return res.data;


    }
    catch (err) {
      console.log(err)
    }

  }


  //calculating all days or dates in selected date range
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




  //this function is checking is that a particular roomNumber is free or not in whole seleced period or not then return false.
  const isAvailabel = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some(date =>
      allDates.includes(new Date(date).getTime()));

    return !isFound;
  }

  useEffect(() => {

    //calling fetchRooms()

    const rooms = fetchRooms();

    //after getting data of rooms

    rooms.then((room) => {
      const len = room.length;

      //counting free rooms in selected time period
      let a = freeRooms + 1;

      len >= 1 ? room[len - 1].roomNumbers.map((roomNumber, i) => {

        isAvailabel(roomNumber) ? setFreeRooms((prev) => 1 + prev) : console.log("not free");


      }) : console.log("No Rooms")

    });
    return;
  }, [id])


  const handlBack = () => {
    navigate("/hotels")
  }
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? <Loading /> : (

        <div className="hotelContainer">
          {!openModal ? (
            <div>
              {open && window.screen.width > 600 && <div className="slider">
                <FontAwesomeIcon icon={faCircleXmark} className='close'
                  onClick={() => setOpen(false)} />
                <FontAwesomeIcon icon={faCircleArrowLeft} className='arrow' onClick={() => { handleMove("l") }} />
                <div className="sliderWrapper">
                  <img src={data.photos[slideNumber] ? data.photos[slideNumber] : photos[slideNumber]} alt="" className="sliderImg" />
                </div>
                <FontAwesomeIcon icon={faCircleArrowRight} className='arrow' onClick={() => { handleMove("r") }} />

              </div>}
              <div className="hotelWrapper">

                <h1 className="hotelTitle">{data.name}</h1>
                <div className="hotelAddress">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <span>{data.address}</span>
                </div>
                <span className="hotelDistance">
                  Excellent loaction -{data.distance}km from center
                </span>
                <span className="hotelPriceHighlight">Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi</span>
                <div className="hotelImages">

                  {data.length !== 0 ? data.photos.map((item, i) => (
                    (<div className="hotelImgWrapper" key={i}>
                      <img src={item} className='hotelImg' alt=""
                        onClick={() => handleOpen(i)} />
                    </div>)
                  )) : (photos.map((item, i) => (
                    (<div className="hotelImgWrapper" key={i}>
                      <img src={item} className='hotelImg' alt=""
                        onClick={() => handleOpen(i)} />
                    </div>)
                  )))}
                </div>
                <div className="hotelDetials">
                  <div className="hotelDetailsTexts">
                    <h1 className="hotelTitle">{data.title}</h1>
                    <p className="hotelDesc">
                      {window.screen.width < 750 && !noMore && data.length !== 0 ? data.desc.substring(0, 30) + "..." : data.desc}
                      {window.screen.width < 750 && <button className='more' onClick={() => { setNoMore(!noMore) }}>
                        {noMore ? "less" : "more"}
                      </button>
                      }
                    </p>
                  </div>
                  {
                    freeRooms >= options.room ? (
                      <div className="hotelDetialsPrice">
                        <h2>Perfect for a {days}-night stay!</h2>
                        <span> loacated in the real heart of Krakow , this  property has an excellent loaction score of 9.0</span>
                        <h2><b><LiaRupeeSignSolid style={{ position: "relative", top: "5px" }} />{(days) * data.cheapestPrice * options.room}</b> ({days} nights,{options.room} rooms)</h2>
                        <button onClick={handlClick}>Reserve or BookNow!</button>
                      </div>)
                      : (<div className="hotelDetialsPrice">
                        <h1>Sorry, We don't have {options.room} rooms available currently.</h1>
                        <button onClick={handlBack}>Back</button>
                      </div>)}
                </div>
              </div>
              <MailList />
              <Footer />

            </div>)
            : ( loading?<Loading/>:<Reserve className="modal" hotelId={id} data={data} days={days} />)

          }
        </div>
      )}


    </div>
  )
}
