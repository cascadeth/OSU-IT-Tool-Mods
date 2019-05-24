// ==UserScript==
// @name         Reftool Button on Ticket Page
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Adds a Reftool button next to a person's name in TD. Allows you to copy the name of the requester by clicking on their profile picture.
// @author       Luke Miletta / Tyler Farnham
// @match        https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/TicketDet.aspx?TicketID=*
// @match        https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/TicketDet?TicketID=*
// @grant        none
// ==/UserScript==

var header = document.getElementById("divTabHeader");
var name = document.getElementsByClassName("media-heading")[0].innerText.trim();

var firstName = name.split(' ').slice(0, -1).join(' ');
var lastName = name.split(' ').slice(-1).join(' ');

// 1. Create the button
var reftoolButton = document.createElement("form-button");
reftoolButton.setAttribute("type", "button");
reftoolButton.innerHTML = "User in Reftool";
reftoolButton.setAttribute("class", "btn btn-primary btn-sm js-progress-button");
reftoolButton.setAttribute("id", "form-button");
reftoolButton.setAttribute("style", "background-color: rgb(96,125,139);");

// 2. Append somewhere
header.appendChild(reftoolButton);

// 3. Add event handler
reftoolButton.addEventListener ("click", click_reftool_button);

var copyNameButton = document.getElementsByClassName("media-left")[0].childNodes[1];
copyNameButton.addEventListener("click", function(){navigator.clipboard.writeText(firstName + " " + lastName)}); //Copies their name to your clipboard if you click on the little initial icon next to their name.

// Function that handles click of form button
function click_reftool_button(){
    var url = "https://tools.is.oregonstate.edu/reftool2/search/" + firstName + "\%2520" + lastName + ";searchType=people;filterType=all";
    window.open(url, '_blank');
}
