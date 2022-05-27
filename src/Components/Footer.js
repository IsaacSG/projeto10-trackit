import React from "react";
import styled from "styled-components";
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { Link } from "react-router-dom";

export default function Footer (){
    const percentage = 66;
    return(
        <Foot>
            <Link to = {"/habitos"} style={{ textDecoration: 'none'}}> <p>Habitos</p> </Link>
            <Link to = {"/hoje"} style={{ textDecoration: 'none', textDecorationColor: 'black'}}> <p>Hoje</p> </Link>
            <Link to = {"/historico"} style={{ textDecoration: 'none'}}> <p>Historico</p> </Link>
        </Foot>
    );
}

const Foot = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
`