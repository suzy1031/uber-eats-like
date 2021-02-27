module Api
  module V1
    class LineFoodsController < ApplicationController
      # コールバック
      before_action :set_food, only: %i[create replace]

      def index
        # active: trueのみ取得
        line_foods = LineFood.active
        # 例外判定
        if line_foods.exists?
          # 初期化
          line_food_ids = []
          count = 0
          amount = 0

          line_foods.each do |line_food|
            line_food_ids << line_food.id # [1,2,3]
            # {id:1 count:1}, {id:2 count: 2} = count => 3
            count += line_food[:count]
            # {id:1 total_amount: ¥500}, {id: 2 total_amount: ¥600} = total_amount => ¥1100
            amount += line_food.total_amount
          end
          render json: {
            line_food_ids: line_food_ids,
            restaurant: line_foods[0].restaurant,
            count: count,
            amount: amount
          }, status: :ok
        else
          render json: {}, status: :no_content
        end
      end

      def create
        # models内のscopeで書かれたsql
        # active = active: trueのみ
        # other_restaurant = 仮注文中のfood.restaurant_idと新仮注文したfood.restaurant_idが一致しない条件
        # exist? = 存在する場合
        if LineFood.active.other_restaurant(@ordered_food.restaurant.id).exists?
          return render json: {
            # [{"existing_restaurant": "レストラン_0",
            # "new_restaurant": "レストラン_1"}]
            # 上記の形のjsonを返す
            existing_restaurant: LineFood.other_restaurant(@ordered_food.restaurant.id).first.restaurant.name,
            new_restaurant: Food.find(params[:food_id]).restaurant.name,
          }, status: :not_acceptable
        end
        # if文に入らない正常の注文の場合,set_line_foodインスタンスを生成
        set_line_food(@ordered_food)

        if @line_food.save
          render json: {
            line_food: @line_food
          }, status: :created
        else
          render json: {}, status: :internal_server_error
        end
      end

      def replace
        # statusをfalseに更新
        LineFood.active.other_restaurant(@ordered_food.restaurant.id).each do |line_food|
          line_food.update_attribute(:active, false)
        end
        # @line_foodを生成
        set_line_food(@ordered_food)

        if @line_food.save
          render json: {
            line_food: @line_food
          }, status: :created
        else
          render json: {}, status: :internal_server_error
        end
      end

      private

      def set_food
        @ordered_food = Food.find(params[:food_id])
      end

      def set_line_food(ordered_food)
        # 既に仮注文がある場合
        if ordered_food.line_food.present?
          @line_food = ordered_food.line_food
          # 金額と個数を更新する
          @line_food.attributes = {
            count: ordered_food.line_food.count + params[:count],
            active: true
          }
        else
          # 新規の仮注文の場合
          @line_food = ordered_food.build_line_food(
            count: params[:count], # 個数
            restaurant: ordered_food.restaurant, # レストラン名
            active: true # 状態
          )
        end
      end
    end
  end
end