// ==UserScript==
// @name         RemindLocation
// @namespace    http://tampermonkey.net/
// @version      0.9
// @description  Notifies the user of the current status of the Computer Location - SD field and prompts them to update it if they think it is incorrect.
// @author       Tyler Farnham
// @match        https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/Update?TicketID=*
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

window.setTimeout(main, 100);
var locationString = "";
var locationField;
function main(){
    //Prevent against trying to execute this program before the ticket has finished loading.
    try{
        locationField = document.getElementById("attribute26617-grp");
    }
    catch(e){
        window.setTimeout(main, 500);
    }
    //If it is not the correct form type then exit
    //NOTE: The form type will change when we get a walkup device form type back.
    if(!((document.body.innerHTML.includes("Device Support")))){
        return;
    }
    var mask = document.getElementById("select2-drop-mask");
    locationString = GetLocationString();
    //Ask the user if the status of the computer location in OK.
    if(confirm("The location of the computer is currently listed as\n\"" + locationString + "\"\nIs this OK?")){
        return;
    }
    //If the status of the computer location is not OK, scroll their screen to see the location field and highlight it yellow to make it obvious.
    else{
        locationField.scrollIntoView();
        //Highlight the element yellow
        locationField.style.backgroundColor = "#FDFF47";
        RunGetLocationString();
    }
}

function GetLocationString(){
    var allFormFields = document.getElementsByClassName("form-group");
    var locationText = "";
    var isFirst = true;
    //For each field in the ticket form, check to see if it is a computer location field.
    for(var i = 0; i < allFormFields.length; i++){
        try{
            //If the form is a computer location field, add the value of that computer location field to an agregated string containing the entire location of the computer.
            //This allows for the display of both fields of the computer location rather than just the first one.
            var formField = allFormFields[i];
            if(formField.textContent.includes("Computer Location - SD")){
                formField.style.backgroundColor = "#FDFF47";
                var currentText = formField.getElementsByClassName("select2-chosen")[0].innerText.trim()
                locationText += currentText;
                if(isFirst){
                    isFirst = false;
                    locationText += ": ";
                }
            }
        }
        catch(e){continue;}
    }
    if(locationText == "" || locationText.length < 4){
        locationText = "nothing";
    }
    if(CheckForLocationChange(locationText)){
        for(i = 0; i < allFormFields.length; i++){
            allFormFields[i].style.backgroundColor = "#FFFFFF";
        }
    }
    return locationText;
}

function CheckForLocationChange(locationText){
    if(locationText === locationString){
        return false;
    }
    else{
        locationField.style.backgroundColor = "#FFFFFF";
        return true;
    }
}

function RunGetLocationString(){
    GetLocationString();
    window.setTimeout(RunGetLocationString, 500);
}
