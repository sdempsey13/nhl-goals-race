import * as d3 from "d3"

window.addEventListener('DOMContentLoaded', () => {
  d3.selectAll("div")
    .append("p")
    .text("Hello, World!")
})