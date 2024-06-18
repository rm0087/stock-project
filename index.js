getKeywordList()

async function getKeywordList(){
    try {
        const response = await fetch("http://localhost:3000/keywords");
        const keywords = await response.json();
        keywords.forEach((keyword)=>{
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
    console.log(event.target.value)
})

document.querySelector("#keyword-h2").addEventListener("click", (event)=>{
    alert("Please select a keyword(s)")
})














// function getKeywordListSynchronous(){
//     fetch ("http://localhost:3000/keywords")
//     .then((response)=>{return response.json();})
//     .then(keywords =>{
//         keywords.forEach((keyword)=>{
//             createNewCheckBox(keyword);
//         })
//     })
// }