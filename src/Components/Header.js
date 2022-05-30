import React from "react";
import styled from 'styled-components';
import userContext from "../Contexto/UserContext";
import { useContext } from "react";

export default function Header (){

    const {user} = useContext(userContext);

    return(
        <Head>
            <p>Trackit</p>
            <img src = {user.image} alt = {user.name} />
        </Head>
    );
}

const Head = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 70px;
    background-color: #126BA5;
    position: fixed;
    top: 0;
    left: 0;
    box-sizing: border-box;
    img{
        width: 51px;
        height: 51px;
        border-radius: 98px;
        margin-right: 18px;
    }
    p{
        font-family: "Playball";
        font-size: 39px;
        margin-left: 18px;
        color: #FFFFFF;
    }
`