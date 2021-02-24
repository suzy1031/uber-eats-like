module Api
  module V1
    class RestaurantsController < ApplicationController
      def index
        restaurants = Restaurant.all

        # json構造 {"restaurants":[{"id":1・・・},{"id":2・・・},{"id":3・・・}]}
        render json: {
          restaurants: restaurants
        }, status: :ok
      end
    end
  end
end