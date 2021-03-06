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
    const cleanData = data.slice().sort((a, b) => d3.descending(a.goals, b.goals)).slice(0, 10);
    console.log(cleanData);

    const x = d3.scaleLinear()
      .domain([0, 75])
      .range([0, WIDTH]);

    const y = d3.scaleBand()
      .domain(cleanData.map(d => d.name))
      .range([0, HEIGHT])
      .paddingInner(0.2)
      .paddingOuter(0.1);

    const color = d3.scaleOrdinal()
      .domain(teams)
      .range(colors);

    const rects = g.selectAll("g")
      .data(cleanData);

    const bars = rects.enter()
      .append("g")

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
      .tickSize(0)
    g.append("g")
      .attr("class", "x-axis")
      .call(xAxisCall)
      .call(g => g.select(".domain").remove());
  }

  loadData();
});
