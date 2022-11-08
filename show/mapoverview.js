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

let relevantZones = [4, 7, 8, 12, 13, 17, 24, 25, 33, 34, 36, 37, 40, 41, 42, 43, 45, 47, 48, 49, 50, 52, 54, 59, 60, 61, 62, 65, 66, 68, 69, 74, 75, 79, 80, 87, 88, 90, 94, 97, 100, 106, 107, 112, 113, 114, 116, 119, 120, 125, 126, 127, 128, 136, 137, 140, 141, 142, 143, 144, 145, 146, 147, 148, 151, 152, 158, 159, 161, 162, 163, 164, 166, 167, 168, 169, 170, 177, 179, 181, 186, 188, 189, 190, 193, 194, 195, 198, 202, 209, 211, 217, 223, 224, 225, 226, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 243, 244, 246, 247, 249, 255, 256, 261, 262, 263]
let high = document.getElementById("inputhigh").value;
let middle =document.getElementById("inputmiddle").value; 
let low = document.getElementById("inputlow").value;
let bivariateColorArray =["#d3d3d3", "#cac4a8", "#c0b37e", "#b6a352", "#bbafc2", "#b2a29b", "#aa9473", "#a1874b", "#a38bb1", "#9c818d", "#947669", "#8c6b44", "#8b689f", "#85607f", "#7f585f", "#78503e"]
console.log(high)

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
        fillColor: 'pink',
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
            let count =0
            let bikeColumn = getSelectedData(selected, bike_json)
            let taxiColumn = getSelectedData(selected, taxi_json)
            outgoingBike = bike_json.outgoing[index]
            outgoingTaxi = taxi_json.outgoing[index]
            
            
            geojson.eachLayer(function(layer){layer.setStyle({fillColor: getBivariateColor2(bikeColumn[count]/outgoingBike, taxiColumn[count]/outgoingTaxi)});count++})
            highlightFeature(selected);


            locID = selected.feature.properties.location_id
            
            spec.data = {"name": "myData", "url": "http://0.0.0.0:8000/data/dataforeachzoneid/weekday_locidindex" + getIndexOfLocID(locID) + ".csv"}

            vegaEmbed('#dataviz', spec)

            console.log(locID)

            // vegaEmbed('#dataviz', spec).then(function (res) {
            //     var locID = vega
            //     .changeset()
            //     .insert(4)
            //     res.view.signal('locID')
            // })
            

        
        })
    })
})
    


}
fetch('../data/geojson/Relevantzones.geojson').then(geojsonFeature => geojsonFeature.json()).then(geojsonFeature => {
geojson = L.geoJson(geojsonFeature, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map)
})
