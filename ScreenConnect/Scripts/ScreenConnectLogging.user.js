// ==UserScript==
// @name         ScreenConnectLogging
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Logs screen connect info whenever the screen connect log info leaves the screen (presumably when the session ends).
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
        else{
            logInfoPrint = logInfo;
            isSessionActive = true;
        }
    }
    catch(e){
        if(isSessionActive){
            alert("Logged session info to browser console!");
            console.log(logInfoPrint);
            isSessionActive = false;
        }
    }
    window.setTimeout(logScreenConnectInfo, 1000);
}

function GetSessionLogInfo(){
	//Get the log info element and split it to get an array of seperate rows.
    var logInfo = document.getElementsByClassName("General")[0].innerHTML.split("<dt>");
    //Clean up the log info by replacing all leftover unnecessary html. Makes the output easier to read.
	for(var i = 0; i < logInfo.length; i++){
		logInfo[i] = logInfo[i].replace("</dt>", " ");
		logInfo[i] = logInfo[i].replace("<dd>", " ");
		logInfo[i] = logInfo[i].replace("</dd>", " ");
        logInfo[i] = logInfo[i].replace("<a href=\"#\">[X]</a>", " ");
        logInfo[i] = logInfo[i].replace("</dl><h2>Device</h2>", " ");
        logInfo[i] = logInfo[i].replace("<div class=\"PercentageBarEmpty\" title=\"45.95%\" style=\"width: 45.95%;\"></div></div>", " ");
        logInfo[i] = logInfo[i].replace("<div class=\"PercentageBar\"><div class=\"PercentageBarFilled\" title=\"54.05%\" style=\"width: 54.05%;\"></div>", " ");
        logInfo[i] = logInfo[i].replace("</dl><h2>Other</h2><dl>", " ");
        logInfo[i] = logInfo[i].replace("<dl>", " ");
        logInfo[i] = logInfo[i].replace("&nbsp;", " ");
        logInfo[i] = logInfo[i].replace("</dl>", " ");
        logInfo[i] = logInfo[i].replace("<h2>Network</h2>", " ");
        if(logInfo[i].includes("<div class=\"ScreenshotPanel\" style=\"\"><div><img src=\"data:i")){
            logInfo[i] = "Screen Connect Log Output:";
        }
        if(logInfo[i].includes("<div class=\"PercentageBar\">")){
            logInfo[i] = logInfo[i].split("MB")[0] + "MB" + logInfo[i].split("MB")[1] + "MB";
        }

    }
    return logInfo;
}

function CheckIsSessionActive(logInfo){
    for(var i = 0; i < logInfo.length; i++){
		if(logInfo[i].includes("Host:")){
			for(var j = 5; j < logInfo[i].length; j++){
				if(logInfo[i][j] != " "){
					return true;
				}
			}
		}
	}
	return false;
}
