// ==UserScript==
// @name         ScreenConnectLogging
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Logs screen connect session information to the console every minute.
// @             This could be occasionally useful in case you forget to get the name of the customer,
// @             need the device name you were connected to, or other information that is presented in the screen connect session log.
// @author       Tyler Farnham
// @match        https://support.oregonstate.edu/host*
// @grant        none
// ==/UserScript==

window.setTimeout(logScreenConnectInfo, 1000);
var isSessionActive = false;
var logInfoPrint;
function logScreenConnectInfo(){
    try{
        var logInfo = GetSessionLogInfo();
		if(!CheckIsSessionActive(logInfo)){
			if(isSessionActive){
				alert("Logged session info to browser console!");
                console.log(logInfoPrint);
                isSessionActive = false;
			}
			window.setTimeout(logScreenConnectInfo, 1000);
			return;
		}
        logInfoPrint = logInfo;
		isSessionActive = true;

    }
    catch(e){
        console.log("No screen connect info" + e);
    }
    window.setTimeout(logScreenConnectInfo, 1000);
}

function GetSessionLogInfo(){
	var logInfo = document.getElementsByClassName("General")[0].innerHTML.split("<dt>");
	for(var i = 0; i < logInfo.length; i++){
		logInfo[i] = logInfo[i].replace("</dt>", " ");
		logInfo[i] = logInfo[i].replace("<dd>", " ");
		logInfo[i] = logInfo[i].replace("</dd>", " ");
    }
    return logInfo;
}

function CheckIsSessionActive(logInfo){
    for(var i = 0; i < logInfo.length; i++){
		if(logInfo[i].includes("Name:")){
			for(var j = 5; j < logInfo[i].length; j++){
				if(logInfo[i][j] != " "){
					return true;
				}
			}
		}
	}
	return false;
}
