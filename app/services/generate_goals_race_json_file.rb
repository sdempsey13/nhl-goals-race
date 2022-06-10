require 'json'

class GenerateGoalsRaceJsonFile < ApplicationService
    def call
        today = Time.zone.today.strftime("%Y-%d-%m")
        players = Player.all.includes(:team)
        data = []

        players.each do |player|
            current_stats = get_parsed_nhl_api_data("https://statsapi.web.nhl.com/api/v1/people/#{player.nhl_id.to_i}/stats?stats=statsSingleSeason&season=20212022")
            
            unless current_stats['stats'][0]['splits'][0].nil?
                snippet = {
                    "date": today,
                    "name": player.name,
                    "team": player.team.name,                
                    "goals": current_stats['stats'][0]['splits'][0]['stat']['goals']
                }

                data << snippet

                puts snippet
            end
        end

        puts data

        File.write('app/data/goals-race-data.json', JSON.pretty_generate(data))
    end
    
    # def call
    #     chart_data = GoalsRaceDatum.all

    #     chart_data = chart_data.as_json(only: [:date, :name, :team, :goals])
        
    #     File.write('app/data/goals-race-data.json', JSON.pretty_generate(chart_data))
    # end
end