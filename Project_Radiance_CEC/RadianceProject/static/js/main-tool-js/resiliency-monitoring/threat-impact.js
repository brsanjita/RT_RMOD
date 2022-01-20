/**
 * Copyright © Prof. Anurag Srivastava, Gowtham Kandaperumal, Linli Jia, and Dr. Sanjeev Pannala.
 * No image or information should be reproduced, transmitted, or copied without the prior agreement with Prof. Srivastava.
*/

//Map for Threat and Impact
var livemap2 = L.map('mapid2').setView([60.53972879, -145.7344047], 12);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 30,
    //id: 'mapbox/streets-v11',
    id: 'mapbox/streets-v11',
    accessToken: 'sk.eyJ1IjoiYW5zaHVtYW5sbnUiLCJhIjoiY2s1N3ZsOGtwMDN2OTNscG9hc3FjcDU5NCJ9.Q5n-6Z_xsReecwKAW4l0Xg'
}).addTo(livemap2);

$("a[href='#threatimpact2']").on('shown.bs.tab', function (e) {
    livemap2.invalidateSize();
});

$(document).ready(function() {
    $('#impactsummarytable').DataTable({
        "paging": true,
        "pageLength": 9,
        "sDom":"tipr",
        "bInfo" : false
    });
});