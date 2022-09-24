import * as d3 from "d3"

// fetch data on page load
$(document).ready(function(){

  const teams = [
    "New Jersey Devils", "New York Islanders", "New York Rangers", 
    "Philadelphia Flyers", "Pittsburgh Penguins", "Boston Bruins", 
    "Buffalo Sabres", "Montréal Canadiens", "Ottawa Senators", 
    "Toronto Maple Leafs", "Carolina Hurricanes", "Florida Panthers", 
    "Tampa Bay Lightning", "Washington Capitals", "Chicago Blackhawks", 
    "Detroit Red Wings", "Nashville Predators", "St. Louis Blues", 
    "Calgary Flames", "Colorado Avalanche", "Edmonton Oilers", 
    "Vancouver Canucks", "Anaheim Ducks", "Dallas Stars", 
    "Los Angeles Kings", "San Jose Sharks", "Columbus Blue Jackets", 
    "Minnesota Wild", "Winnipeg Jets", "Arizona Coyotes", 
    "Vegas Golden Knights", "Seattle Kraken"
  ]
  
  const colors = [
     "#CE1126", "#00539B", "#0038A8",
     "#F74902", "#FCB514", "#000000",
     "#002654", "#AF1E2D", "#C52032",
     "#00205B", "#CC0000", "#041E42",
     "#002868", "#041E42", "#CF0A2C",
     "#CE1126", "#FFB81C", "#002F87",
     "#C8102E", "#6F263D", "#041E42",
     "#00205B", "#F47A38", "#006847",
     "#111111", "#006D75", "#002654",
     "#154734", "#041E42", "#8C2633",
     "#B4975A", "#99D9D9"
  ]

  const MARGIN = { LEFT: 10, RIGHT: 10, TOP: 25, BOTTOM: 5 };
  const WIDTH = 900 - MARGIN.LEFT - MARGIN.RIGHT;
  const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

  const svg = d3.select("#chart-area").append("svg")
    .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
    .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM);

  const g = svg.append("g")
    .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);


  const loadData = function(){
    $.get({
      contentType: 'application/json; charset=utf-8',
      url: '/',
      dataType: 'json',
      success: function(data){
        drawBarPlot(data);
      },
      failure: function(result){
        error();
      }
    })
  }

  function drawBarPlot(data){

    /*
    const n = 10;

    const names = new Set(data.map(d => d.name))

    const datevalues = Array.from(d3.rollup(data, ([d]) => d.goals, d => d.date, d => d.name))
      .map(([date, data]) => [new Date(date), data])
      .sort(([a], [b]) => d3.ascending(a.goals, b.goals));

    function rank(value) {
      const data = Array.from(names, name => ({name, value: value(name)}));
      
      data.sort((a, b) => d3.descending(a.value, b.value));
      
      for (let i = 0; i < data.length; ++i) data[i].rank = Math.min(n, i);
      return data;
    }

    const k = 10;

    const keyframes = [];

    let ka, a, kb, b;
    
    // [[first_date, first_map], [second_date, second_map]]
    for ([[ka, a], [kb, b]] of d3.pairs(datevalues)) {
      for (let i = 0; i < k; ++i) {
        const t = i / k;
        keyframes.push([
          new Date(ka * (1 - t) + kb * t),
          rank(name => (a.get(name) || 0) * (1 - t) + (b.get(name) || 0) * t)
        ]);
      }
    }

    keyframes.push([new Date(kb), rank(name => b.get(name) || 0)]);

    const nameframes = d3.groups(keyframes.flatMap(([, data]) => data), d => d.name);

    const prev = new Map(nameframes.flatMap(([, data]) => d3.pairs(data, (a, b) => [b, a])));

    const next = new Map(nameframes.flatMap(([, data]) => d3.pairs(data)));
    
    console.log("nameframes");

    console.log(nameframes);

    console.log("prev");

    console.log(prev);

    console.log("next");

    console.log(next);

    // console.log(Object.keys(newData));
    */


    // One day data
    
    // console.log(data);
    
    // console.log(Array.isArray(data)) => true


    var groupedByDate = groupByKey(data, 'date');

    function groupByKey(array, key) {
      return array
        .reduce((hash, obj) => {
          if(obj[key] === undefined) return hash; 
          return Object.assign(hash, { [obj[key]]:( hash[obj[key]] || [] ).concat(obj)})
        }, {})
    }

    for (let obj of Object.values(groupedByDate)) {
      obj.sort((a, b) => d3.descending(a.goals, b.goals));
    }

    // Slice of sorted data to display static chart.
    // Also, this is ~ what each days kayframe should look like
    // sortedData is an array of maps
    const sortedData = groupedByDate['2022-04-29'].slice(0, 7);

    console.log(sortedData);
    
    const x = d3.scaleLinear()
      .domain([0, 75])
      .range([0, WIDTH]);

    const y = d3.scaleBand()
      .domain(sortedData.map(d => d.name))
      .range([0, HEIGHT])
      .paddingInner(0.2)
      .paddingOuter(0.1);

    const color = d3.scaleOrdinal()
      .domain(teams)
      .range(colors);

    const rects = g.selectAll("g")
      .data(sortedData);

    // console.log(rects);

    const bars = rects.enter()
      .append("g")

    // console.log(rects);

    bars.append("rect")
      .attr("x", 0)
      .attr("y", d => y(d.name))
      .attr("width", d => x(d.goals))
      .attr("height", y.bandwidth)
      .attr("fill", d => color(d.team));

    bars.append("text")
      .attr("x", d => x(d.goals) + 3)
      .attr("y", d => y(d.name) + 15)
      .attr("fill", "white")
      .text(d => d.name);

    bars.append("text")
      .attr("x", d => x(d.goals) + 3)
      .attr("y", d => y(d.name) + 30)
      .attr("fill", "white")
      .text(d => d.goals);

    const yAxisCall = d3.axisLeft(y)
      .tickSize(0)
      .tickFormat('');

    g.append("g")
      .attr("class", "y-axis")
      .call(yAxisCall);

    const xAxisCall = d3.axisTop(x)
      .ticks(5)
      .tickSize(0);

    g.append("g")
      .attr("class", "x-axis")
      .call(xAxisCall)
      .call(g => g.select(".domain").remove());

    // console.log("bars");
    // console.log(bars);

    d3.interval(() => {
      console.log("Hello");
    }, 500);
  }

  loadData();
});
