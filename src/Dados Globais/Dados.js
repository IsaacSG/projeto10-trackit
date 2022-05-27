export const BaseAPI = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit";


export const autorização = (user) => {return{headers: {
    "Autorization": `Bearer ${user.token}`
}}};


export const DiasSemana = [
    {id: 0, nome: "D", selecionado: false},
    {id: 1, nome: "S", selecionado: false},
    {id: 2, nome: "T", selecionado: false},
    {id: 3, nome: "Q", selecionado: false},
    {id: 4, nome: "Q", selecionado: false},
    {id: 5, nome: "S", selecionado: false},
    {id: 6, nome: "S", selecionado: false}
];