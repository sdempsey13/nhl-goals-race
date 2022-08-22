desc "This task is called by the Heroku scheduler add-on"
task :generate_goals_race_date => :environment do
  GenerateGoalsRaceData.call
end