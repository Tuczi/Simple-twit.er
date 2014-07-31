Rails.application.routes.draw do
  get 'home/options'

  resources :posts do
    resources :comments, except: [:show, :edit]
  end

  devise_for :users
  root to: "posts#index"

  match '*', to: 'home#options', via: [:options]
end
