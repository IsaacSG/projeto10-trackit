import {useContext, useEffect, useState} from "react";
import styled from "styled-components";
import { CircularProgressbar } from "react-circular-progressbar";
import { Link } from "react-router-dom";
import {BaseAPI, autorização} from "../Dados Globais/Dados";
import axios from "axios";
import userContext from "../Contexto/UserContext";
import ProgressoContext from "../Contexto/ProgressoContext";


export default function Footer (){
    
    const {body} = useContext(userContext);
    const {progesso, setProgresso} = useContext(ProgressoContext);
    const [habitos, setHabitos] = useState([]);

    function calcularProgresso (){
        let contador = 0;
        
        if(habitos.length === 0){
            return contador;
        }

        for(let i = 0; i < habitos.length; i++) {
            if(habitos[i].done === true) contador++
        }
        contador = Math.round(contador * 100 / habitos.length)
        setProgresso(contador);
    };

    function pegarHabitos(){
        const promisse = axios.get(`${BaseAPI}/habits/today`, autorização(body))
        promisse.then(resposta => setHabitos(resposta.data))
    };

    useEffect(() => {

        calcularProgresso()
        pegarHabitos()
    }, [habitos]);

    return(
        <Foot>
            <Link to = {"/habitos"} style={{ textDecoration: 'none'}}> <p>Habitos</p> </Link>
            <Link to = {"/hoje"} style={{ textDecoration: 'none', textDecorationColor: 'black'}}>
                <BarraProgresso>
                    <CircularProgressbar backgroundPadding={6} strokeWidth={9} value={progesso} text={"Hoje"} background />
                </BarraProgresso>
            </Link>
            <Link to = {"/historico"} style={{ textDecoration: 'none'}}> <p>Historico</p> </Link>
        </Foot>
    );
}

const Foot = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 70px;
    background-color: #FFFFFF;
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 0 33px;
    font-size: 18px;
    box-sizing: border-box;
    p{
        color: #52b6ff;
    }
`

const BarraProgresso = styled.div`
    width: 91px;
    height: 91px;
    margin-bottom: 60px;

    .CircularProgressbar-path{
        stroke: #FFFFFF;
    }
    .CircularProgressbar-trail{
        stroke: #52b6ff;
    }
    .CircularProgressbar-text{
        fill: #FFFFFF;
    }
    .CircularProgressbar-background{
        fill: #52b6ff;
    }
`