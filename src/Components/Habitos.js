import React from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";
//import axios from "axios";

export default function Habitos (){

    function AdicionaHabito(){
    }

    return(
        <>
            <Header />
            <MHabitos>
                <p>Meus hábitos</p>
                <button onClick = {AdicionaHabito} > <p>+</p> </button>
            </MHabitos>
            <Footer />
        </>
    );
}

const MHabitos = styled.div`
    display: flex;
    justify-content: space-evenly;
`