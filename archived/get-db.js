const array = [];

function getCompaniesLocal(){
    fetch("http://localhost:3000/companies")
    .then(response=>response.json())
    .then(companies =>{companies.forEach((company)=>{
        array.push(company)
    });
    console.log(array);
    });
}

getCompaniesLocal();

