class Player < ApplicationRecord
    belongs_to :team

    validates :name, presence: true
    validates :nhl_id, uniqueness: true
    validates :name, uniqueness: true
end
