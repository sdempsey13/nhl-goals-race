require 'json'
require 'uri'
require 'net/http'

class ApplicationService
    def self.call(*args, &block)
        new(*args, &block).call
    end

    # Make a GET request to an NHL API and parse the response into JSON
    # @params [String] the url of the NHL API endpoint you wish to call
    # returns [JSON or hash? not 100% sure yet] the data you wanted in an easily digestible Ruby structure
    def get_parsed_nhl_api_data(url)
        uri = URI(url)
        res = Net::HTTP.get(uri)
        data = JSON.parse(res)
    end

    # Take the NHL ID and return our internal Team ID
    # @param [String] the NHL ID
    # @return [Integer] internal Team ID
    def team_lookup(nhl_id)
        # Make this more efficient by grabbing a teams object once instead of querying every time
        # Or make a constants hash so we don't have to hit the db for every single player
        internal_id = Team.where(nhl_id: nhl_id).first.id
    end
end