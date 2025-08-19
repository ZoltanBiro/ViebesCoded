function submit(){
    let prompt = document.getElementById('input').value;
    console.log(prompt);
    document.getElementById('input').value = "";
    
    if(prompt.length > 2){
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", "https://zoltanb.duckdns.org/bingo/addPrompt");
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(JSON.stringify({value:prompt}));
    
    }
}

function myCard(){
    let username = document.getElementById('userInput').value;
    console.log(username);

    let xhttp = new XMLHttpRequest();

	//This is only going to get called when readyState changes
	xhttp.onreadystatechange = function() {
		//If the response is available and was successful
		if (this.readyState == 4 && this.status == 200) {
			//Take the response text (that is in JSON format), parse it into JS object
			let responseObject = JSON.parse(xhttp.responseText);
			//Extract questions from array and update our array
			questions = responseObject.results;
			//Update our page
			render();
		}
	};

	//Create the request
	xhttp.open("POST", `http://localhost:3000/bingo/toUserCard?name=${username}`, true);
	//Send the request
	xhttp.send();

}