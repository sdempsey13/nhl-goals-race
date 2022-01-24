class Player < ApplicationRecord
    belongs_to :team

    validates :name, presence: true
    validates :nhlID, uniqueness: true
    validates :name, uniqueness: true
end
