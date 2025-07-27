function submit(){
    let prompt = document.getElementById('input').value;
    console.log(prompt);
    document.getElementById('input').value = "";
    
    if(prompt.length > 2){
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://localhost:3000/bingo/addPrompt"); //fix me
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(JSON.stringify({value:prompt}));
    } 

}