class CreateCarts < ActiveRecord::Migration[7.0]
  def change
    create_table :carts do |t|
      # t.integer :sub_total, default: 0
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
