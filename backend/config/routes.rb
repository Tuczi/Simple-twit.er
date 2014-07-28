Rails.application.routes.draw do
  resources :posts do
    resources :comments, except: [:show, :edit]
  end

  devise_for :users
  root to: "posts#index"

  match 'users/sign_in', to: 'session#new', via: [:options]
end
