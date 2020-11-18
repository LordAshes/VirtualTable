# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_11_16_235358) do

  create_table "games", force: :cascade do |t|
    t.string "title"
    t.string "module"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "tokens", force: :cascade do |t|
    t.string "title"
    t.integer "x"
    t.integer "y"
    t.integer "z"
    t.integer "rotation"
    t.text "state"
    t.text "states"
    t.text "location"
    t.text "locked"
    t.integer "game_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["game_id"], name: "index_tokens_on_game_id"
  end

  create_table "transactions", force: :cascade do |t|
    t.string "content"
    t.integer "game_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["game_id"], name: "index_transactions_on_game_id"
  end

  add_foreign_key "tokens", "games"
  add_foreign_key "transactions", "games"
end
