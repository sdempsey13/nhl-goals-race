class PlayersController < ApplicationController

    def index
        populate_players
        redirect_to :root
    end

    def populate_players
        data = get_parsed_nhl_api_data('https://statsapi.web.nhl.com/api/v1/teams?expand=team.roster')
        puts "Hello"
    end
end