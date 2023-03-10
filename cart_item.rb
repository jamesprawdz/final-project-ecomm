class CartItem < ApplicationRecord
  belongs_to :cart
  belongs_to :product
  belongs_to :order, optional: true

  # def item_price
  #   self.quantity * self.product.price
  # end
  
  def item_price
    if self.quantity
      self.quantity * self.product.price
    else
      0
    end
  end

end
