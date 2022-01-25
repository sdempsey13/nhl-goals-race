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
end