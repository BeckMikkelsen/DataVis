

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
  
    "data":{"name": "myData"},
    "hconcat": [
        {
        "title": "Bike",
        "width": 300,
        "height": 300,
        "padding": 5,
        "transform": [{filter: {"field": "ride_type", "equal": "bike"}},
                    {filter: "datum.duration < 8000"},
                    {filter: "datum.duration > -1"},
    
            ],
        "mark": "bar",
        "encoding": {
            "x": {
                "timeUnit":"hours", 
                "field": "started_at",
            },
            "y": {
                "bin": {"step": 1000},
                "field": "duration", "type":"quantitative",
                "sort":"ascending",
                "scale": {"domain": [0,8000]}
            },
            "color": {"aggregate": "count", "scale": {"range": ["yellow", "red"]}},
            }
        },
        {
        "title": "Taxi",
        "width": 300,
        "height": 300,
        "padding": 5,
        "transform": [{filter: {"field": "ride_type", "equal": "taxi"}},
                    {filter: "datum.duration < 8000"},
                    {filter: "datum.duration > -1"},
            ],
        "mark": "bar",
        "encoding": {
            "x": {
                "timeUnit":"hours", 
                "field": "started_at",
            },
            "y": {
                "bin": {"step": 1000},
                "field": "duration", "type":"quantitative",
                "sort":"ascending",
                "scale": {"domain": [0,8000]}
            },
            "color": {"aggregate": "count", "scale": {"range": ["yellow", "red"]}},
        }
    }]
}

spec.data = {"name": "myData", "url": "http://0.0.0.0:8000/data/dataforeachzoneid/standardview/weekdayallzones.csv"}


vegaEmbed('#dataviz', spec)
