// ==UserScript==
// @name         Move Status to Top
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Auto-uncheck Notify Responsible
// @author       Tyler Farnham
// @match        https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/New*
// @match        https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/Edit*
// @grant        none
// ==/UserScript==

var URL = document.location.href;
var StatusInput = document.getElementById("attribute1306-grp");
var topElement;
window.setTimeout(moveStatusFieldToTop, 1000);
function moveStatusFieldToTop(){
    if(URL.indexOf("New") > 0){
        
        topElement = document.getElementById("divContent").childNodes[7].childNodes[6];

    }

    else{
        topElement = document.getElementById("divContent").childNodes[1].childNodes[2];

    }
        topElement.parentNode.insertBefore(StatusInput, topElement);
    
}
