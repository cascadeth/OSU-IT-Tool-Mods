// ==UserScript==
// @name         RemindLocation
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Notifies the user of the current status of the Computer Location - SD field and prompts them to update it if they think it is incorrect.
// @author       Tyler Farnham
// @match        https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/Update?TicketID=*
// ==/UserScript==

var executeAttempts = 0;
window.setTimeout(main, 100);

function main(){
    //Prevent against trying to execute this program before the ticket has finished loading.
    try{
        var locationField = document.getElementById("attribute26617");
    }
    catch(e){
        executeAttempts++;
        //Stop trying if has not loaded after ~1 second.
        if(executeAttempts < 5){
            window.setTimeout(main, 200);
        }
        else{
            return;
        }
    }
    //If it is not the correct form type then exit
    //NOTE: The form type will change when we get a walkup device form type back.
    if(!((document.body.innerHTML.includes("Device or Application Support")) && !(document.body.innerHTML.includes("CN Device or Application Support")))){
        return;
    }
    var allFormFields = document.getElementsByClassName("form-group");
    var locationText = "";
    var isFirst = true;
    //For each field in the ticket form, check to see if it is a computer location field.
    for(var i = 0; i < allFormFields.length; i++){
        try{
            //If the form is a computer location field, add the value of that computer location field to an agregated string containing the entire location of the computer.
            //This allows for the display of both fields of the computer location rather than just the first one.
            if(allFormFields[i].getElementsByClassName("control-label")[0].textContent.includes("Computer Location - SD")){
                var currentLocation = allFormFields[i].getElementsByClassName("js-ca")[0].getElementsByClassName("form-control")[0];
                locationText += currentLocation.options[currentLocation.selectedIndex].text;
                if(isFirst){
                    isFirst = false;
                    locationText += ": ";
                }
            }
        }
        catch(e){continue;}
    };
    if(locationText == "" || locationText.length < 4){
        locationText = "nothing";
    }
    //Ask the user if the status of the computer location in OK.
    if(confirm("The location of the computer is currently listed as\n\"" + locationText + "\"\nIs this OK?")){
        return;
    }
    //If the status of the computer location is not OK, scroll their screen to see the location field and highlight it yellow to make it obvious.
    else{
        locationField.scrollIntoView();
        locationField.style.backgroundColor = "#FDFF47";
        //Remove the highlight when they click on the element.
        locationField.onclick = function(e){
            locationField.style.backgroundColor = "#FFFFFF";
        }
    }
}
