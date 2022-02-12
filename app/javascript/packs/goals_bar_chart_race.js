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

const w = 750, h = 500, padding = 2;

// draw bar plot
function drawBarPlot(data){
  const dataset = data;
  let nums = []

  for (var i=0; i < data.length; i++) {
    nums.push(data[i]['goals']);
 }


 console.log(dataset.filter(d => d['name'] === "Alex DeBrincat"));
 console.log(d3.group(dataset, d => d.name));
 console.log(nums);
 var names = new Set(dataset.map(d => d.name));
 console.log(names);


 let svg = d3.select("body").append("svg")
              .attr("width", w)
              .attr("height", h);

svg.selectAll("rect")
  .data(nums)
  .enter()
  .append("rect")
    .attr("x", function(d, i) {
      return i * (w / nums.length);
    })
    .attr("y", function(d) {
      return h - (d * 10);
    })
    .attr("width", w / nums.length - padding)
    .attr("height", function(d) {
      return d * 10;
    })
};

// fetch data on page load
$(document).ready(function(){ 
  loadData(); 
});