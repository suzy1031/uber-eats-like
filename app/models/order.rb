class Order < ApplicationRecord
  has_many :line_foods
  has_one :restaurant, through: :line_food

  validates :total_price, numericality: { greater_than: 0 }
  # トランザクション処理
  # line_foods(配列)を受け取る
  # 配列をeachで展開
  # 一つ一つの配列を更新していく
  # active: true => falseに更新
  # self => order自身
  def save_with_update_line_foods!(line_foods)
    ActiveRecord::Base.transaction do
      line_foods.each do |line_food|
        line_food.update_attributes!(active: false, order: self)
      end
      self.save!
    end
  end
end