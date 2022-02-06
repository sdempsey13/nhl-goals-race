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

// draw bar plot
function drawBarPlot(data){
  console.log(d3.min(data));
};

// fetch data on page load
$(document).ready(function(){ 
  loadData(); 
});