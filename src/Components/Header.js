import React from "react";
import styled from 'styled-components';

export default function Header (){
    return(
        <Head>
            <p>Trackit</p>
            <img src = "" alt = "" />
        </Head>
    );
}

const Head = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
    background-color: #126BA5;
    img{
        width: 51px;
        height: 51px;
        border-radius: 98px;
        margin-right: 18px;
    }
    p{
        font-size: 39px;
        margin-left: 18px;
    }
`