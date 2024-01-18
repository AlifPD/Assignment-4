const locInput = document.getElementById("locInput");
const locBtn = document.getElementById("locBtn");
const locForm = document.getElementById("locForm");

const activeCasesTv = document.getElementById("activeCasesTv");
const newCasesTv = document.getElementById("newCasesTv");
const recoveredCasesTv = document.getElementById("recoveredCasesTv");
const totalCasesTv = document.getElementById("totalCasesTv");
const totalDeathsTv = document.getElementById("totalDeathsTv");
const totalTestsTv = document.getElementById("totalTestsTv");

// const xhr = new XMLHttpRequest();

locForm.addEventListener("submit", function(event){
    event.preventDefault();

    getLocData();

    this.reset();
})


async function getLocData(){
    let locDataResponse = await fetch('https://covid-193.p.rapidapi.com/statistics?country=indonesia', {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '850ecbb5cbmsh5829d0c239efc33p14be0cjsn555cafe0330e',
            'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
        }
    });
    
    let locDataResponseParsed = await locDataResponse.json();
    
    showData(locDataResponseParsed);
    
}

function showData(data){
    console.log(data);
    activeCasesTv.innerHTML = data.response[0].cases.active;
    newCasesTv.innerHTML = data.response[0].cases.new;
    recoveredCasesTv.innerHTML = data.response[0].cases.recovered;
    totalCasesTv.innerHTML = data.response[0].cases.total;
    totalDeathsTv.innerHTML = data.response[0].deaths.total;
    totalTestsTv.innerHTML = data.response[0].tests.total;
}

// xhr.addEventListener("readystatechange", function(){
//     if(this.readyState === this.DONE){
//         data = JSON.parse(this.response);
//         console.log(data);
//         showData();
//     }
// })

// function getLocData(){
//     xhr.open('GET', `https://covid-193.p.rapidapi.com/statistics?country=${locInput.value}`);
//     xhr.setRequestHeader('X-RapidAPI-Key', '850ecbb5cbmsh5829d0c239efc33p14be0cjsn555cafe0330e');
//     xhr.setRequestHeader('X-RapidAPI-Host', 'covid-193.p.rapidapi.com');

//     xhr.send();
// }