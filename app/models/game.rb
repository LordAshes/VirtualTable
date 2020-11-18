class Game < ApplicationRecord
  has_many :tokens, dependent: :destroy
  has_many :transactions, dependent: :destroy
end
