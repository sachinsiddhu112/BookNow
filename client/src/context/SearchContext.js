import { createContext ,useEffect,useReducer} from "react"

const INITIAL_STATE = {
    city:sessionStorage.getItem("city")!==undefined?JSON.parse(sessionStorage.getItem("city")): undefined,
    dates: sessionStorage.getItem("dates")!==undefined?JSON.parse(sessionStorage.getItem("dates")): [],
    options:sessionStorage.getItem("options")!==undefined?JSON.parse(sessionStorage.getItem("options")) : {
        adult: 1,
        children: 0,
        room: 1
    }
}

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
    switch (action.type) {
        case "NEW_SEARCH":
            return action.payload

        case "RESET_SEARCH":
            return INITIAL_STATE;

        default:
            return state;
    }
}

export const SearchContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);
    useEffect(()=>{
        try{
            sessionStorage.setItem("dates",JSON.stringify(state.dates));
            sessionStorage.setItem("city",JSON.stringify(state.city));
            sessionStorage.setItem("options",JSON.stringify(state.options));
        }
        catch(err){
           console.log("dates",state.dates);
           console.log("options",state.options);
           console.log(err);
        }
       
    },[state.dates,state.options])

    return(
        <SearchContext.Provider value={{
             city: state.city, 
             dates: state.dates, 
             options: state.options, 
             dispatch }}>
            {children}
        </SearchContext.Provider>
    )
}