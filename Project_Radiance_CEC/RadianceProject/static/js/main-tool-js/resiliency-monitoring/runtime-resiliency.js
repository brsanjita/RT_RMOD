/**
*Copyright © Prof. Anurag Srivastava, Gowtham Kandaperumal, Linli Jia, and Dr. Sanjeev Pannala.
*No image or information should be reproduced, transmitted, or copied without the prior agreement with Prof. Srivastava.
*/
// var baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// 	maxZoom: 19,
// 	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// });

// var livemap = new L.map('mapid', {
//     layers: [baseLayer]
// }).setView([60.53972879, -145.7344047], 12);



// setTimeout(function(){
//     livemap.addLayer(heatlayer);
// },500)


// var newLayer =  L.tileLayer(
//     "http://api.openweathermap.org/data/2.5/weather?q=Cordova&appid=70af9d70d262ba0c782bab858a01ae95").addTo(livemap);

//Get all the nodes from AJAX call and set on the map
// function getStaticNodes() {
//     //Ajax call
//         $.ajax({url: "http://127.0.0.1:5000/staticnodes", 
//         success: function(data){
//             console.log(data);
//             for (i=0; i<data.data.length; i++) {
            
//             if (data.data[i].node_code === "G"){
//                 circle300 = L.circleMarker(([data.data[i].node_lat, data.data[i].node_long]), 
//                 { 
//                     color: 'orange',fillColor: 'orange',fillOpacity: 1,radius: 10 
//                 }).addTo(nodes_map).bindTooltip(data.data[i].node_desc, { permanent: true }).openTooltip();    


//                 circle300 = L.circleMarker(([data.data[i].node_lat, data.data[i].node_long]), 
//                 { 
//                     color: 'orange', 
//                     fillColor: 'orange', 
//                     fillOpacity: 1, 
//                     radius: 10 
//                 }).addTo(livemap).bindTooltip(data.data[i].node_desc, { permanent: true }).openTooltip();    


//                 circle300 = L.circleMarker(([data.data[i].node_lat, data.data[i].node_long]), 
//                 { 
//                     color: 'orange', 
//                     fillColor: 'orange', 
//                     fillOpacity: 1, 
//                     radius: 10 
//                 }).addTo(generating_units_map).bindTooltip(data.data[i].node_desc, { permanent: true }).openTooltip();
                
//                 circle300 = L.circleMarker(([data.data[i].node_lat, data.data[i].node_long]), 
//                 { 
//                     color: 'orange', 
//                     fillColor: 'orange', 
//                     fillOpacity: 1, 
//                     radius: 10 
//                 }).addTo(livemap2).bindTooltip(data.data[i].node_desc, { permanent: true }).openTooltip(); 
                
                
//                 circle300 = L.circleMarker(([data.data[i].node_lat, data.data[i].node_long]), 
//                 { 
//                     color: 'orange', 
//                     fillColor: 'orange', 
//                     fillOpacity: 1, 
//                     radius: 10 
//                 }).addTo(decision_pre_map).bindTooltip(data.data[i].node_desc, { permanent: true }).openTooltip(); 

//                 circle300 = L.circleMarker(([data.data[i].node_lat, data.data[i].node_long]), 
//                 { 
//                     color: 'orange', 
//                     fillColor: 'orange', 
//                     fillOpacity: 1, 
//                     radius: 10 
//                 }).addTo(decision_during_map).bindTooltip(data.data[i].node_desc, { permanent: true }).openTooltip();
                
//                 circle300 = L.circleMarker(([data.data[i].node_lat, data.data[i].node_long]), 
//                 { 
//                     color: 'orange', 
//                     fillColor: 'orange', 
//                     fillOpacity: 1, 
//                     radius: 10 
//                 }).addTo(decision_post_map).bindTooltip(data.data[i].node_desc, { permanent: true }).openTooltip();


//                 circle300 = L.circleMarker(([data.data[i].node_lat, data.data[i].node_long]), 
//                 { 
//                     color: 'orange', 
//                     fillColor: 'orange', 
//                     fillOpacity: 1, 
//                     radius: 10 
//                 }).addTo(planning_pre_map).bindTooltip(data.data[i].node_desc, { permanent: true }).openTooltip();

//             }

//             if (data.data[i].node_code === "N"){
//                 // nodes_map
//                 circle300 = L.circleMarker(([data.data[i].node_lat, data.data[i].node_long]), 
//                 { 
//                     color: 'blue', 
//                     fillColor: 'blue', 
//                     fillOpacity: 1, 
//                     radius: 10 
//                 }).addTo(nodes_map).bindTooltip(data.data[i].node_desc, { permanent: true }).openTooltip();  
                
                
//                 // Live Map
//                 circle300 = L.circleMarker(([data.data[i].node_lat, data.data[i].node_long]), 
//                 { 
//                     color: 'blue', 
//                     fillColor: 'blue', 
//                     fillOpacity: 1, 
//                     radius: 10 
//                 }).addTo(livemap).bindTooltip(data.data[i].node_desc, { permanent: true }).openTooltip();  

//                 circle300 = L.circleMarker(([data.data[i].node_lat, data.data[i].node_long]), 
//                 { 
//                     color: 'blue', 
//                     fillColor: 'blue', 
//                     fillOpacity: 1, 
//                     radius: 10 
//                 }).addTo(livemap2).bindTooltip(data.data[i].node_desc, { permanent: true }).openTooltip();  
            
                
//                 //loads_map
//                 circle300 = L.circleMarker(([data.data[i].node_lat, data.data[i].node_long]), 
//                 { 
//                     color: 'blue', 
//                     fillColor: 'blue', 
//                     fillOpacity: 1, 
//                     radius: 10 
//                 }).addTo(loads_map).bindTooltip(data.data[i].node_desc, { permanent: true }).openTooltip();
                
                
//                 circle300 = L.circleMarker(([data.data[i].node_lat, data.data[i].node_long]), 
//                 { 
//                     color: 'blue', 
//                     fillColor: 'blue', 
//                     fillOpacity: 1, 
//                     radius: 10 
//                 }).addTo(decision_during_map).bindTooltip(data.data[i].node_desc, { permanent: true }).openTooltip();
            
//                 circle300 = L.circleMarker(([data.data[i].node_lat, data.data[i].node_long]), 
//                 { 
//                     color: 'blue', 
//                     fillColor: 'blue', 
//                     fillOpacity: 1, 
//                     radius: 10 
//                 }).addTo(decision_pre_map).bindTooltip(data.data[i].node_desc, { permanent: true }).openTooltip();

//                 circle300 = L.circleMarker(([data.data[i].node_lat, data.data[i].node_long]), 
//                 { 
//                     color: 'blue', 
//                     fillColor: 'blue', 
//                     fillOpacity: 1, 
//                     radius: 10 
//                 }).addTo(decision_post_map).bindTooltip(data.data[i].node_desc, { permanent: true }).openTooltip();

//                 circle300 = L.circleMarker(([data.data[i].node_lat, data.data[i].node_long]), 
//                 { 
//                     color: 'blue', 
//                     fillColor: 'blue', 
//                     fillOpacity: 1, 
//                     radius: 10 
//                 }).addTo(planning_pre_map).bindTooltip(data.data[i].node_desc, { permanent: true }).openTooltip();
            
//             }

//         }
//         for(let i=0; i<data.links.length; i++){
            
//             if (data.links[i].link_status == 1){
//                 var edges = L.polyline(
//                     [
//                         [data.links[i].from_node_lat, data.links[i].from_node_long], 
//                         [data.links[i].to_node_lat, data.links[i].to_node_long]
//                     ], 
//                     {color: 'black' }
//                     ).addTo(livemap);

//                     L.polyline(
//                         [
//                             [data.links[i].from_node_lat, data.links[i].from_node_long], 
//                             [data.links[i].to_node_lat, data.links[i].to_node_long]
//                         ], 
//                         {color: 'black' }
//                         ).addTo(livemap2);
//                 }
            
            
//             if (data.links[i].link_status == 2){
//                 var edges = L.polyline(
//                     [
//                         [data.links[i].from_node_lat, data.links[i].from_node_long], 
//                         [data.links[i].to_node_lat, data.links[i].to_node_long]
//                     ], 
//                     {dashArray: "10 10", color: 'black' }
//                     ).addTo(livemap);

//                     L.polyline(
//                         [
//                             [data.links[i].from_node_lat, data.links[i].from_node_long], 
//                             [data.links[i].to_node_lat, data.links[i].to_node_long]
//                         ], 
//                         {dashArray: "10 10", color: 'black' }
//                         ).addTo(livemap2);
//                 }
            
//             if (data.links[i].link_status == 3){
//                 var edges = L.polyline(
//                     [
//                         [data.links[i].from_node_lat, data.links[i].from_node_long], 
//                         [data.links[i].to_node_lat, data.links[i].to_node_long]
//                     ], 
//                     {color: 'red' }
//                     ).addTo(livemap);

//                     L.polyline(
//                         [
//                             [data.links[i].from_node_lat, data.links[i].from_node_long], 
//                             [data.links[i].to_node_lat, data.links[i].to_node_long]
//                         ], 
//                         {color: 'red' }
//                         ).addTo(livemap2);
//                 }

//             }

//         }    
//     });
// }

// getStaticNodes()

// $("a[href='#Real-Time']").on('shown.bs.tab', function (e) {
//     livemap.invalidateSize();
// });

// $("a[href='#runtimescore']").on('shown.bs.tab', function (e) {
//     livemap.invalidateSize();
// });



//Live Graphs
$(document).ready(function () {

    const config = {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                // label: "Resiliency Score",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [],
                fill: false,
            }],
        },
        options: {
            legend: {
                display: false
            },
            title: {
                display: false,
                text: 'Creating Real-Time Charts with Flask'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes:
                    [{
                        display: true,
                        type: 'realtime',
                        realtime: {
                            duration: 20000, 
                            pause: false,
                            displayFormats: {
                                
                            }, 
                            delay: 9000,
                        },
                        
                        scaleLabel: {
                            display: true,
                            labelString: 'Time'
                        },
                    },

                    ],
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: 1
                    },

                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Resiliency Score'
                    },
                }]
            }
        }
    };



    const config2 = {
        type: 'bar',
        data: {
            labels: ['Topological Factor', 'Generation Factor', 'Threat Impact Factor', 'Critical Load Demand', 'Critical Load Not Lost'],
            datasets: [{
                label: '',
                data: [0, 0, 0, 0, 0],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: 1
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Factor Value'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Influence Factors'
                    }
                }],
            }
        }
    };

    const context = document.getElementById('myChart').getContext('2d');
    const ctx2 = document.getElementById('myChart2').getContext('2d');
    const lineChart = new Chart(context, config);
    const barChart = new Chart(ctx2, config2);

    // config.options.scales.xAxes[0].realtime.delay = 60000;
    // lineChart.update({ duration: 0 });

    const source = new EventSource("/bar-chart-data");

    source.onmessage = function (event) {
        const data = JSON.parse(event.data);

        config.data.labels.push(data.time);
        config.data.datasets[0].data.push(data.resiliency);
        config2.data.datasets[0].data[0] = data.tf;
        config2.data.datasets[0].data[1] = data.rg;
        config2.data.datasets[0].data[2] = data.tif;
        config2.data.datasets[0].data[3] = data.dcl;
        config2.data.datasets[0].data[4] = data.clnl;
        barChart.update();

        var table = document.getElementById("resiliency-history");
        var row = table.insertRow(1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        // var cell8 = row.insertCell(7);

        // cell1.innerHTML = data.time;
        // cell2.innerHTML = data.tf;
        // cell3.innerHTML = data.clnl;
        // cell4.innerHTML = data.dcl;
        // cell5.innerHTML = data.rg;
        // cell6.innerHTML = data.tif;
        // cell7.innerHTML = data.resiliency;

        cell1.innerHTML = data.time;
        cell2.innerHTML = data.tf;
        cell3.innerHTML = data.rg;
        cell4.innerHTML = data.tif;
        cell5.innerHTML = data.dcl;
        cell6.innerHTML = data.clnl;
        cell7.innerHTML = data.resiliency;
    }

    //Recover Metric Graph
    const configRecover = {
        type: 'bar',
        data: {
            labels: ['Topological Score', 'Load Redundant Path R', 'Energy Storage Margin', 'Power Balance Margin R', 'Load Shedding Flexibility', 'Energy Loss'],
            datasets: [{
                label: '',
                data: [0.980, 1.000,	1.000,	0.843,	1.000,	0.215],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: 1
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Factor Value'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Influence Factors'
                    }
                }],
            }
        }
    };

    const recoverCtx = document.getElementById('recovery-chart').getContext('2d');
    const recoverBarChart = new Chart(recoverCtx, configRecover);


});

//Controlling graph Sub tabs 
$('#bologna-list a').on('click', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })


//Virtual Assistant Implementation
// virtualSubmit

$(document).ready(function(){
    $("#virtualNext").attr("disabled", true);
    $("#virtualSubmit").click(function(){
      var details = {
          "acsTok": "R857pxBAqxUqK5dEMzaqA", 
          "txt": $("#virtualText").val(),
          "mdlId": "sql.model.id"
      }
      
      $.ajax({
      url: "http://localhost:8081/api/v1/ask/sync", 
      type: 'post',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(details),
      success: function(result){
          console.log(result);
          $("#virtualSubmit").attr("disabled", true);
          $("#virtualNext").attr("disabled", false);
          $("#virtualResult").innerHTML = "<p> Results </p>";
          resultColsLength = result.state.resBody.columns.length;
          
          //Adding head
          $("#tablehead").append("<tr>");  
          for(i=0; i < resultColsLength; i++){
                  $("#tablehead").append("<th>" + result.state.resBody.columns[i] + "</th>");
          }
          $("#tablehead").append("</tr>");
          //Adding head end

          //Adding Body rows
          resultRowsLength = result.state.resBody.rows.length; 
          for(j=0; j < resultRowsLength; j++){
            $("#tablebody").append("<tr>");
              for(k=0; k < resultColsLength; k++){
                $("#tablebody").append("<td>" + result.state.resBody.rows[j][k] + "</td>");
                }
                $("#tablebody").append("</tr>"); 
          }
      }});
    });
  
  
   $("#virtualClose").click(function(){
        $("#virtualText").val("");
        $("#tablehead th").remove();
        $("#tablebody td").remove();
        $("#virtualSubmit").attr("disabled", false);
        $("#virtualResult").innerHTML = "<p> Results appear here </p>";
     });

     $("#virtualNext").click(function(){
        $("#virtualText").val("");
        $("#tablehead th").remove();
        $("#tablebody td").remove();
        $("#virtualSubmit").attr("disabled", false);
        $("#virtualResult").innerHTML = "<p> Results appear here </p>";
        $("#virtualNext").attr("disabled", true);
     });
});



  