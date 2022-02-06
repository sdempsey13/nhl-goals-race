class HomeController < ApplicationController
  def index
    data = File.open('app/data/data.json').to_json

    respond_to do |format|
      format.html
      format.json { render json: data }
    end
  end
end
