class AddActiveToPlayers < ActiveRecord::Migration[6.1]
  def change
    add_column :players, :active, :boolean
  end
end
