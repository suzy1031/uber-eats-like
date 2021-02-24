Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :restaurants do
        resources :foods, only: %i[index] # indexのみ
      end
      resources :line_foods, only: %i[index create] # index / createのみ
      put 'line_foods/replace', to: 'line_foods#replace'
      resources :orders, only: %i[create]
    end
  end
end
