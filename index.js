let keywordObj = {
    id:""
};

let localArray = [];

//const keywordInput = document.querySelector("#keyword-input")

const keywordInput = document.querySelector("#input-form")
keywordInput.addEventListener("submit",(event)=>{
    event.preventDefault();
    event === "submit";
    keywordObj.id = document.querySelector("#keyword-input").value;
    localArray.push(keywordObj)
    console.log(keywordObj);
    listResults();
    postResults();
})

function postResults(){
    try {
        fetch("http://localhost:3000/keywords", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
                },
            body: JSON.stringify(keywordObj),
        })
        .then(response => response.json())
        } catch (error) {
            console.error(error);
        };
};

function listResults(){
    const keywordList = document.querySelector("#keywords-all");
    keywordList.textContent = localArray
}