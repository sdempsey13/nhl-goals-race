module PlayersManager
    class PopulatePlayers < ApplicationService
        def call
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
                        nhl_id: player['person']['id'],
                        team_id: team_lookup(team['id']),
                        active: true
                    }
                    players << player_props
                end
            end
    
            players
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
end