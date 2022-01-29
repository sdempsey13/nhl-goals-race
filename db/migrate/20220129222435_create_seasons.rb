class CreateSeasons < ActiveRecord::Migration[6.1]
  def change
    create_table :seasons do |t|
      t.string :nhl_season
      t.boolean :current

      t.timestamps
    end
  end
end
