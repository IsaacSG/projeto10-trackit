import { createContext, useState } from "react";

const userContext = createContext();

export function UserProv ({children}){
    const [body, setBody] = useState({});

    return (
        <userContext.Provider value={{body, setBody}}>
            {children}
        </userContext.Provider>
    );
}

export default userContext