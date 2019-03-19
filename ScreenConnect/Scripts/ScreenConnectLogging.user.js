// ==UserScript==
// @name         ScreenConnectLogging
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Logs screen connect session information to the console every minute.
// @             This could be occasionally useful in case you forget to get the name of the customer,
// @             need the device name you were connected to, or other information that is presented in the screen connect session log.
// @author       Tyler Farnham
// @match        https://support.oregonstate.edu/host*
// @grant        none
// ==/UserScript==

window.setTimeout(logScreenConnectInfo, 1000);

function logScreenConnectInfo(){
    try{
        var logInfo = document.getElementsByClassName("General")[0].innerHTML.split("<dt>");
        for(var i = 0; i < logInfo.length; i++){
            logInfo[i] = logInfo[i].replace("</dt>", " ");
            logInfo[i] = logInfo[i].replace("<dd>", " ");
            logInfo[i] = logInfo[i].replace("</dd>", " ");
        }
        console.log(logInfo);
    }
    catch(e){
        console.log("No screen connect info");
    }
    window.setTimeout(logScreenConnectInfo, 60000);
}