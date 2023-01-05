import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

const GlobalProvider = (props) => {
    console.log("entra al context y asigna el valor")
    const [messages, setMessages] = useState([])
    return(
        <GlobalContext.Provider
            value={{
                messages, setMessages
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;