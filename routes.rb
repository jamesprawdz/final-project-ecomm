Rails.application.routes.draw do
  get 'payment_links/create'
  resources :orders
  resources :cart_items
  resources :products
  resources :carts
  resources :users

  # post '/charges', to: 'charges#create'

  # delete '/clearCart', to: 'cart#destroy'

  post "/users", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create" 
  delete "/logout", to: "sessions#destroy"

  get '/account', to: 'users#account_info'

  get '/products', to: 'products#index'
  get '/products/:id', to: 'products#show'

  get '/cart_items', to: 'cart_items#index'

  post '/checkout', to: 'orders#create'
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
