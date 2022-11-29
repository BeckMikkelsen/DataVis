let map = L.map('map').setView([40.75698534549325, -73.96264966442157], 11);

// let tiles = L.tileLayer.grayscale('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);

let tiles = L.tileLayer('https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
	attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	minZoom: 0,
	maxZoom: 19,
	subdomains: 'abcd',
	accessToken: '1Hsl3ZsFhaMm2rkHgynrVDUZQjgoqe5Tk40QdK6mThib3iS8A6kPm3BYVxH8GnsW'
}).addTo(map);

let selected, emptySelect;
let zoneName = {"zone":{"0":"Alphabet City","1":"Astoria","2":"Astoria Park","3":"Bloomingdale","4":"Battery Park","5":"Battery Park City","6":"Boerum Hill","7":"Bedford","8":"Brooklyn Heights","9":"Brooklyn Navy Yard","10":"Bushwick North","11":"Bushwick South","12":"Carroll Gardens","13":"Central Harlem","14":"Chinatown","15":"Central Harlem North","16":"Central Park","17":"Claremont\/Bathgate","18":"Clinton East","19":"Clinton Hill","20":"Clinton West","21":"Cobble Hill","22":"Columbia Street","23":"Crotona Park","24":"Crotona Park East","25":"Crown Heights North","26":"Crown Heights South","27":"Downtown Brooklyn\/MetroTech","28":"DUMBO\/Vinegar Hill","29":"East Chelsea","30":"East Concourse\/Concourse Village","31":"East Village","32":"East Williamsburg","33":"East Harlem North","34":"East Harlem South","35":"Financial District North","36":"Financial District South","37":"Flatiron","38":"Hudson Sq","39":"Fordham South","40":"Fort Greene","41":"Garment District","42":"Gowanus","43":"Gramercy","44":"Greenpoint","45":"Greenwich Village North","46":"Greenwich Village South","47":"Hamilton Heights","48":"Highbridge","49":"Highbridge Park","50":"Hunts Point","51":"Inwood","52":"Inwood Hill Park","53":"Manhattan Valley","54":"Lenox Hill East","55":"Kingsbridge Heights","56":"Kips Bay","57":"Lenox Hill West","58":"Lincoln Square East","59":"Manhattanville","60":"Lincoln Square West","61":"Little Italy\/NoLiTa","62":"Long Island City\/Hunters Point","63":"Long Island City\/Queens Plaza","64":"Longwood","65":"Lower East Side","66":"Melrose South","67":"Meatpacking\/West Village West","68":"Midtown Center","69":"Midtown East","70":"Midtown North","71":"Midtown South","72":"Murray Hill","73":"Morningside Heights","74":"Morrisania\/Melrose","75":"Mott Haven\/Port Morris","76":"Mount Hope","77":"Old Astoria","78":"Ocean Hill","79":"Park Slope","80":"Penn Station\/Madison Sq West","81":"Prospect Heights","82":"Prospect Park","83":"Prospect-Lefferts Gardens","84":"Queensbridge\/Ravenswood","85":"Randalls Island","86":"Red Hook","87":"Ridgewood","88":"Roosevelt Island","89":"Seaport","90":"SoHo","91":"South Williamsburg","92":"Stuyvesant Heights","93":"Stuy Town\/Peter Cooper Village","94":"Sunnyside","95":"Steinway","96":"Sunset Park West","97":"Sutton Place\/Turtle Bay North","98":"Times Sq\/Theatre District","99":"TriBeCa\/Civic Center","100":"Upper West Side South","101":"Two Bridges\/Seward Park","102":"UN\/Turtle Bay South","103":"Union Sq","104":"University Heights\/Morris Heights","105":"Upper East Side North","106":"Upper East Side South","107":"Upper West Side North","108":"Yorkville West","109":"Washington Heights North","110":"Washington Heights South","111":"West Chelsea\/Hudson Yards","112":"West Concourse","113":"West Village","114":"Williamsburg (North Side)","115":"Williamsburg (South Side)","116":"World Trade Center","117":"Yorkville East"},"LocationID":{"0":4,"1":7,"2":8,"3":24,"4":12,"5":13,"6":25,"7":17,"8":33,"9":34,"10":36,"11":37,"12":40,"13":41,"14":45,"15":42,"16":43,"17":47,"18":48,"19":49,"20":50,"21":52,"22":54,"23":59,"24":60,"25":61,"26":62,"27":65,"28":66,"29":68,"30":69,"31":79,"32":80,"33":74,"34":75,"35":87,"36":88,"37":90,"38":125,"39":94,"40":97,"41":100,"42":106,"43":107,"44":112,"45":113,"46":114,"47":116,"48":119,"49":120,"50":126,"51":127,"52":128,"53":151,"54":140,"55":136,"56":137,"57":141,"58":142,"59":152,"60":143,"61":144,"62":145,"63":146,"64":147,"65":148,"66":159,"67":158,"68":161,"69":162,"70":163,"71":164,"72":170,"73":166,"74":167,"75":168,"76":169,"77":179,"78":177,"79":181,"80":186,"81":189,"82":190,"83":188,"84":193,"85":194,"86":195,"87":198,"88":202,"89":209,"90":211,"91":217,"92":225,"93":224,"94":226,"95":223,"96":228,"97":229,"98":230,"99":231,"100":239,"101":232,"102":233,"103":234,"104":235,"105":236,"106":237,"107":238,"108":263,"109":243,"110":244,"111":246,"112":247,"113":249,"114":255,"115":256,"116":261,"117":262}} 
let relevantZones = [4, 7, 8, 12, 13, 17, 24, 25, 33, 34, 36, 37, 40, 41, 42, 43, 45, 47, 48, 49, 50, 52, 54, 59, 60, 61, 62, 65, 66, 68, 69, 74, 75, 79, 80, 87, 88, 90, 94, 97, 100, 106, 107, 112, 113, 114, 116, 119, 120, 125, 126, 127, 128, 136, 137, 140, 141, 142, 143, 144, 145, 146, 147, 148, 151, 152, 158, 159, 161, 162, 163, 164, 166, 167, 168, 169, 170, 177, 179, 181, 186, 188, 189, 190, 193, 194, 195, 198, 202, 209, 211, 217, 223, 224, 225, 226, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 243, 244, 246, 247, 249, 255, 256, 261, 262, 263]
let high = document.getElementById("inputhigh").value;
let middle =document.getElementById("inputmiddle").value; 
let low = document.getElementById("inputlow").value;
let bivariateColorArray2 =["#d3d3d3", "#cac4a8", "#c0b37e", "#b6a352", "#bbafc2", "#b2a29b", "#aa9473", "#a1874b", "#a38bb1", "#9c818d", "#947669", "#8c6b44", "#8b689f", "#85607f", "#7f585f", "#78503e"]
let bivariateColorArray = ["rgb(211, 211, 211)", "rgb(202, 196, 168)", "rgb(192, 179, 126)", "rgb(182, 163, 82)", "rgb(187, 175, 194)", "rgb(178, 162, 155)", "rgb(170, 148, 115)", "rgb(161, 135, 75)", "rgb(163, 139, 177)", "rgb(156, 129, 141)", "rgb(148, 118, 105)", "rgb(140, 107, 68)", "rgb(139, 104, 159)", "rgb(133, 96, 127)", "rgb(127, 88, 95)", "rgb(120, 80, 62)"]

// TODO: create bivariate color scale
function getBivariateColor2(bike, taxi) {
    return  bike > high && taxi > high       ? bivariateColorArray[15] :
            (bike > middle && taxi > high)   ? bivariateColorArray[11] :
            (bike > low && taxi > high)      ? bivariateColorArray[7] :
            taxi > high                      ? bivariateColorArray[3] : 
            (bike > high && taxi > middle)   ? bivariateColorArray[14] :
            (bike > high && taxi > low)      ? bivariateColorArray[13] :
            bike > high                      ? bivariateColorArray[12] :
            (bike > middle && taxi > middle) ? bivariateColorArray[10] :
            (bike > low && taxi > middle)    ? bivariateColorArray[6] :
            taxi > middle                    ? bivariateColorArray[2] :
            (bike > middle && taxi > low)    ? bivariateColorArray[9] :
            (bike < low && taxi < low)       ? bivariateColorArray[5]:
            bike > middle                    ? bivariateColorArray[8] :
            taxi > low                       ? bivariateColorArray[1] :
            bike > low                       ? bivariateColorArray[4] : 
            bivariateColorArray[0] // if none of the above
}


// TODO: create bivariate color scale
function getBivariateColor(bike, taxi) {
    return  bike > high && taxi > high       ? '#804d36' :
            (bike > middle && taxi > high)   ? '#af8e53' :
            (bike > low && taxi > high)      ? '#c8b35a' :
            (bike > high && taxi > middle)   ? '#976b82' :
            (bike > high && taxi > low)      ? '#9972af' :
            (bike > middle && taxi > middle) ? '#af8e53' :
            (bike > low && taxi > middle)    ? '#e4d9ac' :
            (bike > middle && taxi > low)    ? '#cbb8d7' :
            '#e8e8e8' // if none of the above: (bike > low && taxi > low) 
}

function style(feature) {
    return {
        fillColor: '#e8e8e8',
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.5
    };
}

function highlightFeature(selected) {
    selected.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.8,
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
         selected.bringToFront();
    }
}
//L.geoJson(geojsonFeature, {style: style}).addTo(map);

function getSelectedData(selected, data_json) {
    let loc_id = selected.feature.properties.location_id

    return data_json[getIndexOfLocID(loc_id)]

}

function getIndexOfLocID(locID) {
    for (let i=0; i < relevantZones.length; i++) {
        if (relevantZones[i] == locID) {
            return i
        }
    }
    return 0
}


function onEachFeature(feature, layer) {
    biketripsPath = '../data/tripdata/biketrips.json'
    taxitrips_path = '../data/tripdata/taxitrips.json'
    // Get the
    fetch(biketripsPath).then(bike_json => bike_json.json()).then(bike_json => {
        fetch(taxitrips_path).then(taxi_json => taxi_json.json()).then(taxi_json => {
            layer.on('click',function(e) {
                if (selected) {
                    geojson.resetStyle(selected)
                }
                if (selected == e.target){
                    geojson.resetStyle(e.target)
                    geojson.eachLayer(function(layer){geojson.resetStyle(layer)})
                    selected = emptySelect
                    return
                } 
                
                high = document.getElementById("inputhigh").value;
                middle =document.getElementById("inputmiddle").value; 
                low = document.getElementById("inputlow").value;

                selected = e.target;
                
                locID = selected.feature.properties.location_id

                index = getIndexOfLocID(locID)

                highlightFeature(selected);
                
                document.getElementById("heading").innerHTML = "Showing data for " + zoneName.zone[index] + " with zone id: " + locID;
                let count =0
                let bikeColumn = getSelectedData(selected, bike_json)
                let taxiColumn = getSelectedData(selected, taxi_json)
                outgoingBike = bike_json.outgoing[index]
                outgoingTaxi = taxi_json.outgoing[index]
                
                

                geojson.eachLayer(function(layer){
                    layer.setStyle({
                        fillColor: getBivariateColor2(
                            bikeColumn[count]/outgoingBike, taxiColumn[count]/outgoingTaxi
                        )
                    });

                    count++;
                })
                highlightFeature(selected);

                


                locID = selected.feature.properties.location_id
                
                spec.data = {"name": "myData", "url": "http://0.0.0.0:8000/data/dataforeachzoneid/weekday_locidindex" + getIndexOfLocID(locID) + ".csv"}

                vegaEmbed('#dataviz', spec)
                
                spec2.data = {"name": "myData", "url": "http://0.0.0.0:8000/data/duration/all/bike/bikedata_duration_" + getIndexOfLocID(locID) + ".csv"}

                vegaEmbed('#dataviz2', spec2)
            })
            layer.on('mouseover',function(e) {
                clearAll()
                highlightColorMap(e)
                
            })
        })
    })
}

function clearAll(){
    Array.from(document.querySelectorAll(".colormap .colors")).forEach(color=> {
        color.classList.remove("selected");
        
    })
}
function highlightColorMap(e) {
    const targetColor = e.target._path.attributes.fill.value
    Array.from(document.querySelectorAll(".colormap .colors")).forEach(color => {
        if (color.style["background-color"] + "" === targetColor + "") {
            color.classList.add("selected");
        }
    });
}


fetch('../data/geojson/Relevantzones.geojson').then(geojsonFeature => geojsonFeature.json()).then(geojsonFeature => {
    geojson = L.geoJson(geojsonFeature, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map)
})

function recompileMap(){
    biketripsPath = '../data/tripdata/biketrips.json'
    taxitrips_path = '../data/tripdata/taxitrips.json'
    // Get the
    fetch(biketripsPath).then(bike_json => bike_json.json()).then(bike_json => {
        fetch(taxitrips_path).then(taxi_json => taxi_json.json()).then(taxi_json => {
            
            high = document.getElementById("inputhigh").value;
            middle =document.getElementById("inputmiddle").value; 
            low = document.getElementById("inputlow").value;
            
            locID = selected.feature.properties.location_id

            index = getIndexOfLocID(locID)

            highlightFeature(selected);
            let count =0
            let bikeColumn = getSelectedData(selected, bike_json)
            let taxiColumn = getSelectedData(selected, taxi_json)
            outgoingBike = bike_json.outgoing[index]
            outgoingTaxi = taxi_json.outgoing[index]

            geojson.eachLayer(function(layer){layer.setStyle({fillColor: getBivariateColor2(bikeColumn[count]/outgoingBike, taxiColumn[count]/outgoingTaxi)});count++})
            highlightFeature(selected);        
        })
    })
}


function selectwd(){
    biketripsPath = '../data/tripdata/biketrips.json'
    taxitrips_path = '../data/tripdata/taxitrips.json'
    // Get the
    fetch(biketripsPath).then(bike_json => bike_json.json()).then(bike_json => {
        fetch(taxitrips_path).then(taxi_json => taxi_json.json()).then(taxi_json => {
            
            locID = selected.feature.properties.location_id

            index = getIndexOfLocID(locID)


            let ele = document.getElementById("weekdays");
            let wd= ele.value;
            spec2.data = {"name": "myData", "url": "http://0.0.0.0:8000/data/duration/"+wd+"/bike/bikedata_duration_" + getIndexOfLocID(locID) + ".csv"}

            vegaEmbed('#dataviz2', spec2)
        })
    })
}

