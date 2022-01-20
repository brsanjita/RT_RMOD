/**
 * Copyright © Prof. Anurag Srivastava, Gowtham Kandaperumal, Linli Jia, and Dr. Sanjeev Pannala.
 * No image or information should be reproduced, transmitted, or copied without the prior agreement with Prof. Srivastava.
*/


//Decision Post Tab

// var decisionPost1 = document.getElementById('decision-post-chart').getContext('2d');
// var decision_post_barChart = new Chart(decisionPost1, {
//     type: 'line',
//     data: {
//         labels: ['100%', '70%', '50%', '20%'],
//         datasets: [{
//             label: 'Economic Mode',
//             fill: false,
//             backgroundColor: "red",
//             borderColor: "red",
//             data: [0.760,0.730,0.711,0.681],
//         }
//         ]
//     },
//     options: {
//         legend: {
//             display: false
//         },
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 },
//                 scaleLabel: {
//                     display: true,
//                     labelString: 'Restoration score'
//                 }
//             }],
//             xAxes: [{
//                 scaleLabel: {
//                     display: true,
//                     labelString: 'Sheddable load percentage'
//                 }
//             }],
//         }
//     }
// });

var decisionPost1 = document.getElementById('decision-post-chart').getContext('2d');
var decision_post_lineChart = new Chart(decisionPost1, {
    type: 'line',
    data: {
        labels: ['100%', '70%', '50%', '20%'],
        datasets: [{
            label: 'Economic mode',
            fill: false,
            backgroundColor: "red",
            borderColor: "red",
            data: [0.760,0.730,0.711,0.681],
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
                    labelString: 'Restoration score'
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Sheddable load percentage'
                }
            }],
        }
    }
});


var postrecoverychart = document.getElementById('posteventrecoverychart').getContext('2d');
var postrecovery_barChart = new Chart(postrecoverychart, {
    type: 'bar',
    data: {
        labels: ['100%', '70%', '50%', '20%'],
        datasets: [
            {
                label: 'TS',
                backgroundColor: "red",
                data: [0.852,	0.852,	0.852,	0.852
                    ],
            },
            {
                label: 'LRPR',
                backgroundColor: "blue",
                data: [0.930,	0.930,	0.930,	0.930
                    ],
            },
            {
                label: 'ESM',
                backgroundColor: "green",
                data: [0.900,	0.900,	0.900,	0.900
                    ],
            },
            {
                label: 'PBMR',
                backgroundColor: "yellow",
                data: [0.527,	0.527,	0.527,	0.527
                    ],
            },
            {
                label: 'LSF',
                backgroundColor: "gray",
                data: [0.654,	0.458,	0.327,	0.131
                    ],
            },
            {
                label: 'EL',
                backgroundColor: "violet",
                data: [0.528,	0.528,	0.528,	0.528
                    ],
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
                    beginAtZero: true
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Factor value'
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Sheddable load percentage'
                }
            }],
        }
    }
});


$(document).ready(function() {
    $('#restorationplan').DataTable({
        "paging": true,
        "pageLength": 7,
        "sDom":"tipr",
        "bInfo" : false
    });

    // $('#impactonsystem').DataTable({
    //     "paging": true,
    //     "pageLength": 5,
    //     "sDom":"tipr",
    //     "bInfo" : false
    // });

    // $('#availablegenresources').DataTable({
    //     "paging": true,
    //     "pageLength": 3,
    //     "sDom":"tipr",
    //     "bInfo" : false
    // });
} );


//Decision During Map
var decision_post_map = L.map('decision-post-mapid').setView([60.53972879, -145.7344047], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(decision_post_map);

function postEventgetEdges() {
    //Ajax call
        $.ajax({url: "http://127.0.0.1:5000/posteventedges", 
        success: function(data){
            console.log(data);
            
            for(let i=0; i<data.links.length; i++){
                
                if (data.links[i].link_status == 1){
                    var edges = L.polyline(
                        [
                            [data.links[i].from_node_lat, data.links[i].from_node_long], 
                            [data.links[i].to_node_lat, data.links[i].to_node_long]
                        ], 
                        {color: 'black' }
                        ).addTo(decision_post_map);
                    }
                
                
                if (data.links[i].link_status == 2){
                    var edges = L.polyline(
                        [
                            [data.links[i].from_node_lat, data.links[i].from_node_long], 
                            [data.links[i].to_node_lat, data.links[i].to_node_long]
                        ], 
                        {dashArray: "10 10", color: 'black' }
                        ).addTo(decision_post_map);
                    }
                
                    if (data.links[i].link_status == 3){
                        var edges = L.polyline(
                            [
                                [data.links[i].from_node_lat, data.links[i].from_node_long], 
                                [data.links[i].to_node_lat, data.links[i].to_node_long]
                            ], 
                            {color: 'red' }
                            ).addTo(decision_post_map);
                        }

                }

        }    
    });
}
postEventgetEdges();

$("a[href='#decision-post']").on('shown.bs.tab', function (e) {
    decision_post_map.invalidateSize();
});