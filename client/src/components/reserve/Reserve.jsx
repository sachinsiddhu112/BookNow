import React, { useContext, useState } from 'react'
import "./Reserve.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import useFetch from "../../hooks/useFetch"
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import axios from 'axios';



export default function Reserve() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  console.log(id)
  const { data, loading, error,reFetch } = useFetch(`/hotels/room/${id}`);
  console.log(data)
  let len=data.length;
  ;


  const { dates } = useContext(SearchContext);
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
      navigate("/");
    } catch (err) {

    }
  }

  const back = () => {
    navigate("/hotels");
  }

  return (
    <div className='reserve'>
      <div className="rContainer">
        <FontAwesomeIcon icon={faCircleXmark} className='rClose' onClick={back} />
        <span>Select your room:
        </span>
        
          <div className="rItem" >
            <div className="rItemInfo">
              <div className="rTitle">{data[len-1] ? data[len-1].title : "Luxary Rooms"}</div>
              <div className="rDesc">{data[len-1]?data[len-1].desc:"It is comfortable and cheaper hotel so give us a chace of serving you"}</div>
              <div className="rMax">Max people: <b>{data[len-1]?data[len-1].maxPeople:"3"}</b></div>
              <div className="rPrice">Price:{data[len-1]?data[len-1].price:"$1000"}</div>
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
