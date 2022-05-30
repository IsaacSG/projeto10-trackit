import styled from "styled-components";
import axios from "axios";
import Footer from "./Footer";
import Header from "./Header";
import dayjs from "dayjs";
import { BaseAPI } from "../Dados Globais/Dados";
import userContext from "../Contexto/UserContext";
import ProgressoContext from "../Contexto/ProgressoContext";
import { useContext, useEffect, useState } from "react";
import Ok from "../Styles/Image/Ok.png"

function Track({ habit, sequence, record, done, markHabit }) {
    return (
        <MarcarCard done={done} equals={sequence === record}>
            <div>
                <h2>{habit}</h2>
                <p>Sequência atual: <span>{sequence} dias</span></p>
                <p>Seu recorde: <span className="record">{record} dias</span></p>
            </div>
            <div onClick={markHabit}>
                <img src={Ok} alt="Ok" />
            </div>
        </MarcarCard>
    )
}

export default function TodayTracks() {
    const [todayHabits, setTodayHabits] = useState([])
    const { user } = useContext(userContext)
    const weekDayNames = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta"]
    const { progresso, setProgresso } = useContext(ProgressoContext)
    const autorização = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    }

    useEffect(() => {
        getTodayHabits()
        getProgress()
    }, [todayHabits])

    function getTodayHabits() {
        const promise = axios.get(`${BaseAPI}/habits/today`, autorização)
        promise.then(res => setTodayHabits(res.data))
    }

    function formatDate() {
        const weekDay = weekDayNames.find((_, i) => i === dayjs().day())
        const day = dayjs().date()
        let month = dayjs().month()
        month < 10 ? month = `0${month + 1}` : month = month + 1
        return `${weekDay}, ${day}/${month}`
    }

    function unCheckOrCheckHabit(id, done) {
        const isDone = done ? 'uncheck' : 'check'
        const promise = axios.post(`${BaseAPI}/habits/${id}/${isDone}`, {}, autorização)
        promise.catch(res => console.log(res.response.data))
    }

    function getProgress() {
        let counter = 0
        for(let i = 0; i < todayHabits.length; i++) {
            if(todayHabits[i].done === true) counter++
        }
        counter = Math.round(counter * 100 / todayHabits.length)
        setProgresso(counter)
    }

    return (
        <>
        <Header />
        <HojeMenu>
            <h1>{formatDate()}</h1>
            {progresso === 0 || todayHabits.length === 0 ? <h3>Nenhum hábito concluído ainda</h3> : <h3 className="progress">{progresso}% dos hábitos concluidos </h3>}
            {todayHabits.length === 0 ? <p>Nenhum habito para este dia...</p> : (
                <div>
                    {todayHabits.map(today => 
                        <Track key={today.id} habit={today.name} sequence={today.currentSequence} record={today.highestSequence} done={today.done} 
                            markHabit={() => unCheckOrCheckHabit(today.id, today.done)} />)}
                </div>
            )}
        </HojeMenu>
        <Footer />
        </>
    )
}

const HojeMenu = styled.div`
    margin-top: 98px;
    margin-left: 17px;
    margin-bottom: 150px;
    h1{
        color: #126BA5;
        font-size: 23px;
    }
    h3{
        font-size: 18px;
        color: #BABABA;
        margin-bottom: 28px;
        margin-top: 5px;
    }
    .progresso{
        color: #8FC549;
    }
`

const MarcarCard = styled.div`
    display: flex;
    justify-content: space-between;
    width: 340px;
    height: 94px;   
    background-color: #FFFFFF;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 15px;
    color: #666666;
    margin-bottom: 10px;
    h2 {
        font-size: 20px;
        margin-bottom: 8px;
    }
    p {
        font-size: 13px;
    }
    div:last-child {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 69px;
        height: 69px;
        background-color: ${({ done }) => done ? '#8FC549' : '#E7E7E7'};
        border-radius: 5px;
        cursor: pointer;
    }
    span {
        color: ${({ done }) => done ? '#8FC549' : 'currentColor'};
    }
    .recorde{
        color: ${({ done, equals }) => done && equals ? '#8FC549' : 'currentColor'}
    }
`