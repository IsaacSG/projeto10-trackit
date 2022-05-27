import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Cadastro from "./Cadastro";
import Habitos from "./Habitos";
import Hoje from "./Hoje";
import Historico from "./Historico";
import { ProgressoProv } from "../Contexto/ProgressoContext";
import { UserProv } from "../Contexto/UserContext";


export default function App (){
    return(

        <ProgressoProv>
            <UserProv>
                <BrowserRouter>
                    <Routes>
                        <Route path = "/" element = {<Login />} />
                        <Route path = "/cadastro" element = {<Cadastro />} />
                        <Route path = "/habitos" element = {<Habitos />} />
                        <Route path = "/hoje" element = {<Hoje />} />
                        <Route path = "/historico" element = {<Historico />} />
                    </Routes>
                </BrowserRouter>
            </UserProv>
        </ProgressoProv>
    );
}