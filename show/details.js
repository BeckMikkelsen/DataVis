

let spec = {
    "width": 700,
    "height": 300,
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
    "stroke": {
        "condition": {
          "param": "highlight",
          "empty": false,
          "value": "black"
        },
        "value": null,    
    },
},
"config": {"mark": {"invalid": null}}
}

let spec2 = {
  
    "data":{"name": "myData"},
    // "hconcat": [
    //     {
        "title": "Mean travel time",
        "width": 700,
        "height": 300,
        "padding": 5,
        //"transform": [{filter: {"field": "ride_type", "equal": "bike"}}],
        "mark": "line",
        "encoding": {
            "x": {
                "title":"Hour",
                "field": "hour",
                "type": "quantitative",
                
                "axis":{
                    "titleFontSize": "13",
                    "labelAngle":"0", 
                    "labelFontSize": "11", 
                    "labelPadding":"5", 
                    "tickSize":"5", 
                    "tickWidth":"1"
                },
                "scale": {
                    "domain": [0, 23]
                  }
            },
            "y": {
                "title": "Duration (sec)",
                "field": "mean", "type":"quantitative",
            },
            "color": {"title": "Transportation type","field": "ride_type","type": "nominal", "scale": {"range":["#8b689f","#b6a352"]}}
            //"color": {"aggregate": "count", "scale": {"range": ["#e8e8e8", "#804d36"]}},
            
        }
        //},
        // {
        // "title": "Taxi",
        // "width": 300,
        // "height": 300,
        // "padding": 5,
        // "mark": "line",
        // "transform": [{filter: {"field": "ride_type", "equal": "taxi"}}],
        // "encoding": {
        //     "x": {
        //         "field": "hour",
        //         "type": "quantitative",
        //         //"sort":"ascending",
        //         "axis":{
        //             "titleFontSize": "13",
        //             "labelAngle":"0", 
        //             "labelFontSize": "11", 
        //             "labelPadding":"5", 
        //             "tickSize":"5", 
        //             "tickWidth":"1"
        //         }
        //     },
        //     "y": {
        //         "field": "mean", "type":"quantitative",
        //         "sort":"ascending",
        //         //"scale":{"domain":[0,5000]}
        //     },
        //     //"color": {"aggregate": "count", "scale": {"range": ["#e8e8e8", "#804d36"]}},
            
        // }
    //}]
}

spec.data = {"name": "myData", "url": "http://0.0.0.0:8000/data/dataforeachzoneid/standardview/weekdayallzones.csv"}


vegaEmbed('#dataviz', spec)
