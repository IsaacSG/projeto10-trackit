export const BaseAPI = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit";


export const autorização = (user) => {return{headers: {
    "Autorization": `Bearer ${user.token}`
}}};


export const DiasSemana = [
    { id: 0, name: 'D', selected: false },
    { id: 1, name: 'S', selected: false },
    { id: 2, name: 'T', selected: false },
    { id: 3, name: 'Q', selected: false },
    { id: 4, name: 'Q', selected: false },
    { id: 5, name: 'S', selected: false },
    { id: 6, name: 'S', selected: false },
];