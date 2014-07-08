Rails.application.routes.draw do
  resources :posts do
    resources :comments, except: [:show, :edit]
  end

  devise_for :users
  root to: "posts#index"

end
