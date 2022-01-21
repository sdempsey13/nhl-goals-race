class CreateTeams < ActiveRecord::Migration[6.1]
  def change
    create_table :teams do |t|
      t.string :name
      t.integer :nhlID
      t.string :color

      t.timestamps
    end
  end
end
