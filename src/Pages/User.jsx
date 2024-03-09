import React, { useEffect, useState } from 'react';
import "../styles/user.css";
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

  useEffect(() => {
    const currentStatus = localStorage.getItem("checkedStatus");
    currentStatus === "true" ? setIsChecked(true) : setIsChecked(false)  
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

    
    BrowserDispatch({
      type: "MERIDIEM",
      payload: hours
    });

    BrowserDispatch({
      type:"GREETMSG",
      payload: hours
    });


  };

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

  

  const handleCheckbox = (event) => {
    if(event.target.checked) {
      setIsChecked(isChecked => !isChecked);
    } else {
      setIsChecked(isChecked => !isChecked);
    }
    localStorage.setItem("checkedStatus", !isChecked);
  };

  const handleDelete = () => {
    BrowserDispatch({
      type: "DELETE"
    })
    setIsChecked(false);
    localStorage.removeItem("checkedStatus");
    localStorage.removeItem("focus");
  }

  return (
    <div className='user-page'>
        <div className='time-div text3 primary float-l'>{time} {meridiem}</div>
        <div className='primary text greet-div'>{greetMsg}, {name}</div>
        {focus ?  
        <div className='primary'>
          <p className='flex
           justify-center p-t text3'>Today's Focus</p>
          <div className='focus-container flex justify-center items-center'>
          <label className={`${isChecked ? "strike" : ''} flex justify-center p-t-10 cursor`}>
            <input type="checkbox" onChange={handleCheckbox} checked={isChecked}  className='text2 checkbox cursor'/>
            <span className='text2 p-l10 p-r10'>{focus}</span>
          </label>
          <button className='del-btn justify-center text3' onClick={handleDelete}><MdDeleteForever className='items-center del-icon cursor'/></button>
          </div>
        </div> :
        <div>
        <p className='primary flex justify-center text2 p-t-10'>What's your today's main focus ?</p>
          <form onSubmit={handleFormSubmit} className='flex justify-center p-t-10'>
            <input required type="text" onKeyDown={handleTodayFocus} className='inp-focus text2 primary' />
          </form>
        </div> }

        <div className='quotes primary text3 '>{quote}</div>
    </div>
  )
}

export default User;
