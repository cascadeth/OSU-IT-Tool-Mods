// ==UserScript==
// @name         Mark Junk
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://oregonstate.teamdynamix.com/TDNext/Apps/425/Tickets/TicketEdit*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var detailSaveBar = document.getElementsByClassName("TabButtonCell")[0];
    var btnMarkJunk = document.createElement("button");
    btnMarkJunk.className = "btn btn-danger";
    btnMarkJunk.innerHTML = "Mark Junk";
    $( btnMarkJunk ).css("float", "right");
    detailSaveBar.appendChild(btnMarkJunk);

})();