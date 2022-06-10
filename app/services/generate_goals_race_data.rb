# We only need this because we're starting mid season. 
# Calling this: https://statsapi.web.nhl.com/api/v1/people/8470613/stats?stats=statsSingleSeason&season=20212022
# daily in the future to populate this day by day - set that up next

#Should probably be called populate
class GenerateGoalsRaceData < ApplicationService
    def call
        # includes teams
        players = Player.all
        
        start_date = Date.parse('2021-10-12')
        end_date = Date.parse('2022-04-29')
        
        data_array = []

        players.each do |player|
            # to avoid doing this for everyone every time, if player has GoalsRaceDatum, 
            # just do today's update. Otherwise (if they're a newly rostered player) do the whole schpiel
            player_id = player.nhl_id.to_s
            game_log = get_parsed_nhl_api_data("https://statsapi.web.nhl.com/api/v1/people/#{player_id}/stats?stats=gameLog&season=20212022")
            total_goals = 0

            (start_date..end_date).each do |day|
                game_log['stats'][0]['splits'].each do |split|
                    total_goals += split['stat']['goals'] if day.strftime("%F") == split['date']
                end

                data = {
                    date: day.strftime("%F"),
                    name: player.name,
                    team: player.team.name,
                    goals: total_goals
                    }
                data_array << data
            end
        end

        create_data_object(data_array)
    end

    def create_data_object(data_array)
        data_array.each do |data|
            data = GoalsRaceDatum.new(data)

            if data.save
                puts "saved data" 
            else
               puts "data not saved"
            end
        end
    end
end
