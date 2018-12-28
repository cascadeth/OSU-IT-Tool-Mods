// ==UserScript==
// @name         Phone@log Button on Reftool
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Adds a button to create a new phone@log ticket with the appropriate fields filled out
// @author       Tyler Farnham / Luke Miletta
// @match        https://tools.is.oregonstate.edu/reftool2/*
// @match        https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/New?formId=17631&RequestorUID=de751dc3-eeb7-e611-80cd-000d3a13db68&/phonelog
// @match        https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/New?formId=17631&RequestorUID=de751dc3-eeb7-e611-80cd-000d3a13db68&/transcripts
// @match        https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/New?formId=17631&RequestorUID=*&/Duo/*
// @grant        none
// ==/UserScript==

var URL = window.location.href;
if(URL.indexOf("tools.is.oregonstate.edu/reftool2/") >=0){
    window.setTimeout(put_button, 100);
}
else if(URL.indexOf("&/phonelog") >=0){
    window.setTimeout(fill_form_generic, 100);
}
else if(URL.indexOf("&/transcripts") >=0){
    window.setTimeout(fill_form_transcripts, 100);
}
else if(URL.indexOf("&/Duo") >=0){
    window.setTimeout(fill_form_Duo, 100);
}

function fill_form_transcripts(){
    try{
        var status = document.getElementById("attribute1306");
    }
    catch(err){
        window.setTimeout(fill_form_transcripts, 50);
        return;
    }
    status = status.children;
    for(var i=0; i<status.length;i++){
        if(status[i].innerText = "Open" && status[i].getAttribute("value") == "17739"){
            status[i].innerText = "Referred";
            status[i].setAttribute("value", "18214");
            break;
        }
    }
    uncheckNotify();
    var by = document.getElementById("attribute3955");
    console.log(URL.split("/")[8]);
    by = by.children;
    by[0].setAttribute("value", "793");
    by[0].innerText = "Phone";
    var title = document.getElementById("attribute1303");
    title.value = "Transcripts Request";
    var body = document.getElementById("attribute2937");
    body.innerText = "Someone called asking about transcripts. They are a previous student and forgot their ID number. We referred them to the Office of the Registrar.";
}

function fill_form_Duo(){
    console.log("Executing the duo function!");
    try{
        var status = document.getElementById("attribute1306");
    }
    catch(err){
        window.setTimeout(fill_form_transcripts, 50);
        return;
    }
    uncheckNotify();
    var customerUserName = URL.split("/")[9].split("@")[0];
    var customerUPN = URL.split("/")[9];
    status = status.children;
    for(var i=0; i<status.length;i++){
        if(status[i].innerText = "Open" && status[i].getAttribute("value") == "17739"){
            status[i].innerText = "Closed";
            status[i].setAttribute("value", "17742");
            break;
        }
    }
    var by = document.getElementById("attribute3955");
    console.log(by);
    by = by.children;
    by[0].setAttribute("value", "793");
    by[0].innerText = "Phone";
    var title = document.getElementById("attribute1303");
    title.value = "Transcripts Request";
    var body = document.getElementById("attribute2937");
    body.innerText = customerUserName + " called in to get Duo reactivated on their phone.";
    var techNotes = document.getElementById("attribute53162");
    techNotes.innerText = "We had them navigate to the Duo self service page to reactivate their own phone. They were able to reactivate it.\n\nAll is well.";
}

function fill_form_generic(){
    try{
        var status = document.getElementById("attribute1306");
    }
    catch(err){
        window.setTimeout(fill_form_transcripts, 50);
        return;
    }
    status = status.children;
    for(var i=0; i<status.length;i++){
        if(status[i].innerText = "Open" && status[i].getAttribute("value") == "17739"){
            status[i].innerText = "Closed";
            status[i].setAttribute("value", "17742");
            break;
        }
    }
    uncheckNotify();
    var by = document.getElementById("attribute3955");
    by = by.children;
    by[0].setAttribute("value", "793");
    by[0].innerText = "Phone";
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
    var button1 = document.createElement("form-button");
    button1.setAttribute("type", "button");
    button1.innerHTML = "Phone@Log Generic";
    button1.setAttribute("class", "btn btn-default");
    button1.setAttribute("id", "phonelog-button");

    // 2. Append somewhere
    search.appendChild(button1);

    // 3. Add event handler
    button1.addEventListener("click", click_phonelog_button);

    // Function that handles click of form button
    function click_phonelog_button(){
        var url = "https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/New?formId=17631&RequestorUID=de751dc3-eeb7-e611-80cd-000d3a13db68&/phonelog";
        window.open(url, '_blank');
    }

    // 1. Create the button
    var button2 = document.createElement("form-button");
    button2.setAttribute("type", "button");
    button2.innerHTML = "Phone@Log Transcripts";
    button2.setAttribute("class", "btn btn-default");
    button2.setAttribute("id", "phonelog-button");

    // 2. Append somewhere
    search.appendChild(button2);

    // 3. Add event handler
    button2.addEventListener("click", click_transcripts_button);

    // Function that handles click of form button
    function click_transcripts_button(){
        var url = "https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/New?formId=17631&RequestorUID=de751dc3-eeb7-e611-80cd-000d3a13db68&/transcripts";
        window.open(url, '_blank');
    }

    // 1. Create the button
    var button3 = document.createElement("form-button");
    button3.setAttribute("type", "button");
    button3.innerHTML = "Duo Reactivation";
    button3.setAttribute("class", "btn btn-default");
    button3.setAttribute("id", "duo-button");

    // 2. Append somewhere
    search.appendChild(button3);

    // 3. Add event handler
    button3.addEventListener("click", click_duo_button);

    // Function that handles click of form button
    function click_duo_button(){
        var elementHelper = document.getElementById("customer-details");
        console.log(elementHelper.childNodes[3].childNodes[4].childNodes[3].innerHTML.split(">")[1].split("<")[0]);
        //console.log(elementHelper.childNodes[3].childNodes[5].childNodes[3].innerHTML.split(">")[1].split("<")[0]);
        try{
            var firstName = elementHelper.childNodes[3].childNodes[4].childNodes[3].innerHTML.split(">")[1].split("<")[0];
        }
        catch(err){
            alert("Look up the customer in reftool first!");
            return;
        }
        try{
            var UID = document.getElementsByClassName("pull-right")[2].toString().split("U=")[1];
        }
        catch(err){
            alert("User does not have a TDx profile!");
            return;
        }
        console.log(UID);
        var url = "https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/New?formId=17631&RequestorUID=" + UID + "&/Duo/" + firstName;
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
