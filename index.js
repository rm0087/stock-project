//must run json-server for COMPANIES.DB on port 3001, and KEYWORDS.DB on port 3000. Must run both simultaneously.

getKeywordList()

async function getKeywordList(){
    try {
        const response = await fetch("http://localhost:3000/keywords");
        const keywords = await response.json();
        keywords.forEach((keyword)=>{
            // getStocks();
            createNewCheckBox(keyword)});
    } catch (error) {
        console.error(error);
    }
}

const keywordInput = document.querySelector("#input-form")
keywordInput.addEventListener("submit", handleSubmit)

function handleSubmit(event){
    event.preventDefault();
    let keywordObj = {id:""};
    inputKeyword(keywordObj);
    keywordInput.reset();
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
        updateList(keywordResponse)
       
    } catch (error) {
        console.error(error)
    }
}

function inputKeyword(keywordInput){
    keywordInput.id = document.querySelector("#keyword-input").value;
    postResults(keywordInput);
    
}

function updateList(updatedKeyword){
    createNewCheckBox(updatedKeyword);
}

function createNewCheckBox(checkboxKeyword){
    const newCheckBox = document.createElement("input");
    const newLabel = document.createElement("label");
    const newList = document.createElement("ul");
    
    newCheckBox.type = "checkbox";
    newCheckBox.value = checkboxKeyword.id;
    
    newLabel.append(newCheckBox)
    newList.append(newLabel)
    newLabel.append(checkboxKeyword.id)
    document.querySelector("#keywords-form").append(newList);
}

const modeInput = document.querySelector("#mode-input");
modeInput.addEventListener("input", (event)=>{
    const tickerInput = document.querySelector("#ticker-input");
    const keywordInput = document.querySelector("#keyword-input");
    if (modeInput.value === "stocks-option"){
        keywordInput.disabled = true; tickerInput.disabled = false;
    } else {tickerInput.disabled = true; keywordInput.disabled = false}
    console.log(modeInput.value)
})

const stockInput = document.querySelector("#ticker-form")
stockInput.addEventListener("submit", (event)=>{
    event.preventDefault();
    event.target.value = document.querySelector("#ticker-input").value;
    getStocks(event);
})

document.querySelector("#keyword-h2").addEventListener("click", (event)=>{
    alert("Please select a keyword(s)")
})

async function getStocks(event){
    try {
        const response = await fetch("http://localhost:3001/companies");
        const companies = await response.json();
    
        selectedCompany = companies.find((company)=> company.ticker.toLowerCase() === event.target.value.toLowerCase());
        document.querySelector("#stock-info").textContent = selectedCompany.name;
        document.querySelector("#stock-keywords").textContent = selectedCompany.keywords;
        
        stockInput.reset();
    } catch (error) {
        console.error(error);
    } 
}

let selectedCompany={};

const applyKeywords = document.querySelector("#keywords-form")
applyKeywords.addEventListener("submit", (event)=>{
    event.preventDefault();
    pushKeywords()
})
    
function pushKeywords(){
    selectedCompany.keywords = [];
    let nodeList = document.querySelectorAll('input[type=checkbox]:checked');
    for (let i=0;i<nodeList.length;i++){
        let item = nodeList[i];
        if (selectedCompany.ticker != undefined){selectedCompany.id=parseInt(selectedCompany.id);
            selectedCompany.keywords.push(item.value)
        }else{}
    } applyKeywordToDb()
    applyKeywords.reset();
}

async function applyKeywordToDb(){
    console.log(selectedCompany);
    const settings = {
        method: "PATCH",
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(selectedCompany),
    } 
    try {   
        const response = await fetch(`http://localhost:3001/companies/${selectedCompany.id}`,settings)
        const keywordResponse = await response.json()
        console.log(`Added keywords to ${keywordResponse.name} DB entry successfully!`);
        document.querySelector("#stock-keywords").textContent = keywordResponse.keywords;
    } catch (error) {
        console.error(error)
    }
}












// function getKeywordListSynchronous(){
//     fetch ("http://localhost:3000/keywords")
//     .then((response)=>{return response.json();})
//     .then(keywords =>{
//         keywords.forEach((keyword)=>{
//             createNewCheckBox(keyword);
//         })
//     })
// }