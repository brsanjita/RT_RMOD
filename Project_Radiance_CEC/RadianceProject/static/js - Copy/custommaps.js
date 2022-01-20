$(document).ready(function() {
    "use strict";
  
    $('ul.nav > li').click(function(e) {
      e.preventDefault();
      $('ul.nav > li').removeClass('active');
      $(this).addClass('active');
    });
  });


//Weather information
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');

//Checking the uploaded file extension
var file = document.getElementById('systeminfo');

file.onchange = function(e) {
  var ext = this.value.match(/\.([^\.]+)$/)[1];
  if (ext != 'csv'){
    document.getElementById("systeminfoUpload").disabled = true;
    alert("Please select a csv file")
  }else{
    document.getElementById("systeminfoUpload").disabled = false;
  }
    
};

//Connecting to the main database 
function getSystemInfo() {
        $.ajax({
        url: "http://127.0.0.1:5000/systeminfo",     
        type: 'GET',
        success: function(data){
            // var obj= JSON.parse(result);
            // console.log(data.results);
            console.log(data)
            document.getElementById('pmu').innerHTML = data.data[0].key_val;
            document.getElementById('iso').innerHTML = data.data[1].key_val;
            document.getElementById('sub').innerHTML = data.data[2].key_val;
            document.getElementById('smart').innerHTML = data.data[3].key_val;
            document.getElementById('feeder').innerHTML = data.data[4].key_val;
            document.getElementById('oil').innerHTML = data.data[5].key_val;
        }    
    });
}
getSystemInfo()



var cbdetails = $('#cbdetails').DataTable( {
    paging: true,
    "sDom":"tipr",
    // autowidth: true,
    pageLength : 3,
    // order: [[3, 'desc']],
    "ajax": {
        "url": "http://127.0.0.1:5000/cbdetails",
        "type": "GET",
        "datatype": 'json',
        // "data": 'data.data'
    },
    columns: [
        { 'data': 'cb_id' },
        { 'data': 'cb_loc' },
        { 'data': 'cb_status'}
    ], 
} );


var transformerTable = $('#transformerTable').DataTable( {
    paging: true,
    "sDom":"tipr",
    // autowidth: true,
    pageLength : 3,
    // order: [[3, 'desc']],
    "ajax": {
        "url": "http://127.0.0.1:5000/transdetails",
        "type": "GET",
        "datatype": 'json',
        // "data": 'data.data'
    },
    columns: [
        { 'data': 'trans_id' },
        { 'data': 'trans_rating' },
        { 'data': 'trans_loc'},
        { 'data': 'trans_op_condition'}
    ], 
} );



var substationTable = $('#subtable').DataTable( {
    paging: true,
    "sDom":"tipr",
    // autowidth: true,
    pageLength : 3,
    // order: [[3, 'desc']],
    "ajax": {
        "url": "http://127.0.0.1:5000/subdetails",
        "type": "GET",
        "datatype": 'json',
        // "data": 'data.data'
    },
    columns: [
        { 'data': 'sub_id' },
        { 'data': 'sub_loc' },
        { 'data': 'sub_out_feed'},
        { 'data': 'sub_remarks'}
    ], 
} );


var guTable = $('#gutable').DataTable( {
    paging: true,
    "sDom":"tipr",
    // autowidth: true,
    pageLength : 3,
    // order: [[3, 'desc']],
    "ajax": {
        "url": "http://127.0.0.1:5000/gudetails",
        "type": "GET",
        "datatype": 'json',
        // "data": 'data.data'
    },
    columns: [
        { 'data': 'g_id' },
        { 'data': 'g_kv' },
        { 'data': 'g_unit_id'},
        { 'data': 'g_status'},
        { 'data': 'g_ctrl'},
        { 'data': 'g_mw_measured'},
        { 'data': 'g_rating'},
    ], 
} );


var loadTable = $('#loadstable').DataTable( {
    paging: true,
    "sDom":"tipr",
    // autowidth: true,
    pageLength : 3,
    // order: [[3, 'desc']],
    "ajax": {
        "url": "http://127.0.0.1:5000/loaddetails",
        "type": "GET",
        "datatype": 'json',
        // "data": 'data.data'
    },
    columns: [
        { 'data': 'l_id' },
        { 'data': 'l_kv' },
        { 'data': 'l_unit_id'},
        { 'data': 'l_status'},
        { 'data': 'l_type'},
        { 'data': 'l_mw_measured'},
        { 'data': 'l_mvar_measured'},
    ], 
} );



//Maps for real time

var address = [
    [60.631247, -145.589310],
    [60.627037, -145.595146],
    [60.628721, -145.599953],
    [60.623332, -145.605789],
    [60.620300, -145.609222],
    [60.617269, -145.614716],
    [60.613562, -145.621925],
    [60.614739, -145.628432],
    [60.616122, -145.630223],
    [60.616465, -145.629995],
    [60.610081, -145.632727],
    [60.597869, -145.663727]

];


// var baseLayer = 
// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',    
//     maxZoom: 22,
//     id: 'mapbox/streets-v11',
//     accessToken: 'sk.eyJ1IjoiYW5zaHVtYW5sbnUiLCJhIjoiY2s1N3ZsOGtwMDN2OTNscG9hc3FjcDU5NCJ9.Q5n-6Z_xsReecwKAW4l0Xg'
// });

// var baseLayer = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
// 	maxZoom: 20,
// 	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
// });

var baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});


//Covid Layer
var heatlayer = L.heatLayer([
    [46.43197502,-117.5454032,0],
    [48.4711431,-118.5154041,0.1],
    [47.57705241,-118.4194388,0.1],
    [48.53234021,-117.2741804,0.1],
    [46.02408726,-121.916440299999,0.1],
    [46.2918003999999,-123.4250831,0.1],
    [46.29442881,-117.9051983,0.3],
    [46.55418369,-123.7285716,0.3],
    [48.40035475,-117.8542701,0.3],
    [48.60182783,-122.96745,0.3],
    [46.18894415,-117.2022851,0.4],
    [47.14003705,-123.7820567,0.4],
    [48.04754642,-123.9226319,0.4],
    [47.75003077,-123.5609704,0.4],
    [46.90022523,-117.5241763,0.4],
    [47.35007586,-123.1863685,0.5],
    [45.87325839,-120.7913598,0.5],
    [46.57756476,-122.3925769,0.5],
    [48.54855019,-119.7387224,0.5],
    [47.12521214,-120.679438999999,0.6],
    [46.98299757,-118.5601734,0.6],
    [46.23040051,-118.4775539,0.6],
    [46.19074721,-122.6782231,0.6],
    [48.14713305,-122.5216407,0.6],
    [47.63479026,-122.6436061,0.7],
    [47.7361335,-119.692937,0.7],
    [46.9291895,-122.829065599999,0.7],
    [47.87046092,-120.6173956,0.7],
    [47.20753737,-119.4500749,0.7],
    [48.48171488,-121.766131,0.7],
    [48.82227976,-121.749001799999,0.8],
    [45.77568046,-122.4829204,0.8],
    [47.62113146,-117.4046494,0.9],
    [46.53351425,-118.9018212,0.9],
    [46.23946995,-119.5120834,0.9],
    [47.03892768,-122.140595799999,0.9],
    [48.04615983,-121.7170703,0.9],
    [46.45738486,-120.738012599999,1],
    [47.49137892,-121.8346131,1]
    ], {
        radius: 45,
        gradient: {0.4: 'blue', 0.65: 'lime', 1: 'red'},
        blur:15, 
        maxZoom: 7
    });


var livemap = new L.map('mapid', {
    layers: [baseLayer]
}).setView([46.99277,-120.99926], 7);

setTimeout(function(){
    livemap.addLayer(heatlayer);
},500)


// var newLayer =  L.tileLayer(
//     "http://api.openweathermap.org/data/2.5/weather?q=Cordova&appid=70af9d70d262ba0c782bab858a01ae95").addTo(livemap);

//Get all the nodes from AJAX call and set on the map
function getStaticNodes() {
    //Ajax call
        $.ajax({url: "http://127.0.0.1:5000/staticnodes", 
        success: function(data){
            console.log(data);
            for (i=0; i<data.data.length; i++) {
            
            if (data.data[i].node_code === "G"){
                circle300 = L.circleMarker(([data.data[i].node_lat, data.data[i].node_long]), 
                { 
                    color: 'orange', 
                    fillColor: 'orange', 
                    fillOpacity: 1 , 
                    radius: 10 
                }).addTo(nodes_map).bindTooltip(data.data[i].node_desc, { permanent: true }).openTooltip();    


                circle300 = L.circleMarker(([data.data[i].node_lat, data.data[i].node_long]), 
                { 
                    color: 'orange', 
                    fillColor: 'orange', 
                    fillOpacity: 1, 
                    radius: 10 
                }).addTo(livemap).bindTooltip(data.data[i].node_desc, { permanent: true }).openTooltip();    


                circle300 = L.circleMarker(([data.data[i].node_lat, data.data[i].node_long]), 
                { 
                    color: 'orange', 
                    fillColor: 'orange', 
                    fillOpacity: 1, 
                    radius: 10 
                }).addTo(generating_units_map).bindTooltip(data.data[i].node_desc, { permanent: true }).openTooltip();
                
                circle300 = L.circleMarker(([data.data[i].node_lat, data.data[i].node_long]), 
                { 
                    color: 'orange', 
                    fillColor: 'orange', 
                    fillOpacity: 1, 
                    radius: 10 
                }).addTo(livemap2).bindTooltip(data.data[i].node_desc, { permanent: true }).openTooltip(); 
                
            }

            if (data.data[i].node_code === "N"){
                // nodes_map
                circle300 = L.circleMarker(([data.data[i].node_lat, data.data[i].node_long]), 
                { 
                    color: 'blue', 
                    fillColor: 'blue', 
                    fillOpacity: 1, 
                    radius: 10 
                }).addTo(nodes_map).bindTooltip(data.data[i].node_desc, { permanent: true }).openTooltip();  
                
                
                // Live Map
                circle300 = L.circleMarker(([data.data[i].node_lat, data.data[i].node_long]), 
                { 
                    color: 'blue', 
                    fillColor: 'blue', 
                    fillOpacity: 1, 
                    radius: 10 
                }).addTo(livemap).bindTooltip(data.data[i].node_desc, { permanent: true }).openTooltip();  

                circle300 = L.circleMarker(([data.data[i].node_lat, data.data[i].node_long]), 
                { 
                    color: 'blue', 
                    fillColor: 'blue', 
                    fillOpacity: 1, 
                    radius: 10 
                }).addTo(livemap2).bindTooltip(data.data[i].node_desc, { permanent: true }).openTooltip();  
            
                
                //loads_map
                circle300 = L.circleMarker(([data.data[i].node_lat, data.data[i].node_long]), 
                { 
                    color: 'blue', 
                    fillColor: 'blue', 
                    fillOpacity: 1, 
                    radius: 10 
                }).addTo(loads_map).bindTooltip(data.data[i].node_desc, { permanent: true }).openTooltip();  
            }

        }
        for(let i=0; i<data.links.length; i++){
            
            if (data.links[i].link_status == 1){
                var edges = L.polyline(
                    [
                        [data.links[i].from_node_lat, data.links[i].from_node_long], 
                        [data.links[i].to_node_lat, data.links[i].to_node_long]
                    ], 
                    {color: 'black' }
                    ).addTo(livemap);
                }
            
            
            if (data.links[i].link_status == 2){
                var edges = L.polyline(
                    [
                        [data.links[i].from_node_lat, data.links[i].from_node_long], 
                        [data.links[i].to_node_lat, data.links[i].to_node_long]
                    ], 
                    {dashArray: "10 10", color: 'black' }
                    ).addTo(livemap);
                }
            
                if (data.links[i].link_status == 3){
                    var edges = L.polyline(
                        [
                            [data.links[i].from_node_lat, data.links[i].from_node_long], 
                            [data.links[i].to_node_lat, data.links[i].to_node_long]
                        ], 
                        {dashArray: "10 10", color: 'red' }
                        ).addTo(livemap);
                    }

            }

        }    
    });
}

getStaticNodes()




// var changing_polyline = L.polyline([
//     [[60.614739, -145.628432], [60.616122, -145.630223]],
//     [[60.614739, -145.628432], [60.616465, -145.629995]],
//     [[60.614739, -145.628432], [60.616483, -145.627432]],
//     [[60.614739, -145.628432], [60.610081, -145.632727]],
//     [[60.610081, -145.632727], [60.597869, -145.663727]]
// ], { color: 'black' }).addTo(livemap);





//Map for Threat and Impact
// var livemap2 = L.map('mapid2').setView([60.614739, -145.628432], 12);
// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 30,
//     //id: 'mapbox/streets-v11',
//     id: 'mapbox/streets-v11',
//     accessToken: 'sk.eyJ1IjoiYW5zaHVtYW5sbnUiLCJhIjoiY2s1N3ZsOGtwMDN2OTNscG9hc3FjcDU5NCJ9.Q5n-6Z_xsReecwKAW4l0Xg'
// }).addTo(livemap2);



// var polylines = L.polyline([
    // [[60.546848, -145.761041], [60.546848, -145.761041]],
    // [[60.543756, -145.760985], [60.546848, -145.761041]],
    // [[60.543756, -145.760985], [60.540457, -145.741037]],
    // [[60.543756, -145.760985], [60.54054, -145.740904]],
    // [[60.546626, -145.758652], [60.541412, -145.757476]],
    // [[60.541412, -145.757476], [60.539322, -145.753094]],
    // [[60.539322, -145.753094], [60.539322, -145.753094]],
    // [[60.539322, -145.753094], [60.539322, -145.753094]],
    // [[60.539322, -145.753094], [60.5405, -145.741037]],
    // [[60.5405, -145.741037], [60.54054, -145.740904]],
    // [[60.537332, -145.666187], [60.531245, -145.647593]],
    // [[60.531245, -145.647593], [60.527245, -145.627593]],
    // [[60.527245, -145.627593], [60.535957, -145.658961]],
    // [[60.535957, -145.658961], [60.537257, -145.659961]],
    // [[60.537257, -145.659961], [60.538594, -145.706188]],
    // [[60.538594, -145.706188], [60.539483, -145.73447]],
    // [[60.539483, -145.73447], [60.539483, -145.73447]],
    // [[60.539483, -145.73447], [60.5405, -145.741037]],
    // [[60.5405, -145.741037], [60.54054, -145.740904]],
    // // [[60.538639, -145.752681], [60.54054, -145.740904]],
    // [[60.539322, -145.753094], [60.535159, -145.773058]],
    // [[60.535159, -145.773058], [60.532345, -145.778623]],
    // [[60.532345, -145.778623], [60.527345, -145.781623]],
    // [[60.527345, -145.781623], [60.524323, -145.784216]],
    // [[60.597869, -145.663727], [60.556121, -145.753738]], // 205 - 300
    // [[60.556121, -145.753738], [60.54054, -145.740904]], // 300 - 400
    // [[60.556121, -145.753738], [60.55604, -145.7538]],
    // [[60.55604, -145.7538], [60.54728, -145.763625]], // 507 - 514
    // [[60.54875, -145.763994], [60.54728, -145.763625]], // 514-518
    // [[60.54875, -145.763994], [60.550438, -145.760331]], // 518-526
    // [[60.543419, -145.752657], [60.544636, - 145.757055]], //620-627
    // [[60.542419, -145.752657], [60.543419, -145.752657]], //614-620
    // [[60.54319, -145.74179], [60.542419, -145.752657]], //612-614
    // [[60.54319, -145.74179], [60.54319, -145.74179]], //608-612
    // [[60.5405, -145.741037], [60.54319, -145.74179]], //606-608
    // [[60.54054, -145.740904], [60.5405, -145.741037]], // 400-606
    // [[60.547613, -145.765318], [60.546848, -145.761041]],
    // [[60.614739, -145.628432], [60.616122, -145.630223]],
    // [[60.614739, -145.628432], [60.616465, -145.629995]],
    // [[60.614739, -145.628432], [60.616483, -145.627432]],
    // [[60.614739, -145.628432], [60.610081, -145.632727]],
    // [[60.610081, -145.632727], [60.597869, -145.663727]],
    // [[60.55604, -145.7538], [60.54728, -145.763625]],
    // [[60.54875, -145.763994], [60.54728, -145.763625]],
    // [[60.54875, -145.763994], [60.550438, -145.760331]],
    // [[60.544636, -145.757055], [60.543419, -145.752657]],
    // [[60.542419, -145.752657], [60.543419, -145.752657]],
    // [[60.542419, -145.752657], [60.54319, -145.74179]],
    // [[60.54319, -145.74179], [60.54319, -145.74179]],
    // [[60.54319, -145.74179], [60.5405, -145.741037]],
    // [[60.5405, -145.741037], [60.54054, -145.740904]],
    // [[60.583697, -145.630038], [60.54054, -145.740904]]
// ], { color: 'black' }).addTo(livemap2);






//**************Decision Pre Maps*****************//
// var decision_pre_map = L.map('decision-mapid').setView([60.614739, -145.628432], 11);
// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 30,
//     //id: 'mapbox/streets-v11',
//     id: 'mapbox/streets-v11',
//     accessToken: 'sk.eyJ1IjoiYW5zaHVtYW5sbnUiLCJhIjoiY2s1N3ZsOGtwMDN2OTNscG9hc3FjcDU5NCJ9.Q5n-6Z_xsReecwKAW4l0Xg'
// }).addTo(decision_pre_map);


// var polylines = L.polyline([
//     [[60.546848, -145.761041], [60.546848, -145.761041]],
//     [[60.543756, -145.760985], [60.546848, -145.761041]],
//     [[60.543756, -145.760985], [60.540457, -145.741037]],
//     [[60.543756, -145.760985], [60.54054, -145.740904]],
//     [[60.546626, -145.758652], [60.541412, -145.757476]],
//     [[60.541412, -145.757476], [60.539322, -145.753094]],
//     [[60.539322, -145.753094], [60.539322, -145.753094]],
//     [[60.539322, -145.753094], [60.539322, -145.753094]],
//     [[60.539322, -145.753094], [60.5405, -145.741037]],
//     [[60.5405, -145.741037], [60.54054, -145.740904]],
//     [[60.537332, -145.666187], [60.531245, -145.647593]],
//     [[60.531245, -145.647593], [60.527245, -145.627593]],
//     [[60.527245, -145.627593], [60.535957, -145.658961]],
//     [[60.535957, -145.658961], [60.537257, -145.659961]],
//     [[60.537257, -145.659961], [60.538594, -145.706188]],
//     [[60.538594, -145.706188], [60.539483, -145.73447]],
//     [[60.539483, -145.73447], [60.539483, -145.73447]],
//     [[60.539483, -145.73447], [60.5405, -145.741037]],
//     [[60.5405, -145.741037], [60.54054, -145.740904]],
//     // [[60.538639, -145.752681], [60.54054, -145.740904]],
//     [[60.539322, -145.753094], [60.535159, -145.773058]],
//     [[60.535159, -145.773058], [60.532345, -145.778623]],
//     [[60.532345, -145.778623], [60.527345, -145.781623]],
//     [[60.527345, -145.781623], [60.524323, -145.784216]],
//     [[60.597869, -145.663727], [60.556121, -145.753738]], // 205 - 300
//     [[60.556121, -145.753738], [60.54054, -145.740904]], // 300 - 400
//     [[60.556121, -145.753738], [60.55604, -145.7538]],
//     [[60.55604, -145.7538], [60.54728, -145.763625]], // 507 - 514
//     [[60.54875, -145.763994], [60.54728, -145.763625]], // 514-518
//     [[60.54875, -145.763994], [60.550438, -145.760331]], // 518-526
//     [[60.543419, -145.752657], [60.544636, - 145.757055]], //620-627
//     [[60.542419, -145.752657], [60.543419, -145.752657]], //614-620
//     [[60.54319, -145.74179], [60.542419, -145.752657]], //612-614
//     [[60.54319, -145.74179], [60.54319, -145.74179]], //608-612
//     [[60.5405, -145.741037], [60.54319, -145.74179]], //606-608
//     [[60.54054, -145.740904], [60.5405, -145.741037]], // 400-606
//     [[60.547613, -145.765318], [60.546848, -145.761041]],
//     [[60.614739, -145.628432], [60.616122, -145.630223]],
//     [[60.614739, -145.628432], [60.616465, -145.629995]],
//     [[60.614739, -145.628432], [60.616483, -145.627432]],
//     [[60.614739, -145.628432], [60.610081, -145.632727]],
//     [[60.610081, -145.632727], [60.597869, -145.663727]],
//     [[60.55604, -145.7538], [60.54728, -145.763625]],
//     [[60.54875, -145.763994], [60.54728, -145.763625]],
//     [[60.54875, -145.763994], [60.550438, -145.760331]],
//     [[60.544636, -145.757055], [60.543419, -145.752657]],
//     [[60.542419, -145.752657], [60.543419, -145.752657]],
//     [[60.542419, -145.752657], [60.54319, -145.74179]],
//     [[60.54319, -145.74179], [60.54319, -145.74179]],
//     [[60.54319, -145.74179], [60.5405, -145.741037]],
//     [[60.5405, -145.741037], [60.54054, -145.740904]],
//     [[60.583697, -145.630038], [60.54054, -145.740904]]
// ], { color: 'black' }).addTo(decision_pre_map);

// polylines.addTo(decision_pre_map);


//**************Planning Pre Maps*****************//
// var planning_pre_map = L.map('planning-pre-map').setView([46.7298, -117.1817], 7);
// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 30,
//     //id: 'mapbox/streets-v11',
//     id: 'mapbox/streets-v11',
//     accessToken: 'sk.eyJ1IjoiYW5zaHVtYW5sbnUiLCJhIjoiY2s1N3ZsOGtwMDN2OTNscG9hc3FjcDU5NCJ9.Q5n-6Z_xsReecwKAW4l0Xg'
// }).addTo(planning_pre_map);


//**************Planning During Maps************//
// var planning_during_map = L.map('planning-during-mapid').setView([60.542419, -145.752657], 13);
// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 30,
//     //id: 'mapbox/streets-v11',
//     id: 'mapbox/streets-v11',
//     accessToken: 'sk.eyJ1IjoiYW5zaHVtYW5sbnUiLCJhIjoiY2s1N3ZsOGtwMDN2OTNscG9hc3FjcDU5NCJ9.Q5n-6Z_xsReecwKAW4l0Xg'
// }).addTo(planning_during_map);


//******************Network Details Map*************************** */
// var nodes_map = L.map('nodes_map').setView([60.585037, -145.626264], 11);
// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 30,
//     //id: 'mapbox/streets-v11',
//     id: 'mapbox/streets-v11',
//     accessToken: 'sk.eyJ1IjoiYW5zaHVtYW5sbnUiLCJhIjoiY2s1N3ZsOGtwMDN2OTNscG9hc3FjcDU5NCJ9.Q5n-6Z_xsReecwKAW4l0Xg'
// }).addTo(nodes_map);



// var polylines = L.polyline([
    // [[60.546848, -145.761041], [60.546848, -145.761041]],
    // [[60.543756, -145.760985], [60.546848, -145.761041]],
    // [[60.543756, -145.760985], [60.540457, -145.741037]],
    // [[60.543756, -145.760985], [60.54054, -145.740904]],
    // [[60.546626, -145.758652], [60.541412, -145.757476]],
    // [[60.541412, -145.757476], [60.539322, -145.753094]],
    // [[60.539322, -145.753094], [60.539322, -145.753094]],
    // [[60.539322, -145.753094], [60.539322, -145.753094]],
    // [[60.539322, -145.753094], [60.5405, -145.741037]],
    // [[60.5405, -145.741037], [60.54054, -145.740904]],
    // [[60.537332, -145.666187], [60.531245, -145.647593]],
    // [[60.531245, -145.647593], [60.527245, -145.627593]],
    // [[60.527245, -145.627593], [60.535957, -145.658961]],
    // [[60.535957, -145.658961], [60.537257, -145.659961]],
    // [[60.537257, -145.659961], [60.538594, -145.706188]],
    // [[60.538594, -145.706188], [60.539483, -145.73447]],
    // [[60.539483, -145.73447], [60.539483, -145.73447]],
    // [[60.539483, -145.73447], [60.5405, -145.741037]],
    // [[60.5405, -145.741037], [60.54054, -145.740904]],
    // // [[60.538639, -145.752681], [60.54054, -145.740904]],
    // [[60.539322, -145.753094], [60.535159, -145.773058]],
    // [[60.535159, -145.773058], [60.532345, -145.778623]],
    // [[60.532345, -145.778623], [60.527345, -145.781623]],
    // [[60.527345, -145.781623], [60.524323, -145.784216]],
    // [[60.597869, -145.663727], [60.556121, -145.753738]], // 205 - 300
    // [[60.556121, -145.753738], [60.54054, -145.740904]], // 300 - 400
    // [[60.556121, -145.753738], [60.55604, -145.7538]],
    // [[60.55604, -145.7538], [60.54728, -145.763625]], // 507 - 514
    // [[60.54875, -145.763994], [60.54728, -145.763625]], // 514-518
    // [[60.54875, -145.763994], [60.550438, -145.760331]], // 518-526
    // [[60.543419, -145.752657], [60.544636, - 145.757055]], //620-627
    // [[60.542419, -145.752657], [60.543419, -145.752657]], //614-620
    // [[60.54319, -145.74179], [60.542419, -145.752657]], //612-614
    // [[60.54319, -145.74179], [60.54319, -145.74179]], //608-612
    // [[60.5405, -145.741037], [60.54319, -145.74179]], //606-608
    // [[60.54054, -145.740904], [60.5405, -145.741037]], // 400-606
    // [[60.547613, -145.765318], [60.546848, -145.761041]],
    // [[60.614739, -145.628432], [60.616122, -145.630223]],
    // [[60.614739, -145.628432], [60.616465, -145.629995]],
    // [[60.614739, -145.628432], [60.616483, -145.627432]],
    // [[60.614739, -145.628432], [60.610081, -145.632727]],
    // [[60.610081, -145.632727], [60.597869, -145.663727]],
    // [[60.55604, -145.7538], [60.54728, -145.763625]],
    // [[60.54875, -145.763994], [60.54728, -145.763625]],
    // [[60.54875, -145.763994], [60.550438, -145.760331]],
    // [[60.544636, -145.757055], [60.543419, -145.752657]],
    // [[60.542419, -145.752657], [60.543419, -145.752657]],
    // [[60.542419, -145.752657], [60.54319, -145.74179]],
    // [[60.54319, -145.74179], [60.54319, -145.74179]],
    // [[60.54319, -145.74179], [60.5405, -145.741037]],
    // [[60.5405, -145.741037], [60.54054, -145.740904]],
    // [[60.583697, -145.630038], [60.54054, -145.740904]]
// ], { color: 'black' }).addTo(nodes_map);

// polylines.addTo(nodes_map);


var greenIcon = L.icon({
    iconUrl: 'static/img/icon.png',
    // shadowUrl: 'leaf-shadow.png',

    iconSize: [35, 35], // size of the icon
    // shadowSize:   [50, 64], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    // shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

// *************************Generating Units Map********************************

// var generating_units_map = L.map('generating_units_map').setView([60.585037, -145.626264], 11);
// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 30,
//     //id: 'mapbox/streets-v11',
//     id: 'mapbox/streets-v11',
//     accessToken: 'sk.eyJ1IjoiYW5zaHVtYW5sbnUiLCJhIjoiY2s1N3ZsOGtwMDN2OTNscG9hc3FjcDU5NCJ9.Q5n-6Z_xsReecwKAW4l0Xg'
// }).addTo(generating_units_map);


// **********************Loads Map***********************************

// var loads_map = L.map('loads_map').setView([60.585037, -145.626264], 10);
// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 30,
//     //id: 'mapbox/streets-v11',
//     id: 'mapbox/streets-v11',
//     accessToken: 'sk.eyJ1IjoiYW5zaHVtYW5sbnUiLCJhIjoiY2s1N3ZsOGtwMDN2OTNscG9hc3FjcDU5NCJ9.Q5n-6Z_xsReecwKAW4l0Xg'
// }).addTo(loads_map);




// $("a[href='#runtimescore']").on('shown.bs.tab', function (e) {
//     livemap.invalidateSize();
// });

// $("a[href='#loads']").on('shown.bs.tab', function (e) {
//     loads_map.invalidateSize();
// });

// $("a[href='#netdetails']").on('shown.bs.tab', function (e) {
//     nodes_map.invalidateSize();
// });

// $("a[href='#generatingunits']").on('shown.bs.tab', function (e) {
//     generating_units_map.invalidateSize();
// });

// $("a[href='#Real-Time']").on('shown.bs.tab', function (e) {
//     livemap.invalidateSize();
// });

// $("a[href='#threatimpact2']").on('shown.bs.tab', function (e) {
//     livemap2.invalidateSize();
// });

// $("a[href='#decision']").on('shown.bs.tab', function (e) {
//     decision_pre_map.invalidateSize();
// });

// $("a[href='#planning']").on('shown.bs.tab', function (e) {
//     planning_pre_map.invalidateSize();
// });

// $("a[href='#planning-during']").on('shown.bs.tab', function (e) {
//     planning_during_map.invalidateSize();
// });


$(document).ready(function () {

    const config = {
        type: 'line',
        // scaleOverride: true,
        // // scaleSteps: 10,
        // scaleStepWidth: 20,
        data: {
            labels: [],
            datasets: [{
                label: "Resiliency Score",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [],
                fill: false,
            }],
        },
        options: {
            // responsive: true,
            // maintainAspectRatio: false,
            // animation: {

            //     onComplete: function (animation) {
            //         var sourceCanvas = lineChart.chart.canvas;
            //         var copyWidth = lineChart.scales['y-axis-0'].width;
            //         var copyHeight = lineChart.scales['y-axis-0'].height + lineChart.scales['y-axis-0'].top;
            //         var targetCtx = document.getElementById("myChartAxis").getContext("2d");
            //         targetCtx.canvas.width = copyWidth;
            //         targetCtx.drawImage(sourceCanvas, 0, 0, copyWidth, copyHeight, 0, 0, copyWidth, copyHeight);
            //     }
            // },
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
                        type: 'realtime',
                        // distribution: 'series',
                        realtime: {
                            // duration: 1000,
                            // refresh: 1000,
                            // ttl: 60000,
                            delay: 6000,
                            // onRefresh: onRefresh
                        },
                        // gridLines: {
                        //     display: false
                        // }
                    },

                    ],
                // [{
                //     display: true,
                //     scaleLabel: {
                //         display: true,
                //         labelString: 'Influence Factors'
                //     }
                // }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: 1
                    },

                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    },
                    // gridLines: {
                    //     display: false
                    // }
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
                        labelString: 'Influence Factor Value'
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
        // if (config.data.labels.length == 5) {
        //     config.data.labels.shift();
        //     config.data.datasets[0].data.shift();
        // }
        // config.data.labels.push(data.time);

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

        cell1.innerHTML = data.time;
        cell2.innerHTML = data.tf;
        cell3.innerHTML = data.clnl;
        cell4.innerHTML = data.dcl;
        cell5.innerHTML = data.rg;
        // cell6.innerHTML = data.rf;
        cell6.innerHTML = data.tif;
        cell7.innerHTML = data.resiliency;
    }

});




//Decision Page Charts
var decisionctx1 = document.getElementById('decision-pre-barchart').getContext('2d');
var decision_pre_barChart = new Chart(decisionctx1, {
    type: 'line',
    data: {
        labels: ['1', '5', '10'],
        datasets: [{
            label: 'Without Proactive control',
            fill: false,
            backgroundColor: "red",
            borderColor: "red",
            data: [0.95, 0.95, 0.7],
        },
        {
            label: 'With Proative control',
            fill: false,
            backgroundColor: "orange",
            borderColor: "orange",
            data: [0.95, 0.95, 0.85],
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
                    labelString: 'Resiliency Value'
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Time'
                }
            }],
        }
    }
});

// Chart.defaults.global.legend.labels.usePointStyle = true;
// var decisionctx2 = document.getElementById('decision-pre-linechart').getContext('2d');
// var decision_pre_lineChart = new Chart(decisionctx2, {
//     type: 'bar',
//     data: {
//         labels: ['TF', 'RG', 'TIF', 'DCL', 'CLNL'],
//         datasets: [{
//             label: "Without Proactive Control",
//             backgroundColor: "red",
//             data: [0.91, 0.6, 0.8, 0.75, 0.8]
//         }, {
//             label: "With Proactive Control",
//             backgroundColor: "orange",
//             data: [0.8, 0.72, 0.8, 0.82, 0.87]
//         }
//         ]
//     },
//     options: {
//         legend: {
//             display: true
//         },
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true,
//                     max: 1
//                 },
//                 scaleLabel: {
//                     display: true,
//                     labelString: 'Influence Factor Value'
//                 }
//             }],
//             xAxes: [{
//                 scaleLabel: {
//                     display: true,
//                     labelString: 'Influence Factor'
//                 }
//             }],
//         }
//     }
// });


//Planning During Event Charts
var planningctx1 = document.getElementById('planning-during-barchart').getContext('2d');
var planning_during_barChart = new Chart(planningctx1, {
    type: 'line',
    data: {
        labels: ['5', '10'],
        datasets: [{
            label: 'Line chart',
            fill: false,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            data: [0.9, 0.7],
        }]
    },
    options: {
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
                    labelString: 'Resiliency Value'
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Time'
                }
            }],
        }
    }
});


var planningctx2 = document.getElementById('planning-during-linechart').getContext('2d');
var planning_pre_lineChart = new Chart(planningctx2, {
    type: 'line',
    data: {
        labels: ['5', '10'],
        datasets: [{
            label: 'Line chart',
            fill: false,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            data: [0.9, 0.7],
        }]
    },
    options: {
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
                    labelString: 'Resiliency Value'
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Time'
                }
            }],
        }
    }
});


var decisionctx2 = document.getElementById('decision-during-linechart').getContext('2d');
var decision_during_lineChart = new Chart(decisionctx2, {
    type: 'line',
    data: {
        labels: ['5', '10'],
        datasets: [{
            label: '',
            fill: false,
            data: [0.85, 0.65, 0.75],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 4
        }]
    },
    options: {
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
                    labelString: 'Influence Factor Value'
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Time'
                }
            }],
        }
    }
});




//Decision Page Charts
var decisionctx1 = document.getElementById('decision-pre-barchart').getContext('2d');
var decision_pre_barChart = new Chart(decisionctx1, {
    type: 'line',
    data: {
        labels: ['1', '2', '3', '4', '5', '6'],
        datasets: [{
            label: 'Economic Mode',
            fill: false,
            backgroundColor: "red",
            borderColor: "red",
            data: [1, 0.98, 0.8, 0.38, 0.28, 0.2],
        },
        {
            label: 'Resilient Mode',
            fill: false,
            backgroundColor: "orange",
            borderColor: "orange",
            data: [1, 1, 1, 0.52, 0.41, 0.35]
            // borderDash: [10, 5]
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
                    labelString: 'Resiliency Value'
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Time(Hours)'
                }
            }],
        }
    }
});

//Decision Post Tab
var decisionPost1 = document.getElementById('decision-post-chart').getContext('2d');
var decision_post_barChart = new Chart(decisionPost1, {
    type: 'line',
    data: {
        labels: ['1', '2', '3', '4', '5', '6'],
        datasets: [{
            label: 'Economic Mode',
            fill: false,
            backgroundColor: "red",
            borderColor: "red",
            data: [1, 0.98, 0.8, 0.38, 0.28, 0.2],
        },
        {
            label: 'Resilient Mode',
            fill: false,
            backgroundColor: "orange",
            borderColor: "orange",
            data: [1, 1, 1, 0.52, 0.41, 0.35]
            // borderDash: [10, 5]
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
                    labelString: 'Resiliency Value'
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Time(Hours)'
                }
            }],
        }
    }
});



// Chart.defaults.global.legend.labels.usePointStyle = true;
// var decisionctx2 = document.getElementById('decision-pre-linechart').getContext('2d');
// var decision_pre_lineChart = new Chart(decisionctx2, {
//     type: 'bar',
//     data: {
//         labels: ['1', '2', '3', '4', '5', '6'],
//         datasets: [{
//             label: "CLNL",
//             backgroundColor: "green",
//             data: [1, 1, 1, 0.74, 0.74, 0.75]
//         }, {
//             label: "Generation",
//             backgroundColor: "orange",
//             data: [0.62, 0.6, 0.6, 0.22, 0.22, 0.22]
//         }, {
//             label: "CLD",
//             backgroundColor: "blue",
//             data: [0.3, 0.3, 0.3, 0.3, 0.3, 0.3,]
//         }, {
//             label: "TIF",
//             backgroundColor: "red",
//             data: [0, 0, 0, 0.60, 0.70, 0.70]
//         }, {
//             label: "SOC",
//             backgroundColor: "#003f5c",
//             data: [0.9, 0.32, 0.23, 0.2, 0.2, 0.2]
//         }
//         ]
//     },
//     options: {
//         title: {
//             display: false,
//             text: 'Economic Mode'
//         },
//         legend: {
//             display: true
//         },
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true,
//                     max: 1
//                 },
//                 scaleLabel: {
//                     display: true,
//                     labelString: 'Influence Factor Value (Economic)'
//                 }
//             }],
//             xAxes: [{
//                 scaleLabel: {
//                     display: true,
//                     labelString: 'Time(Hours)'
//                 }
//             }],
//         }
//     }
// });




//Decision Resilient Mode Chart
// var decisionres = document.getElementById('decision-resilientmode-barchart').getContext('2d');
// var decision_resilientmode_barchart = new Chart(decisionres, {
//     type: 'bar',
//     data: {
//         labels: ['1', '2', '3', '4', '5', '6'],
//         datasets: [{
//             label: "CLNL",
//             backgroundColor: "green",
//             data: [1, 1, 1, 1, 0.93, 0.83]
//         }, {
//             label: "Generation",
//             backgroundColor: "orange",
//             data: [0.6, 0.6, 0.6, 0.3, 0.28, 0.25]
//         }, {
//             label: "CLD",
//             backgroundColor: "blue",
//             data: [0.3, 0.3, 0.3, 0.3, 0.3, 0.3,]
//         }, {
//             label: "TIF",
//             backgroundColor: "red",
//             data: [0, 0, 0, 0.60, 0.70, 0.70]
//         }, {
//             label: "SOC",
//             backgroundColor: "#003f5c",
//             data: [0.9, 0.98, 0.1, 0.1, 0.4, 0.2]
//         }
//         ]
//     },
//     options: {
//         title: {
//             display: false,
//             text: 'Economic Mode'
//         },
//         legend: {
//             display: true
//         },
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true,
//                     max: 1
//                 },
//                 scaleLabel: {
//                     display: true,
//                     labelString: 'Influence Factor Value (Resilient)'
//                 }
//             }],
//             xAxes: [{
//                 scaleLabel: {
//                     display: true,
//                     labelString: 'Time(Hours)'
//                 }
//             }],
//         }
//     }
// });

//Decision Post-linechart
// var decisionpostctx2 = document.getElementById('decision-post-linechart').getContext('2d');
// var decision_during_lineChart = new Chart(decisionpostctx2, {
//     type: 'line',
//     data: {
//         labels: ['10', '20'],
//         datasets: [{
//             fill: false,
//             label: '',
//             data: [0.7, 0.85],
//             // backgroundColor: [
//             //     'rgba(255, 99, 132, 0.2)',

//             // ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',

//             ],
//             borderWidth: 4
//         }]
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
//                     labelString: 'Resiliency Value'
//                 }
//             }],
//             xAxes: [{
//                 scaleLabel: {
//                     display: true,
//                     labelString: 'Time'
//                 }
//             }],
//         }
//     }
// });


// Animation
// var index = 0;
// var id = setInterval(function () {
//     heat_threat.addLatLng(address[index++]);
//     if (index >= address.length - 1) { clearInterval(id); }
// }, 5000);


// var heat_decision = L.heatLayer([], {
//     minOpacity: 0.8,
//     radius: 50,
//     blur: 10,
//     gradient: {
//         0.45: "rgb(0,0,255)",
//         0.55: "rgb(0,255,255)",
//         0.65: "rgb(0,255,0)",
//         0.95: "rgb(255,255,0)",
//         1.0: "rgb(255,0,0)"
//     }
// }).addTo(decision_pre_map);

// Animation
// var index2 = 0;
// var id2 = setInterval(function () {
//     heat_decision.addLatLng(address[index2++]);
//     if (index2 >= address.length - 1) { clearInterval(id2); }
// }, 5000);



//Decision During Map
// var decision_during_map = L.map('decision-during-mapid').setView([46.7298, -117.1817], 7);
// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 30,
//     id: 'mapbox/streets-v11',
//     accessToken: 'sk.eyJ1IjoiYW5zaHVtYW5sbnUiLCJhIjoiY2s1N3ZsOGtwMDN2OTNscG9hc3FjcDU5NCJ9.Q5n-6Z_xsReecwKAW4l0Xg'
// }).addTo(decision_during_map);
