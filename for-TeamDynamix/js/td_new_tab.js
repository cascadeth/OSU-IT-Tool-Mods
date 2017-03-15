// ==UserScript==
// @name         TeamDynamix New Tab Override
// @namespace    https://oregonstate.teamdynamix.com
// @version      0.1
// @description  Override default TD "new tab" settings
// @author       Liv Vitale
// @match        http://tampermonkey.net/index.php?version=4.2&ext=dhdg&updated=true
// @grant        none
// @include      https://oregonstate.teamdynamix.com/*
// ==/UserScript==

(function() {
    'use strict';

    window.setCookie({name: 'OpenAllNewWin', value: '1'});
})();