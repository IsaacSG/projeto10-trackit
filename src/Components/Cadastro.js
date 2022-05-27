import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import Logo from "../Styles/Image/Trackit.png";
import { Link } from "react-router-dom";
import { BaseAPI } from "../Dados Globais/Dados";


export default function Cadastro (){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");

    function Cadastrar (){
        
        const corpo = {email,password,name,image}
        const enviar = axios.post(`${BaseAPI}/auth/sign-up`, corpo);
        enviar.then(console.log(corpo));
    }

    return(
        <Menu>
            <img src = {Logo} />
            <input type = "text" placeholder = "Email" value = {email} onChange = {e => setEmail(e.target.value)}/>
            <input type = "text" placeholder = "Senha" value = {password} onChange = {e => setPassword(e.target.value)}/>
            <input type = "text" placeholder = "Nome" value = {name} onChange = {e => setName(e.target.value)}/>
            <input type = "url" placeholder = "Foto" value = {image} onChange = {e => setImage(e.target.value)}/>
            <button onClick = {Cadastrar} > <p>Cadastrar</p> </button>
            <Link to = "/">Já tem uma conta? Faça login!</Link>
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