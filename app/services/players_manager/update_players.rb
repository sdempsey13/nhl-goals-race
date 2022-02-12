module PlayersManager
    class UpdatePlayers < ApplicationService
        def call
            data = get_parsed_nhl_api_data('https://statsapi.web.nhl.com/api/v1/teams?expand=team.roster')
            team_lookup = generate_team_lookup(data)
            update_players_team(team_lookup)
        end

        def generate_team_lookup(data)
            hash = {}

            data['teams'].each do |team|
                team['roster']['roster'].each do |player|
                    hash[player['person']['id']] = team_lookup(team['id'].to_s)
                end
            end

            hash
        end

        def update_players_team(team_lookup)
            players = Player.all.includes(:team)

            players.each do |player|
                if team_lookup[player.nhl_id.to_i] == player.team_id
                    puts 'same team'
                else
                    player.team_id = team_lookup[player.nhl_id.to_i]
                    player.save
                end
            end

            puts count
        end
    end
end