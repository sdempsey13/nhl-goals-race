import * as d3 from "d3"

// ajax call to fetch json
var loadData = function(){
  $.ajax({
    type: 'GET',
    contentType: 'application/json; charset=utf-8',
    url: '/',
    dataType: 'json',
    success: function(data){
      drawBarPlot(data);
    },
    failure: function(result){
      error();
    }
  });
};

function error() {
  console.log("Something went wrong!");
}

function drawBarPlot(data) {
  data.forEach(d => {
    d.height = Number(d.height)
  })
  
  const x = d3.scaleBand()
  .domain(["Burj Khalifa", "Shanghai Tower",
    "Abraj Al-Bait Clock Tower", "Ping An Finance Centre",
    "Lotte World Tower"])
  .range([0, 400])
  .paddingInner(0.2)
  .paddingOuter(0.2)

  const y = d3.scaleLinear()
    .domain([0, 828])
    .range([0, 400])

  const svg = d3.select("#chart-area").append("svg")
    .attr("width", 400)
    .attr("height", 400)

  const rectangles = svg.selectAll("rect")
    .data(data)

  rectangles.enter().append("rect")
    .attr("x", (d) => x(d.name))
    .attr("y", 0)
    .attr("width", x.bandwidth)
    .attr("height", d => y(d.height))
    .attr("fill", "white")

}

// fetch data on page load
$(document).ready(function(){ 
  loadData(); 
});
