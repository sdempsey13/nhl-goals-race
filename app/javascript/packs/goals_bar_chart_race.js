import * as d3 from "d3"

// ajax call to fetch json
var loadData = function(){
  $.ajax({
    type: 'GET',
    contentType: 'application/json; charset=utf-8',
    url: '/',
    dataType: 'json',
    success: function(data){
      // drawBarPlot(data);
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
    d.age = Number(d.age)
  })
  console.log(data)

}

// fetch data on page load
$(document).ready(function(){ 
  loadData(); 

  console.log('here');

  const data = [25, 20, 15, 10, 12]

  const svg = d3.select("#chart-area").append("svg")
      .attr("width", "100%")
      .attr("height", 500)

  const circles = svg.selectAll("circle")
      .data(data)

  circles.enter().append("circle")
      .attr("cx", (d, i) => (i * 50) + 50)
      .attr("cy", 250)
      .attr("r", (d) => d)
      .attr("fill", "red")
});
