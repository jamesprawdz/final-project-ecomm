class CreateOrders < ActiveRecord::Migration[7.0]
  def change
    create_table :orders do |t|
      t.references :user, null: false, foreign_key: true
      # t.decimal :total_amount, precision: 10, scale: 2, null: false
      # t.string :status, null: false
      # t.string :payment_method, null: false
      # t.string :payment_status, null: false
      # t.string :shipping_address, null: false
      # t.string :billing_address, null: false
      t.timestamps
    end
  end
end
