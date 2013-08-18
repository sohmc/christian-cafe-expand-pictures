// ==UserScript== 
// @name        ChristianCafe Helper
// @author      Michael Soh 
// @namespace   christian-cafe-helper-SJNMMFP08Q
// @description Helps you navigate on ChristianCafe
// @version     0.1
// @license     GPL 3.0 
// @include     https://www.christiancafe.com/members/quickmatch/index.jsp
//
// @grant       GM_log
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
//
//  
// ==/UserScript== 
var j$ = 0;
load_jQuery();


// =-=-=-=-=- MAIN FUNCTIONS -=-=-=-=-= //

function load_jQuery() {
    if (typeof jQuery !== "undefined") {
        if (typeof $ !== "undefined")
            j$ = $;
        else 
            j$ = jQuery.noConflict();

        whereami();
    } else if (++j$ < 5) {
        GM_log('jQuery == ' + typeof jQuery);
        setTimeout(doDetect, 1500);
    } else {
        alert('jQuery timed out: ' + j$);
    }
}

function whereami() {
    if (RegExp("quickmatch").test(window.location.href)) {
        expand_images();
    }
}

function expand_images() {
    j$('a.imageLink').each(function() {
        var img = j$(this).attr('onmouseover');

        var regexp = new RegExp("src=\\\\'(https:.*jpg)\\\\'");
        var match = regexp.exec(img);

        if (match != null) {
            GM_log("Changed.");
            src = match[1];
            j$(this).find('img').first().attr('src', src);
            j$(this).find('img').first().removeAttr('width');
            j$(this).removeAttr('onmouseover');
        } else {
            GM_log("no match found for " + img);
        }

    });
}



// =-=-=- Utilities -=-=-= //

function unix_to_string(ut) {
    var d = new Date(ut);

    var m = d.getMonth() + 1;
    var day = d.getDate();
    var y = d.getFullYear();

    return m + '/' + day + '/' + y;
}
