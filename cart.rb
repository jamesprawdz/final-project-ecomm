class Cart < ApplicationRecord
  belongs_to :user, optional: true
  has_many :cart_items, dependent: :destroy


  # def merge(previous_cart)
  #   previous_cart.cart_items.each do |previous_item|
  #     current_item = cart_items.find_by(product_id: previous_item.product_id)
  #     if current_item
  #       # If the item is already in the cart, update its quantity
  #       current_item.update(quantity: current_item.quantity + previous_item.quantity)
  #     else
  #       # If the item is not in the cart, create a new cart item with the same product and quantity
  #       cart_items.create(product: previous_item.product, quantity: previous_item.quantity)
  #     end
  #   end
  # end

  # def merge(previous_cart)
  #   previous_cart.cart_items.each do |previous_item|
  #     current_item = CartItem.find_by(product_id: previous_item.product_id)
  #     if current_item
  #       # If the item is already in the cart, update its quantity
  #       current_item.update!(quantity: current_item.quantity + previous_item.quantity)
  #     else
  #       # If the item is not in the cart, create a new cart item with the same product and quantity
  #       CartItem.create(product: previous_item.product, quantity: previous_item.quantity)
  #     end
  #   end
  # end
  

  def total
    sum = 0
    self.cart_items.each do |cart_item|
      sum+= cart_item.item_price 
      # total = sum
    end
    return sum
  end

end
