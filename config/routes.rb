Rails.application.routes.draw do
  root "items#index"

  get "/items/deleted", to: "items#deleted"

  resources :items
end
