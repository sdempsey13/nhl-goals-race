# Populates the database with the teams playing in the current/upcoming season.
# Updates annually in September

require 'json'
require 'pp'
require 'uri'
require 'net/http'

class PopulateTeamsJob < ApplicationJob
  queue_as :default

  def populate_teams
    data = get_parsed_api_data('https://statsapi.web.nhl.com/api/v1/teams')

    team_props = get_team_props(data)

    create_teams(team_props)

  end
  
  def get_parsed_api_data(url)
    uri = URI(url)
  
    res = Net::HTTP.get(uri)
    
    data = JSON.parse(res)
  end

  def get_team_props(data)
    teams = []
    
    data['teams'].each do |team|
        team_props = {name: team['name'], nhlID: team['id']}
        teams << team_props
    end
    teams
  end

  def create_teams(team_props)
    team_props.each do |team_prop|
      team = Team.new(team_prop)

      if team.save
        puts "saved teams"
      else
        puts "teams not saved"
      end
    end
  end
end


# Get and parse the raw data into a ruby hash
# Extract the information you need out of it in a ready to go package
# Filter for doubles, delete any that are not playing in the upcoming season (say the coyotes move and become the wyoming prarie dogs)
# Use that data to populate the DB
# Save the item
# What can we do about failures? Rescue around the creation phase














