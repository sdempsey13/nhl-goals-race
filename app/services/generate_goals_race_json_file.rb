require 'json'

class GenerateGoalsRaceJsonFile < ApplicationService
    def call
        chart_data = GoalsRaceDatum.all

        chart_data = chart_data.as_json(only: [:date, :name, :team, :goals])
        
        File.write('app/data/goals-race-data.json', JSON.dump(chart_data))
    end
end