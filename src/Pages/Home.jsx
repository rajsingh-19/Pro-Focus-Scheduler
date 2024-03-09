import { useBrowser } from '../context/BrowserContext';
import "../styles/home.css";

const Home = () => {
  
  const {name, BrowserDispatch } = useBrowser();
  
  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  const handleNameChange = (event) => {
    if(event.key === 'Enter' && event.target.value.length > 0) {
      BrowserDispatch({
        type: "NAME",
        payload: event.target.value
      });
      localStorage.setItem("name", event.target.value);
    }
  };
  
  return (
    <div className='home'>
      <div className='brand-heading text primary p-l p-t'>Pro Focus Scheduler</div>
      <div className='name-heading text primary flex justify-center items-center'>Hello !, What's your name ?</div>
      <form className='flex items-center justify-center' onSubmit={handleFormSubmit}>
        <input required className='inp-home text2' type="text" placeholder='Enter your name....' onKeyDown={handleNameChange} />
      </form>
    </div>
  )
}

export default Home
