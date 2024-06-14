const companyProfilesLocal = [];
const topTen = [];


function getCompany(){
    fetch ("https://corsproxy.io/?https%3A%2F%2Fwww.sec.gov%2Ffiles%2Fcompany_tickers_exchange.json")
    .then(response=>response.json())
    .then(companies => {
        companies.data.forEach((company)=>{
            let companyObjects = {cik:"", name:"", tickers:"", exchange:""}; 
            companyObjects.cik = company[0];
            companyObjects.name = company[1];
            companyObjects.ticker = company[2];
            companyObjects.exchange = company[3];
            companyProfilesLocal.push(companyObjects);
        })
        console.log(companyProfilesLocal)
        pushResults();
    })
}

// async function getCompany() {
//     try {
//         const response = await fetch("https://corsproxy.io/?https%3A%2F%2Fwww.sec.gov%2Ffiles%2Fcompany_tickers_exchange.json");
//         const companyProfiles = await response.json();
//         companyProfiles.data.forEach((company)=>{
//             companyObjects.cik = company[0];
//             companyObjects.name = company[1];
//             companyObjects.ticker = company[2];
//             companyObjects.exchange = company[3];
//             companyProfilesLocal.push(companyObjects);
//         });
//         // for (let i = 0; i < 10; ++i){
//         //     topTen.push(companyProfilesLocal[i]);
            
//         //     let listElement = document.createElement("li");
//         //     listElement.id = `list-item-${i+1}`;
//         //     listElement.textContent = `${companyProfilesLocal[i][1]} - ${companyProfilesLocal[i][2]}`;
//         //     document.querySelector("#top-ten-list").append(listElement);
//         // };
//        console.log(companyObjects);
//        pushResults();
//     } catch (error) {
//         console.error(error);
//     }
// }

const main = ()=>{
    getCompany();
    
}
main()


async function pushResults() {
    //post request to our db.json
    try {
            fetch("http://localhost:3000/companies",{
            method: "POST",
            headers: {"Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(companyProfilesLocal),
            })
            //.then(postPush => postPush.json());
        } catch (error) {
            console.error(error);
        }
}


