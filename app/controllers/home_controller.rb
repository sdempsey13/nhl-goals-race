class HomeController < ApplicationController
  def index
    data = File.open('app/data/d3-test-data.json')

    file_data = data.read

    respond_to do |format|
      format.html
      format.json { render json: file_data }
    end
  end
end
