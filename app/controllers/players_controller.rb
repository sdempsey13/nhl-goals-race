class PlayersController < ApplicationController

    def index
        populate_players
        redirect_to :root
    end

    def populate_players
        data = get_parsed_nhl_api_data('https://statsapi.web.nhl.com/api/v1/teams?expand=team.roster')
        player_props = get_player_props(data)
        create_player(player_props)
    end

    def get_player_props(data)
        players = []

        data['teams'].each do |team|
            team['roster']['roster'].each do |player|
                player_props = {
                    name: player['person']['fullName'],
                    nhlID: player['person']['id'],
                    team_id: team_lookup(team['id'].to_s)
                }
                players << player_props
            end
        end

        players
    end

    # Take the NHL ID and return our internal Team ID
    # @param [String] the NHL ID
    # @return [Integer] internal Team ID
    def team_lookup(nhlID)
        internal_id = Team.where(nhlID: nhlID).first.id
    end

    def create_player(player_props)
        player_props.each do |player_prop|
            player = Player.new(player_prop)

            if player.save
               puts "saved player" 
            else
               puts "player not saved"
            end
        end
    end
end

# player_props = {name: 'name', nhlID: '#', team_id 'internal team id'}
