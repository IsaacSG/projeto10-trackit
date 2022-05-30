import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";

export default function Historico (){
    return(
        <>
            <Header />
            <HistoricoMenu>
                <h1>Histórico</h1>
                <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
            </HistoricoMenu>
            <Footer />
        </>
    );
}

const HistoricoMenu = styled.div`
    margin-left: 17px;
    margin-top: 98px;
    h1 {
        font-size: 23px;
        color: #126BA5;
        margin-bottom: 17px;
    }
    p {
        font-size: 18px;
        color: #666666;
    }
`