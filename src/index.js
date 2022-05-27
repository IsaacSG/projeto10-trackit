import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import "./Styles/reset.css";

//Email: zezin@driven.com// //Senha: 987654321

function Index(){
    return(
        <>
            <App />
        </>
    );
}

ReactDOM.render(<Index />, document.querySelector(".root"));