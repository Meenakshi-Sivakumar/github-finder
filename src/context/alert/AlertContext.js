import { createContext, useReducer } from "react";

const AlertContext = createContext();

export const AlertProvider = ({children}) => {

    const initialState = null;

    const [state, dispatch] = useReducer(AlertContext, initialState)

    return <AlertContext.Provider value={{alert: state}}>
        {children}
    </AlertContext.Provider>
}