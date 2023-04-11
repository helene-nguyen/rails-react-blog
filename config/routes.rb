Rails.application.routes.draw do
  # when create a controller /api/v1/articles
  namespace :api do
    namespace :v1 do
      get "articles/index"
      post "articles/create"
      get "articles/show/:id", to: "articles#show"
      patch "articles/edit/:id", to: "articles#edit"
      delete "articles/destroy/:id", to: "articles#destroy"
    end
  end

  root "homepage#index"

  get "/*path" => "homepage#index"
  # You add a catch-all route with get '/*path' that will direct any other request that doesn’t match the existing routes to the index action of the homepage controller. The front-end routing will handle requests unrelated to creating, reading, or deleting recipes.

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
end
