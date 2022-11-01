let spec = {
  "width": 600,
  "height": 200,
  "padding": 5,

  "data": {"url": "http://0.0.0.0:8000/data/bikedata_07_ID.csv"},
  "mark": "bar",
  "encoding": {
    "x": {"timeUnit": "day", "field": "started_at", "type": "ordinal"},
    "y": {"aggregate": "count", "field": "end_zoneID"}
  }
}

vegaEmbed("#dataviz", spec, {mode: "vega"}).then(console.log).catch(console.warn);
