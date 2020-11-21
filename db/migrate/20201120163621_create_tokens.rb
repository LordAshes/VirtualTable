class CreateTokens < ActiveRecord::Migration[6.0]
  def change
    create_table :tokens do |t|
      t.text :title
      t.integer :x
      t.integer :y
      t.integer :z
      t.integer :rotation
      t.text :state
      t.text :states
      t.integer :bright
      t.integer :dim
      t.text :eyes
      t.text :location
      t.text :locked
      t.references :game, null: false, foreign_key: true

      t.timestamps
    end
  end
end
