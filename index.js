//must run json-server for COMPANIES.DB on port 3001, and KEYWORDS.DB on port 3000. Must run both simultaneously.
let localKeywords = []; //Modified in: getKeywordList()
let localCompanies = []; //Modified in: getStocks()
let foundCompany = {}; //Modified in: getStocks(), pushKeywords()

const keywordFormElement = document.querySelector("#keywords-form");
const keywordInputElement = document.querySelector("#keyword-input");
const keywordInput = document.querySelector("#input-form");
const stockInput = document.querySelector("#ticker-form");
const applyKeywords = document.querySelector("#keywords-form");
const keywordsList = document.querySelectorAll("ul")

getKeywordList()
newKeywordSubmission()
applyKeywordsForm();

async function getKeywordList(){
    applyKeywords.innerHTML = "";
    localKeywords =[];
    const applyKeywordButton = document.createElement(`input`)
        applyKeywordButton.value = "Apply Selected Keywords to Company"
        applyKeywordButton.type = "submit";
        applyKeywords.append(applyKeywordButton);
    try {
        const getResponse = await fetch("http://localhost:3000/keywords");
        const getKeywords = await getResponse.json();
        getKeywords.forEach((keyword)=>{
            localKeywords.push(keyword);
        }); 
        createNewCheckBox()
    } catch (error) {
        console.error(error);
    }
}

function newKeywordSubmission(){
    keywordInput.addEventListener("submit", (keywordSubmission)=>{
        keywordSubmission.preventDefault();
        let keywordObj = {id:keywordInputElement.value};
        postResults(keywordObj);
        keywordInput.reset();
    });
}

async function postResults(keywordPost){
    const settings = {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(keywordPost),
    } 
    try {   
        const response = await fetch("http://localhost:3000/keywords",settings)
        const keywordResponse = await response.json()
        console.log(`Added keyword "${keywordResponse.id}" successfully!`);
        getKeywordList();
       
    } catch (error) {
        console.error(error)
    }
}

function createNewCheckBox(){
    localKeywords.forEach((localKeyword)=>{
        const newCheckBox = document.createElement("input");
        const newLabel = document.createElement("label");
        const newList = document.createElement("ul");

        newList.id = "keyword"
        newCheckBox.type = "checkbox";
        newCheckBox.value = localKeyword.id;
        newLabel.id = localKeyword.id
        newLabel.textContent = localKeyword.id
        
        newLabel.append(newCheckBox)
        newList.append(newLabel)
        document.querySelector("#keywords-form").append(newList);
    });
}

stockInput.addEventListener("submit", (submittedTicker)=>{
    submittedTicker.preventDefault();
    submittedTicker.target.value = document.querySelector("#ticker-input").value;
    getStocks(submittedTicker);
    
})

async function getStocks(submittedTicker){
    try {
        const response = await fetch("http://localhost:3001/companies");
        const conRes = await response.json();
        localCompanies = conRes
        foundCompany = localCompanies.find((company)=>
            company.ticker.toLowerCase() === submittedTicker.target.value.toLowerCase());
    
    if (foundCompany.keywords === undefined){foundCompany.keywords = []}
        console.log(foundCompany)
        // foundCompany.keywords = [foundCompany.keywords]
        stockInput.reset();
        document.querySelector("#stock-info").textContent = foundCompany.name;
        document.querySelector("#stock-keywords").textContent = foundCompany.keywords;
    } catch (error) {
        console.error(error);
    } 
}

function applyKeywordsForm(){
    applyKeywords.addEventListener("submit", (event)=>{
        event.preventDefault();
        pushKeywords()
    })
}

function pushKeywords(){
    let nodeList = document.querySelectorAll('input[type=checkbox]:checked');
    nodeList.forEach((nodeListKeyword)=> foundCompany.keywords.push(nodeListKeyword.value))
    
    


    //console.log(foundCompany);
    
        applyKeywordToDb()
        applyKeywords.reset();
}
    
async function applyKeywordToDb(){
    const settings = {
        method: "PATCH",
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(foundCompany),
    } 
    try {   
        const response = await fetch(`http://localhost:3001/companies/${foundCompany.id}`,settings)
        const keywordResponse = await response.json()
        console.log(`Added keywords to ${keywordResponse.name} DB entry successfully!`);
        document.querySelector("#stock-keywords").textContent = keywordResponse.keywords;
    } catch (error) {
        console.error(error)
    }
}

document.querySelector("#keyword-h2").addEventListener("click", (event)=>{
    alert("Please select a keyword(s)")
})