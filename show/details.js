

let spec = {
    "width": 600,
    "height": 200,
    "padding": 5,
    "data": {"name": "myData"},
    
    "repeat" : {"layer": ["Bike", "Taxi"]},
    "spec": {
    "mark": "bar",
    "encoding": {
        "x": {"field": "Weekdays", "type": "ordinal",
        "title":"Weekdays", "sort": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
         "axis":{
            "titleFontSize": "13",
            "labelAngle":"0", 
            "labelFontSize": "11", 
            "labelPadding":"5", 
            "tickSize":"5", 
            "tickWidth":"1"
        }

    },
        "y": {"field": {"repeat":"layer"}, "type": "quantitative", "title":"Amount", "axis":{"titleFontSize": "13"}},
        "color": {"datum": {"repeat":"layer"}, "title":"Transportation type","scale": {"range":["#8b689f","#b6a352"]}},
        "xOffset": {"datum": {"repeat":"layer"}},
        
    },
},
"config": {"mark": {"invalid": null}}
}

let spec2 = {
    "width": 400,
    "height": 150,
    "padding": 5,
    "data":{"name": "myData"},
    "transform": [{filter: "datum.duration < 8000"}],
    "mark": "point",
    "encoding": {
        "x": {
            "timeUnit": "hours", "field": "started_at",
            "axis": {"labelOverlap": "true", "labelSeperation": "5"}
        },
        "y": {
            "field": "duration", "type":"quantitative",
            //"axis": {"labelOverlap": "true", "labelSeperation": "5"},
            "sort":"ascending",
        },
        "opacity": {"value": "0.5"}
    }

}
spec.data = {"name": "myData", "url": "http://0.0.0.0:8000/data/dataforeachzoneid/standardview/weekdayallzones.csv"}


vegaEmbed('#dataviz', spec)
