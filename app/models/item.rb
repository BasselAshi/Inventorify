class Item < ApplicationRecord
  has_many :deletions, dependent: :destroy

  validates :name, presence: true
  validates :price, presence: true
end
