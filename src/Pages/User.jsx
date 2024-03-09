import React, { useEffect, useState } from 'react';
import quotes from "../db/Quotes";
import { useBrowser } from '../context/BrowserContext';
import { MdDeleteForever } from "react-icons/md";

const index = Math.floor(Math.random() * 21);
const quote = quotes[index].quote;

const User = () => {
  const [isChecked, setIsChecked] = useState(false);

  const {name, time, meridiem, greetMsg, focus, BrowserDispatch} = useBrowser();

  useEffect(() => {
    getTime();
  }, [time]);

  useEffect(() => {
    const userFocus = localStorage.getItem("focus");
    BrowserDispatch({
      type: "FOCUS",
      payload: userFocus
    });
  }, []);

  const getTime = () => {
    const date = new Date();
    const hours = date.getHours();
    const mins = date.getMinutes();
    
    const hour = (hours < 10) ? `0${hours}` : `${hours}`;
    const min = (mins < 10) ? `0${mins}` : `${mins}`;

    const currentTime = `${hour}: ${min}`;
    setTimeout(getTime, 1000);

    BrowserDispatch({
      type: "TIME",
      payload: currentTime
    });
    // console.log(currentTime);
    
    BrowserDispatch({
      type: "MERIDIEM",
      payload: hours
    });

    BrowserDispatch({
      type:"GREETMSG",
      payload: hours
    });


  };
  // console.log(getTime);

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  const handleTodayFocus = (event) => {
    if(event.key === "Enter" && event.target.value.length > 0) {
      BrowserDispatch({
      type: "FOCUS",
      payload: event.target.value
      });
      localStorage.setItem("focus", event.target.value);
    }
  };

  // useEffect(() => {
  //   const currentStatus = localStorage.getItem("checkedStatus");
  //   currentStatus === "true" ? setIsChecked(true) : setIsChecked(false)  
  // }, []);

  const handleCheckbox = () => {
    setIsChecked(true);
  };

  const handleDelete = () => {
    localStorage.removeItem("focus");
  }

  return (
    <div>
        <div className='primary'>{time} {meridiem}</div>
        <div className='primary'>{greetMsg}, {name}</div>
        
        {focus ?  
        <div className='primary'>
          <p>Today's Focus</p>
          <label >
            <input type="checkbox" onChange={handleCheckbox} />
            <span className=''>{focus}</span>
          </label>
          <button className='del-btn' onClick={handleDelete}><MdDeleteForever /></button>
        </div> :
        <div>
        <div className='primary'>What's your today's main focus ?</div>
          <form onSubmit={handleFormSubmit}>
            <input required type="text" onKeyDown={handleTodayFocus} />
          </form>
        </div> }

        <div className='quotes primary text3'>{quote}</div>
    </div>
  )
}

export default User;
