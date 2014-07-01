Rails.application.routes.draw do
  resources :posts do
    resources :comments, except: [:show, :edit]
  end

  devise_for :users
  get 'home/index'
  root to: "home#index"

end
