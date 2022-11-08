// // var view = new vega.View()
// //   .logLevel(vega.Warn) // set view logging level
// //   .renderer('svg')     // set render type (defaults to 'canvas')
// //   .initialize('#view') // set parent DOM element
// //   .hover();            // enable hover event processing, *only call once*!

// // view.runAsync(); // evaluate and render the view

// // view.addEventListener('click', function(event, item) {
// //   console.log('CLICK', event, item);
// // });

// let spec = {
//     "width": 600,
//     "height": 200,
//     "padding": 5,
  
//     "data": {"name": "myData", "url": "http://0.0.0.0:8000/data/sampledata/bikesample.csv"},
//     "transform": [{"filter": "datum.start_zoneID == locID"}],
//     "mark": "bar",
//     "encoding": {
//         "x": {"timeUnit": "day", "field": "started_at", "type": "ordinal",
//         title:"Amount each weekday"},
//         "y": {"aggregate": "count", "field": "end_zoneID"},
//         "color": {
//             "field": "started_at", "timeUnit": "day",
//             "scale": {"range": ["#9972af"]}
//           }
//     },
// }
// console.log(spec.transform)

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

// const margin = {top: 30, right: 30, bottom: 70, left: 60},
//     width = 560 - margin.left - margin.right,
//     height = 300 - margin.top - margin.bottom;
//     const svg = d3.select("#dataviz")
//     .append("svg")
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//       .attr("transform", `translate(${margin.left},${margin.top})`);
  
//   //Parse the Data
//   d3.csv("http://0.0.0.0:8000/data/sampledata/bikesample.csv").then( function(data) {
  
//   bike_group_start = d3.group(data, d => d.weekday)
//   console.log(bike_group_start[0])
//   //Domain = [0, 1, 2, 3, 4, 5, 6]
//   const x = d3.scaleBand()
//   .range([ 0, width ])
//   .domain(data.map(d => d.weekday))
//   .padding(0.2);
//   svg.append("g")
//   .attr("transform", `translate(0, ${height})`)
//   .call(d3.axisBottom(x))
//   .selectAll("text")
//   .attr("transform", "translate(-10,0)rotate(-45)")
//   .style("text-anchor", "end");
  
//   //Add Y axis
//   const y = d3.scaleLinear()
//     .domain([0, 13000])
//     .range([ height, 0]);
//   svg.append("g")
//     .call(d3.axisLeft(y));

//   count = d3.rollup(data, v => v.length, d => d.weekday)
//   console.log(count)
  
//   //Bars
//   svg.selectAll("mybar")
//     .data(data)
//     .join("rect")
//       .attr("x", d => x(d => d.weekday))
//       //.attr("y", d => y(d=> d.count))
//       // .attr("width", x.bandwidth())
//        //.attr("height", d => height - y(count.value))
//       // .attr("fill", "#69b3a2")
  
//  })

