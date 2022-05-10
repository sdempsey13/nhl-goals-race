# NHL Scoring Race Animated Data

This project is a basic Rails 6 app that displays a bar chart describing the 2021-2022 National Hockey League's goal scoring statistics. 
Each players goals total is displayed along with their name and a bar colored by their team's main color. 
The app uses the NHL's API to pull current data and the Javascript framework D3 to render and animate the chart.

Like Heroku site hyperlink

The heart of the D3 graph is app/javascripts/packs/goals_bar_chart_race.js

The app/services directory contains the NHL API
