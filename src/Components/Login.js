import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useState } from "react";
import { createContext } from 'react';
import Logo from "../Styles/Image/Trackit.png";

export default function Login (){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [body, setBody] = useState([]);

    function Logar(){
        const corpo = {email, password};
        const promisse = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", corpo);
        promisse.then(resposta => {setBody(resposta.data)});
    }

    return(
        <Menu>
            <img src = {Logo} />
            <input type = "text" placeholder = "Email" value = {email} onChange = {e => setEmail(e.target.value)}/>
            <input type = "text" placeholder = "Senha" value = {password} onChange = {e => setPassword(e.target.value)}/>
            <button onClick = {Logar} > <p>Entrar</p> </button>
            <Link to = {"/cadastro"}>Não tem uma conta?Cadastre-se!</Link>
        </Menu>
    );
}

const Menu = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img{
        width: 180px;
        margin-bottom: 32px;
        margin-top: 62px;
    }
    input{
        width: 303px;
        height: 45px;
        border-radius: 5px;
        margin-bottom: 6px;
    }
    button{
        background-color: #52B6FF;
        width: 303px;
        height: 45px;
        margin-bottom: 25px;
        border-radius: 5px;
    }
    p{
        font-size: 21px;
        color: #FFFFFF;
    }
`