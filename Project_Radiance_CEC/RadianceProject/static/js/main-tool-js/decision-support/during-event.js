/**
 * Copyright © Prof. Anurag Srivastava, Gowtham Kandaperumal, Linli Jia, and Dr. Sanjeev Pannala.
 * No image or information should be reproduced, transmitted, or copied without the prior agreement with Prof. Srivastava.
*/

//Decision During Map
// var decision_during_map = L.map('decision-during-mapid').setView([60.53972879, -145.7344047], 12);
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// 	maxZoom: 19,
// 	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(decision_during_map);

// function duringEventgetEdges() {
//     //Ajax call
//         $.ajax({url: "http://127.0.0.1:5000/duringeventedges", 
//         success: function(data){
//             console.log(data);
            
//             for(let i=0; i<data.links.length; i++){
                
//                 if (data.links[i].link_status == 1){
//                     var edges = L.polyline(
//                         [
//                             [data.links[i].from_node_lat, data.links[i].from_node_long], 
//                             [data.links[i].to_node_lat, data.links[i].to_node_long]
//                         ], 
//                         {color: 'black' }
//                         ).addTo(decision_during_map);
//                     }
                
                
//                 if (data.links[i].link_status == 2){
//                     var edges = L.polyline(
//                         [
//                             [data.links[i].from_node_lat, data.links[i].from_node_long], 
//                             [data.links[i].to_node_lat, data.links[i].to_node_long]
//                         ], 
//                         {dashArray: "10 10", color: 'black' }
//                         ).addTo(decision_during_map);
//                     }
                
//                     if (data.links[i].link_status == 3){
//                         var edges = L.polyline(
//                             [
//                                 [data.links[i].from_node_lat, data.links[i].from_node_long], 
//                                 [data.links[i].to_node_lat, data.links[i].to_node_long]
//                             ], 
//                             {color: 'red' }
//                             ).addTo(decision_during_map);
//                         }

//                 }

//         }    
//     });
// }
// duringEventgetEdges();

$("a[href='#decision-during']").on('shown.bs.tab', function (e) {
    decision_during_map.invalidateSize();
});

//Line chart
var decisionctx2 = document.getElementById('decision-during-linechart').getContext('2d');
var decision_during_lineChart = new Chart(decisionctx2, {
    type: 'line',
    data: {
        labels: ['1', '2', '3','4','5','6'],
        datasets: [{
            label: 'Economic mode',
            fill: false,
            backgroundColor: "red",
            borderColor: "red",
            data: [0.9617,0.9233,0.8469,0.6080,0.5296,0.5274],
        },
        {
            label: 'Resiliency mode',
            fill: false,
            backgroundColor: "orange",
            borderColor: "orange",
            data: [0.9617,0.9994,0.9991,0.7603,0.6819,0.6035],
            borderDash: [10, 5]
        }
        ]
    },
    options: {
        maintainAspectRatio: false,
        legend: {
            display: true
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Resiliency value'
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Time (hours)'
                }
            }],
        }
    }
});

//SoC Curve
var socCtx = document.getElementById('soccurve').getContext('2d');
var decision_during_lineChart = new Chart(socCtx, {
    type: 'line',
    data: {
        labels: ['1', '2', '3','4','5','6'],
        datasets: [{
            label: 'Economic mode',
            fill: false,
            backgroundColor: "red",
            borderColor: "red",
            data: [90, 80, 60, 40, 20, 20],
        }
        ]
    },
    options: {
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
                scaleLabel: {
                    display: true,
                    labelString: 'SoC percentage'
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Time (hours)'
                }
            }],
        }
    }
});


$(document).ready(function() {
    $('#presentsysconditions').DataTable({
        "paging": true,
        "pageLength": 3,
        "sDom":"tipr",
        "bInfo" : false
    });

    $('#impactonsystem').DataTable({
        "paging": true,
        "pageLength": 3,
        "sDom":"tipr",
        "bInfo" : false
    });

    $('#availablegenresources').DataTable({
        "paging": true,
        "pageLength": 3,
        "sDom":"tipr",
        "bInfo" : false
    });
} );