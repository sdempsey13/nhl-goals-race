Rails.application.routes.draw do
  root to: "home#index"
  resources :teams, only: [:index]
  resources :players, only: [:index]
end
