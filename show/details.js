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
        "title":"Weekdays", "sort": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    },
        "y": {"field": {"repeat":"layer"}, "type": "quantitative", "title":"Amount"},
        "color": {"datum": {"repeat":"layer"}, "title":"hej"},
        "xOffset": {"datum": {"repeat":"layer"}},
    },
},
"config": {"mark": {"invalid": null}}
}

