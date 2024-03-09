export const BrowserReducer = (state, {type, payload }) => {
    switch (type) {
        case "NAME": {
            return { 
                ...state,
                name: payload
            };
        }
        case "TIME": {
            return {
                ...state,
                time: payload
            }
        }
        case "MERIDIEM": {
            return {
                ...state,
                meridiem: payload >= 0 && payload  <= 12 ? "AM" : "PM"
            }
        }
        case "GREETMSG": {
            return {
                ...state,
                greetMsg: payload >= 0 && payload <= 12 ? "Good Morning !" : payload > 12 && payload <= 17 ? "Good afternoon !" : payload > 17 && payload <= 22 ? "Good Evening !" : "Good Night !"
            }
        }
        case "FOCUS": {
            return {
                ...state,
                focus: payload
            }
        }
        case "DELETE": {
            return {
                ...state,
                focus: null
            }
        }
        default: {
            return state;
        }
    }
};

