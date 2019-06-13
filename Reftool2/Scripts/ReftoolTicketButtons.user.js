// ==UserScript==
// @name         ReftoolTicketButtons
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  Adds a button to create a new phone@log ticket with the appropriate generic fields filled out
// @author       Tyler Farnham / Luke Miletta
// @match        https://tools.is.oregonstate.edu/reftool2/*
// @match        https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/New?formId=17681&RequestorUID=de751dc3-eeb7-e611-80cd-000d3a13db68&/phonelog
// @grant        none
// ==/UserScript==

var URL = window.location.href;
if(URL.indexOf("tools.is.oregonstate.edu/reftool2/") >=0){
    window.setTimeout(put_button, 100);
}
else if(URL.indexOf("phonelog") >=0){
    console.log("initial load");
    window.setTimeout(fill_form_generic, 100);
}

function fill_form_generic(){
    try{
        var status = document.getElementById("attribute1306");
    }
    catch(err){
        window.setTimeout(fill_form_generic, 50);
        return;
    }
    status = status.children;
    console.log(status);
    for(var i=0; i < status.length; i++){
        if(status[i].innerHTML == "Closed"){
            console.log(status[i]);
            status[i].setAttribute("selected", "selected")
        }
        else{
            status[i].removeAttribute("selected");
        }
    }
    uncheckNotify();
}

function put_button(){
    try{
        var search = document.getElementById("search");
    }
    catch(err){
        window.setTimeout(put_button, 50);
        return;
    }
    // 1. Create the button
    var buttonDiv = document.createElement("div");
    buttonDiv.setAttribute('align', 'right');
    var button1 = document.createElement("form-button");
    button1.setAttribute("type", "button");
    button1.setAttribute('align', 'center');
    button1.innerHTML = "Phone@Log Generic";
    button1.setAttribute("class", "btn btn-default");
    button1.setAttribute("id", "phonelog-button");
    buttonDiv.appendChild(button1);

    // 2. Append somewhere
    search.appendChild(buttonDiv);

    // 3. Add event handler
    button1.addEventListener("click", click_phonelog_button);

    // Function that handles click of form button
    function click_phonelog_button(){
        var url = "https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/New?formId=17681&RequestorUID=de751dc3-eeb7-e611-80cd-000d3a13db68&/phonelog";
        window.open(url, '_blank');

    }

}

function uncheckNotify(){
    var checks = document.getElementsByClassName("checkbox");
    for(var i = 0; i < checks.length; i++){
        if((checks[i].children)[0].innerText == "Notify Requestor"){
            (((checks[i].children)[0]).children)[0].click();
        }
    }
}
