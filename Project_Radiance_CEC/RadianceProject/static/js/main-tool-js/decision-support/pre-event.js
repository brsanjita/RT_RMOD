/**
 * Copyright © Prof. Anurag Srivastava, Gowtham Kandaperumal, Linli Jia, and Dr. Sanjeev Pannala.
 * No image or information should be reproduced, transmitted, or copied without the prior agreement with Prof. Srivastava.
*/


//**************Decision Pre Maps*****************//
// var decision_pre_map = L.map('decision-mapid').setView([60.53972879, -145.7344047], 12);
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// 	maxZoom: 19,
// 	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(decision_pre_map);


$(document).ready(function() {
    $('#expectedeventdetailstable').DataTable({
        "paging": true,
        "pageLength": 3,
        "sDom":"tipr",
        "bInfo" : false
    });

    $('#expectedoutagetable').DataTable({
        "paging": true,
        "pageLength": 12,
        "sDom":"tipr",
        "bInfo" : false
    });
} );

// function preEventgetEdges() {
//     //Ajax call
//         $.ajax({url: "http://127.0.0.1:5000/preeventedges", 
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
//                         ).addTo(decision_pre_map);
//                     }
                
                
//                 if (data.links[i].link_status == 2){
//                     var edges = L.polyline(
//                         [
//                             [data.links[i].from_node_lat, data.links[i].from_node_long], 
//                             [data.links[i].to_node_lat, data.links[i].to_node_long]
//                         ], 
//                         {dashArray: "10 10", color: 'black' }
//                         ).addTo(decision_pre_map);
//                     }
                
//                     if (data.links[i].link_status == 3){
//                         var edges = L.polyline(
//                             [
//                                 [data.links[i].from_node_lat, data.links[i].from_node_long], 
//                                 [data.links[i].to_node_lat, data.links[i].to_node_long]
//                             ], 
//                             {color: 'red' }
//                             ).addTo(decision_pre_map);
//                         }

//                 }

//         }    
//     });
// }
// preEventgetEdges();

// $("a[href='#decision']").on('shown.bs.tab', function (e) {
//     decision_pre_map.invalidateSize();
// });


//Decision Page Charts
var decisionctx1 = document.getElementById('decision-pre-barchart').getContext('2d');
var decision_pre_barChart = new Chart(decisionctx1, {
    type: 'line',
    data: {
        labels: ['1','2','3','4', '5', '6', '7', '8'],
        datasets: [{
            label: 'Without Proactive control',
            fill: false,
            backgroundColor: "red",
            borderColor: "red",
            data: [0.98, 0.96, 0.95, 0.75, 0.71, 0.72, 0.73, 0.74],
        },
        {
            label: 'With Proactive control',
            fill: false,
            backgroundColor: "orange",
            borderColor: "orange",
            data: [0.95, 0.96, 0.83, 0.89, 0.87, 0.86, 0.84, 0.85],
            borderDash: [10, 5]
        }
        ]
    },
    options: {
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
                    labelString: 'Resiliency Score'
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



//For anticipate chart
const anticipate_config = {
    type: 'bar',
    data: {
        labels: ['Threat & Vul.', 'Power Delivery & Loads', 'Restoration & Recovery', 'Cyber & Communication'],
        datasets: [
            // {
            //     label: 'Earthquake',
            //     data: [5, 10, 2, 12],
            //     hidden: true,
            //     borderWidth: 1,
            //     backgroundColor: [
            //         'rgba(255, 99, 132, 0.2)',
            //         'rgba(255, 99, 132, 0.2)',
            //         'rgba(255, 99, 132, 0.2)',
            //         'rgba(255, 99, 132, 0.2)',
            //     ]
            // }, 
            // {
            //     label: 'Volcano',
            //     data: [3, 4, 8, 12],
            //     borderWidth: 1,
            //     hidden: true,
            //     backgroundColor: [
            //         'rgba(54, 162, 235, 0.2)',
            //         'rgba(54, 162, 235, 0.2)',
            //         'rgba(54, 162, 235, 0.2)',
            //         'rgba(54, 162, 235, 0.2)',
            //     ]
            // }, 
            // {
            //     label: 'Tsunami',
            //     data: [5, 10, 2, 12],
            //     borderWidth: 1,
            //     hidden: true,
            //     backgroundColor: [
            //         'rgba(255, 206, 86, 0.2)',
            //         'rgba(255, 206, 86, 0.2)',
            //         'rgba(255, 206, 86, 0.2)',
            //         'rgba(255, 206, 86, 0.2)',
            //     ]
            // }, 
            {
                label: 'Avalanche',
                data: [3, 4, 8, 12],
                borderWidth: 1,
                // hidden: true,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ]
            },
        ]
    },
    options: {
        legend: {
            display: true
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Value'
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Domain'
                }
            }],
        }
    }
};

const anticipate_chart_ctx = document.getElementById('anticipate-chart').getContext('2d');

const anticipate_chart = new Chart(anticipate_chart_ctx, anticipate_config);