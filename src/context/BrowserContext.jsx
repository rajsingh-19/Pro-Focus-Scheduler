import { useContext, createContext, useReducer } from "react";
import { BrowserReducer } from "../reducer/BrowserReducer";

const initialValue = {
    name: "",
    time: "",
    meridiem: "",
    greetMsg: "",
    focus: null,
    userLocation: null

};
const BrowserContext = createContext();

const BrowserProvider = ({ children }) => {
    const [{name, time, meridiem, greetMsg, focus, userLocation}, BrowserDispatch] = useReducer(BrowserReducer, initialValue);

    return (
        <BrowserContext.Provider value={{name, time, meridiem, greetMsg, focus, userLocation, BrowserDispatch }}>
            {children}
        </BrowserContext.Provider>
    );
}
const useBrowser = () => useContext(BrowserContext);

export {BrowserProvider, useBrowser};
