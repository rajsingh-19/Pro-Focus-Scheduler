import './App.css';
import Home from './Pages/Home';
import images from "./db/Images";
import { useBrowser } from "./context/BrowserContext";
import { useEffect } from 'react';
import User from './Pages/User';

const index = Math.floor(Math.random() * 21);
const bgImg = images[index].image;

function App() {

  const {name, BrowserDispatch} = useBrowser();
  useEffect(() => {
    const userName = localStorage.getItem("name");
    BrowserDispatch({
      type: "NAME",
      payload: userName
    })
  }, []);

  return (
    <div className='app background' style={{backgroundImage: `url(${bgImg})`}}>
      {name ? <User /> : <Home /> }
    </div>
  );
}

export default App;
