class Item < ApplicationRecord
  has_many :deletions, dependent: :destroy

  validates_presence_of :name, presence: true, message: "is missing"
  validates_presence_of :price, presence: true, message: "is missing"

  attr_accessor :comment
  attr_accessor :deletion
end
