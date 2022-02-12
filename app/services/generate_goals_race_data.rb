# We only need this because we're starting mid season. 
# Calling this: https://statsapi.web.nhl.com/api/v1/people/8470613/stats?stats=statsSingleSeason&season=20212022
# daily in the future to populate this day by day

class GenerateGoalsRaceData < ApplicationService
    def call
        data = get_parsed_nhl_api_data('https://statsapi.web.nhl.com/api/v1/people/8470613/stats?stats=gameLog&season=20212022')
        player_props = notsureyet(data)
    end

    # data['stats'][0]['splits'].each
    #   
    def notsureyet(data)
        players = Player.all
        
        start_date = Date.parse('2021-10-12')
        end_date = Date.today
        
        data_array = []
        (start_date..end_date).each do |day|
            data = {
                date: day.strftime("%F"),
                name: ,
                team: ,
                goals:
                }
            data_array << data
        end
    end
end