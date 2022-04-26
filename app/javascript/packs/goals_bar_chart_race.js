import * as d3 from "d3"

// fetch data on page load
$(document).ready(function(){

  const MARGIN = { LEFT: 10, RIGHT: 5, TOP: 25, BOTTOM: 5 };
  const WIDTH = 900 - MARGIN.LEFT - MARGIN.RIGHT;
  const HEIGHT = 550 - MARGIN.TOP - MARGIN.BOTTOM;

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
    // console.log(cleanData);

    const x = d3.scaleLinear()
      .domain([0, d3.max(cleanData, d => d.goals)])
      .range([WIDTH, 75]);

    const y = d3.scaleBand()
      .domain(cleanData.map(d => d.name))
      .range([0, HEIGHT])
      .paddingInner(0.3)
      .paddingOuter(0.2);

    // var color = d3.scaleOrdinal() // D3 Version 4
    //   .domain(["New York", "San Francisco", "Austin"])
    //   .range(["#FF0000", "#009933" , "#0000FF"]);
    const color = d3.scaleOrdinal(d3.schemeCategory10)

    const rects = g.selectAll("rect")
      .data(cleanData);

    rects.enter().append("rect")
      .attr("x", 0)
      .attr("y", d => y(d.name))
      .attr("width", d => WIDTH - x(d.goals))
      .attr("height", y.bandwidth)
      .attr("fill", d => color(d.team));
  }

  loadData();
});
