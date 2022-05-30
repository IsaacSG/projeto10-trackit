import {useContext, useEffect, useState} from "react";
import axios from "axios";
import userContext from "../Contexto/UserContext";
import {ThreeDots} from "react-loader-spinner";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";
import { BaseAPI, DiasSemana } from "../Dados Globais/Dados";

function DayCard({ name, daysNumbers, setDaysNumbers, index, loading, days, setDays, isSelected }) {
    const [selected, setSelected] = useState(isSelected)

    function chooseDay(index) {
        setSelected(!selected)
        for(let i = 0; i < daysNumbers.length; i++) {
            if(daysNumbers[i] === index + 1) {
                daysNumbers.splice(i, 1)
                days[index].selected = false
                setDays([...days])
                return setDaysNumbers([...daysNumbers])
            }
        }
        days[index].selected = true
        setDays([...days])
        setDaysNumbers([...daysNumbers, index + 1])
    }

    return (
        <Dia disabled={loading} onClick={() => chooseDay(index)} selected={selected}>{name}</Dia>
    )
}

export default function Habits() {
    const [habits, setHabits] = useState([])
    const [days, setDays] = useState(DiasSemana)
    const [name, setName] = useState('')
    const [creating, setCreating] = useState(false)
    const [daysNumbers, setDaysNumbers] = useState([])
    const { user } = useContext(userContext)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getHabits()
    }, [habits])

    function getHabits() {
        const config = {
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        }

        const promise = axios.get(`${BaseAPI}/habits`, config)
        promise.then(res => setHabits(res.data))
    }

    function createHabit() {
        setLoading(true)
        const habit = {name, days: daysNumbers.sort((a, b) => a - b)}
        const config = {
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        }

        const promise = axios.post(`${BaseAPI}/habits`, habit, config)
        promise.then(() => {
            setLoading(false)
            setCreating(false)
            setDays([...days.map(day => ({ name: day.name, selected: day.selected = false }))])
            setDaysNumbers([])
            setName('')
        })
        promise.catch(res => {
            alert(`Oops! algo deu errado...${res.response.data}`)
            setLoading(false)
        })
    }

    function deleteHabit(id) {
        const config = { 
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }

        if(window.confirm('Deseja deletar este habito ?')) {
            axios.delete(`${BaseAPI}/habits/${id}`, config)
        }
    }

    return (
        <>
        <Header />
        <HabitoMenu>
            <MHabitos>
                <h1>Meus hábitos</h1>
                <button onClick={() => setCreating(true)}><span>+</span></button>
            </MHabitos>
            {creating ? (
                <CardHabito disable={loading}>
                    <input type="text" value={name} placeholder="nome do habito" disabled={loading} 
                        onChange={(e) => setName(e.target.value)} />
                    <div>
                        {days.map((day, i) => <DayCard key={i} name={day.name} daysNumbers={daysNumbers} days={days} isSelected={day.selected} setDays={setDays} setDaysNumbers={setDaysNumbers} index={i} loading={loading} />)}
                    </div>
                    <Botoes>
                        <button onClick={() => setCreating(false)} disabled={loading}>Cancelar</button>
                        <button onClick={createHabit} disabled={loading}>
                            {loading ? <ThreeDots color="#FFF" height={50} width={50} /> : 'Salvar'}
                        </button>
                    </Botoes>
                </CardHabito>
            ) : ''}
            {habits.length === 0 ? <Informar>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</Informar> : (
                habits.map(habit => {
                    let counter = 0
                    return (
                        <HabitoUsuario key={habit.id}>
                            <div>
                                <h1>{habit.name}</h1>
                                <div>
                                    {DiasSemana.map((day, i) => {
                                        let selected = false
                                        if(habit.days[counter] === day.id) {
                                            selected = true
                                            counter++
                                        } 
                                        return (
                                            <Dia key={day.id} selected={selected} readOnly>{day.name}</Dia>
                                        )
                                    })}
                                </div>
                            </div>
                            <div onClick={() => deleteHabit(habit.id)}>
                                <ion-icon name="trash-outline"></ion-icon>
                            </div>
                        </HabitoUsuario>
                    )
                })
            )}
        </HabitoMenu>
        <Footer />
        </>
    )
}


const HabitoMenu = styled.div`
    margin-bottom: 150px;
`
const MHabitos = styled.div`
    display: flex;
    align-items: center;
    margin-left: 17px;
    margin-top: 92px;
    margin-bottom: 20px;
    p{
        margin-right: 152px;
        color: #126BA5;
        font-size: 23px;
    }
    button{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 35px;
        background-color: #52B6FF;
        border-radius: 5px;
        outline: none;
        border: none;
        color: #fff;
        font-size: 27px;
        cursor: pointer;
    }
    button:hover{
        filter: brightness(0.90);
    }
    span{
        height: 100%;
        margin-top: -7px;
    }
`
const Dia = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    background-color: ${({ selected }) => selected ? '#cfcfcf' : '#fff'};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-size: 20px;
    color: ${({ selected }) => selected ? '#fff' : '#dbdbdb'};
    margin-right: 4px;
    ${({ readOnly }) => !readOnly ? (`
        cursor: pointer;
        &:hover {
            filter: brightness(0.9);
        }
    `
    ) : ''}
`
const CardHabito = styled.div`
    display: flex;
    flex-direction: column;
    width: 340px;
    height: 180px;
    background-color: #FFFFFF;
    border-radius: 5px;
    padding: 18px;
    margin-left: 17px;
    margin-bottom: 10px;
    box-sizing: border-box;
    div {
        display: flex;
    }
    input {
        box-sizing: border-box;
        width: 100%;
        height: 45px;
        background-color: ${({ disable }) => disable ? '#D4D4D4' : '#fff'};
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        padding-left: 11px;
        margin-bottom: 8px;
        font-size: 20px;
        color: ${({ disable }) => disable ? '#B3B3B3' : '#666666'};
        outline: none;
    }
    input::placeholder {
        color: #DBDBDB;
    }
`
const Botoes = styled.div `
    margin-top: 30px;
    align-self: flex-end;
    button {
        outline: none;
        border: none;
        width: 84px;
        height: 35px;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
    }
    button:first-child {
        color: #52B6FF;
        background-color: transparent;
        margin-right: 15px;
    }
    button:last-child {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        background-color: #52B6FF;
    }
    button:hover {
        filter: brightness(0.9);
    }
`
const Informar = styled.div`
    color: #666666;
    font-size: 18px;
    margin-left: 17px;
    margin-top: 30px;
    width: 340px;
`
const HabitoUsuario = styled.div`
    display: flex;
    justify-content: space-between;
    width: 340px;
    min-height: 91px;
    margin-left: 17px;
    background-color: #fff;
    margin-bottom: 10px;
    box-sizing: border-box;
    padding: 15px;
    p {
        color: #666666;
        font-size: 20px;
        margin-bottom: 8px;
    }
    div > div {
        display: flex;
    }
    div:last-child {
        color: #666666;
    }
    ion-icon {
        font-size: 18px;
        transition: all 200ms ease-in-out;
        cursor: pointer;
    }
    ion-icon:hover {
        transform: scale(1.4);
    }
`
