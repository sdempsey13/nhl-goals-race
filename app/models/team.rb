class Team < ApplicationRecord
    has_many :players

    validates :name, presence: true
    validates :nhlID, uniqueness: true
    validates :name, uniqueness: true
end
