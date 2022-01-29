class Team < ApplicationRecord
    has_many :players

    validates :name, presence: true
    validates :nhl_id, uniqueness: true
    validates :name, uniqueness: true
end
