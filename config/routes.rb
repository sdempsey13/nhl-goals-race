Rails.application.routes.draw do
  root to: "home#index"
  resources :players
  resources :teams
end
