class Team < ApplicationRecord
    has_many :players

    validates :name, presence: true
    validates :nhlID, presence: true
    validates :name, uniqueness: true
end
