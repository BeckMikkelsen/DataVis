let map = L.map('map').setView([40.75698534549325, -73.97264966442157], 11);

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
let colorsZone = ['#543005','#8c510a','#bf812d','#dfc27d','#f6e8c3','#f5f5f5','#c7eae5','#80cdc1','#35978f','#01665e','#003c30']



// TODO: create bivariate color scale
function getColor(d) {
    return d > 250 ? colorsZone[0] :
    d > 200 ?  colorsZone[1]  :
    d > 150?   colorsZone[2]  :
    d > 100 ?  colorsZone[3]  :
    d > 50 ?  colorsZone[4]  :
    d > 0 ?    colorsZone[5]  :
    d > -50 ? colorsZone[6]  :
    d > -100 ? colorsZone[7]  :
    d > -150 ? colorsZone[8]  :
    d > -200 ? colorsZone[9]  :
     colorsZone[10]
}

function style(feature) {
    return {
        fillColor: 'grey',
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
        fillOpacity: 0.7,
        fillColor: 'red'
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
         selected.bringToFront();
    }
}
//L.geoJson(geojsonFeature, {style: style}).addTo(map);

function getSelectedData(selected, data_json) {
    let loc_id = selected.feature.properties.location_id
    let index

    for (let i=0; i < relevantZones.length; i++) {
        if (relevantZones[i] == loc_id) {
            index = i
            break
        }
    }
    //console.log(selected)
    return data_json[index]

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
            
            selected = e.target;

            highlightFeature(selected);
            let count =0
            let bikeColumn = getSelectedData(selected, bike_json)
            let taxiColumn = getSelectedData(selected, taxi_json)
            
            geojson.eachLayer(function(layer){layer.setStyle({fillColor: getColor(bikeColumn[count] - taxiColumn[count])});count++})
            highlightFeature(selected);

            // geojsonFeature.features.forEach(f => {
            //     console.log(f)
            
            // });
        
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
