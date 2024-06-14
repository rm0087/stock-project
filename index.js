const companyProfilesLocal = [];
const topTen = [];

async function getCompany() {
    try {
        const response = await fetch("https://corsproxy.io/?https%3A%2F%2Fwww.sec.gov%2Ffiles%2Fcompany_tickers_exchange.json");
        const companyProfiles = await response.json();
        companyProfiles.data.forEach((company)=>{
            companyProfilesLocal.push(company);
        });
        for (let i = 0; i < 10; ++i){
            topTen.push(companyProfilesLocal[i]);
            
            let listElement = document.createElement("li");
            listElement.id = `list-item-${i+1}`;
            listElement.textContent = `${companyProfilesLocal[i][1]} - ${companyProfilesLocal[i][2]}`;
            document.querySelector("#top-ten-list").append(listElement)
        }
    } catch (error) {
        console.error(error);
    }
}

const main = ()=>{
    getCompany();
}
main()

console.log(topTen);

