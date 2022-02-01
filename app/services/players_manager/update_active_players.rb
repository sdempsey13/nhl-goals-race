# update_active_status
# update_team_status

module PlayersManager
    class UpdateActivePlayers < ApplicationService
        def call
            data = get_parsed_nhl_api_data('https://statsapi.web.nhl.com/api/v1/teams?expand=team.roster')
            
        end


    end
end