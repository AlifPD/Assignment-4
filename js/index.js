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

    locBtn.innerHTML = `<span id="loadingIcon" class="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>Fetching Data`;
    getLocData(locInput.value).then(function(value){
        if(value == "Input Error"){
            console.log(value);
        }else{
            console.log(value);
            showData(value);
        }
        locBtn.innerHTML = "Get Data";
    });

    this.reset();
})


async function getLocData(location){
    try{
        if(location.length == 0) {
            throw("Input Error");
        }

        let locDataResponse = await fetch(`https://covid-193.p.rapidapi.com/statistics?country=${location}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '850ecbb5cbmsh5829d0c239efc33p14be0cjsn555cafe0330e',
                'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
            }
        });

        let locDataResponseParsed = await locDataResponse.json();
        return locDataResponseParsed;
    }catch(error){
        return error;
    }    
}

function showData(data){
    activeCasesTv.innerHTML = data.response[0].cases.active ?? "No Data";
    newCasesTv.innerHTML = data.response[0].cases.new  ?? "No Data";
    recoveredCasesTv.innerHTML = data.response[0].cases.recovered  ?? "No Data";
    totalCasesTv.innerHTML = data.response[0].cases.total ?? "No Data";
    totalDeathsTv.innerHTML = data.response[0].deaths.total ?? "No Data";
    totalTestsTv.innerHTML = data.response[0].tests.total ?? "No Data";
}

// xhr.addEventListener("readystatechange", function(){
//     if(this.readyState === this.DONE){
//         let data = JSON.parse(this.response);
//         showData(data);
//     }
// })

// function getLocData(){
//     xhr.open('GET', `https://covid-193.p.rapidapi.com/statistics?country=${locInput.value}`);
//     xhr.setRequestHeader('X-RapidAPI-Key', '850ecbb5cbmsh5829d0c239efc33p14be0cjsn555cafe0330e');
//     xhr.setRequestHeader('X-RapidAPI-Host', 'covid-193.p.rapidapi.com');

//     xhr.send();
// }