

class TeamsController < ApplicationController
    def index
        populate_teams
        redirect_to :root
    end

    # Populates the database with the teams playing in the current/upcoming season.
    # Updates annually in September
    # Master method for populating and updating the team table
    def populate_teams
        data = get_parsed_nhl_api_data('https://statsapi.web.nhl.com/api/v1/teams')

        team_props = get_team_props(data)

        create_teams(team_props)
    end

    # Extract team creating information from the API endpoint and get it ready for use
    # @params [Not sure] the cleaned up data fropm the api call
    # @return [Array] an array of hashes with team properties
    def get_team_props(data)
        teams = []
        
        data['teams'].each do |team|
            team_props = {name: team['name'], nhlID: team['id']}
            teams << team_props
        end
        teams
    end

    # Create new teams in the database
    # @params [Array] an array of hashed with team properties
    def create_teams(team_props)
        team_props.each do |team_prop|
            team = Team.new(team_prop)

            if team.save
                puts "saved team"
            else
                puts "team not saved"
            end
        end
    end
  end
  