class AddLastActiveToPlayers < ActiveRecord::Migration[6.1]
  def change
    add_column :players, :last_active, :datetime
  end
end
