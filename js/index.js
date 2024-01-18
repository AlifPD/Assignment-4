const locInput = document.getElementById("locInput");
const locBtn = document.getElementById("locBtn");
const locForm = document.getElementById("locForm");

const activeCasesTv = document.getElementById("activeCasesTv");
const newCasesTv = document.getElementById("newCasesTv");
const recoveredCasesTv = document.getElementById("recoveredCasesTv");
const totalCasesTv = document.getElementById("totalCasesTv");
const totalDeathsTv = document.getElementById("totalDeathsTv");
const totalTestsTv = document.getElementById("totalTestsTv");

const alertPlaceholder = document.getElementById("alertPlaceholder")

const showAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible mt-3" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('')
  
    alertPlaceholder.append(wrapper)
  }

// const xhr = new XMLHttpRequest();

locForm.addEventListener("submit", function(event){
    event.preventDefault();

    locBtn.innerHTML = `<span id="loadingIcon" class="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>Fetching Data`;
    getLocData(locInput.value).then(function(value){
        if(value == "Input Error"){
            console.log(value);
            showAlert("Error: Input cannot be empty", "danger");
        }else if(value == "No Country Error"){
            console.log(value);
            showAlert("Error: Input is not a country or don't exist in the API countries list", "danger");
        }else{
            console.log(value);
            showAlert("Success: Data successfuly fetched", "info")
        }
        
        showData(value);
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
        if(locDataResponseParsed.response.length == 0){
            throw("No Country Error");
        }

        return locDataResponseParsed;
    }catch(error){
        return error;
    }    
}

function showData(data){
    if(data == "Input Error" || data == "No Country Error"){
        activeCasesTv.innerHTML = "No Data";
        newCasesTv.innerHTML = "No Data";
        recoveredCasesTv.innerHTML = "No Data";
        totalCasesTv.innerHTML = "No Data";
        totalDeathsTv.innerHTML = "No Data";
        totalTestsTv.innerHTML = "No Data"; 
    }else{
        activeCasesTv.innerHTML = data.response[0].cases.active ?? "No Data";
        newCasesTv.innerHTML = data.response[0].cases.new  ?? "No Data";
        recoveredCasesTv.innerHTML = data.response[0].cases.recovered  ?? "No Data";
        totalCasesTv.innerHTML = data.response[0].cases.total ?? "No Data";
        totalDeathsTv.innerHTML = data.response[0].deaths.total ?? "No Data";
        totalTestsTv.innerHTML = data.response[0].tests.total ?? "No Data";
    }
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