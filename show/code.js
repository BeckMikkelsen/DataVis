let map = L.map('map').setView([40.75698534549325, -73.97264966442157], 11);

let tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


let selected, emptySelect;

let bikezones =[4, 7, 8, 12, 13, 17, 24, 25, 33, 34, 36, 37, 40, 41, 42, 43, 45, 47, 48, 49, 50, 52, 54, 59, 60, 61, 62, 65, 66, 68, 69, 74, 75, 79, 80, 87, 88, 90, 97, 100, 106, 107, 112, 113, 114, 116, 119, 120, 125, 126, 137, 140, 141, 142, 143, 144, 145, 146, 147, 148, 151, 152, 158, 159, 161, 162, 163, 164, 166, 167, 168, 169, 170, 177, 179, 181, 186, 188, 189, 190, 193, 194, 195, 198, 202, 209, 211, 217, 223, 224, 225, 226, 228, 229, 230, 231, 232, 233, 234, 236, 237, 238, 239, 243, 244, 246, 247, 249, 255, 256, 261, 262, 263]
 

function getColor(d) {
    return d > 1000 ? '#67001f' :
    d > 800 ? '#b2182b' :
    d > 600? '#d6604d' :
    d > 400 ? '#f4a582' :
    d > 200 ? '#fddbc7' :
    d > 0 ? '#f7f7f7' :
    d > -200 ? '#d1e5f0' :
    d > -400 ? '#92c5de' :
    d > -600 ? '#4393c3' :
    d > -800 ? '#2166ac' :
    '#053061' 
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

function time_from_selected(selected, data_json) {
    let loc_id = selected.feature.properties.location_id
    let index

    for (let i=0; i < bikezones.length; i++) {
        if (bikezones[i] == loc_id) {
            index = i
            break
        }
    }
    //console.log(selected)
    return data_json[index]

}

function onEachFeature(feature, layer) {
    // Get the
    fetch('../bike_json.json').then(bike_json => bike_json.json()).then(bike_json => {
        fetch('../taxi_json.json').then(taxi_json => taxi_json.json()).then(taxi_json => {

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
            let time_column_bike = time_from_selected(selected, bike_json)
            let time_column_taxi = time_from_selected(selected, taxi_json)
            
            geojson.eachLayer(function(layer){layer.setStyle({fillColor: getColor(time_column_bike[count] - time_column_taxi[count])});count++})
            highlightFeature(selected);

            // geojsonFeature.features.forEach(f => {
            //     console.log(f)
            
            // });
        
        })
    })
})
    


}
fetch('../Relevantzones.geojson').then(geojsonFeature => geojsonFeature.json()).then(geojsonFeature => {
geojson = L.geoJson(geojsonFeature, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map)
})
