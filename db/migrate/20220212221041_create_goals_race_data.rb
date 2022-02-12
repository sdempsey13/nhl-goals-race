class CreateGoalsRaceData < ActiveRecord::Migration[6.1]
  def change
    create_table :goals_race_data do |t|
      t.string :date
      t.string :name
      t.string :team
      t.integer :goals

      t.timestamps
    end
  end
end
