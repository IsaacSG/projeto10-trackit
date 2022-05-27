import { createContext, useState } from "react";

const ProgressoContext = createContext();

export function ProgressoProv({children}) {

    const [progresso, setProgresso] = useState(0);

    return(
        <ProgressoContext.Provider value = {{ progresso, setProgresso}}>
            {children}
        </ProgressoContext.Provider>
    );
}

export default ProgressoContext