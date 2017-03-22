// ==UserScript==
// @name         Mark Junk
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  TD is a potato and should feel bad.
// @author       You
// @match        https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/TicketEdit*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var detailSaveBar = (document.getElementsByClassName("TabButtonCell"))[0];
    var btnMarkJunk = document.createElement("button");
    btnMarkJunk.className = "btn btn-danger";
    btnMarkJunk.innerHTML = "Mark Junk";
    btnMarkJunk.type = "button";
    $( btnMarkJunk ).css("float", "right");
    btnMarkJunk.setAttribute("id", "MarkJunk");

    $( btnMarkJunk ).on("click", function() {
        console.log($("#hdnTypeCategoryName").val());
        console.log($("#hdnTypeName").val());
        var tickTypeJSON = { "categoryname": "General", "typename": "Junk / Delete This Ticket" };
        setTicketType(btnMarkJunk, tickTypeJSON);
        console.log($("#hdnTypeCategoryName").val());
        console.log($("#hdnTypeName").val());

        //because TD sucks and we can't have nice things...
        //update the text
        var tickName = document.getElementById("upTicketType");
        tickName = tickName.children[0];   //input-group element
        tickName = tickName.children[1];   //the div for the dalu_holder
        tickName = tickName.children[1];   //the bit-box with the ticket type text
        tickName.innerHTML = "General / Junk / Delete This Ticket<a class=\"closebutton\"> </a>";
        console.log("Changed innerHTML of ticket type bit-box");

        //do Save action
        WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions("btnSave", "", true, ";", "", false, false));
        return false;
    });

    detailSaveBar.appendChild(btnMarkJunk);

    //ticket type css selector: #upTicketType > div > div.form-control.talu_holder > span.bit-box
    //set to: General / Junk / Delete this ticket

    //var tickTypeHolder = document.getElementById("upTicketType");
    //console.log(tickTypeHolder.innerHTML);
    //var closer = tickTypeHolder[1];
    //var there = closer[1];


})();