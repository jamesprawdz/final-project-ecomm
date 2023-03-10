class OrdersController < ApplicationController

    def create
        order = Order.create!(order_params)
        current_user.cart.cart_items.destroy_all # This line clears the cart items from the cart when an order is created.
        render json: order, status: :created
    end
    
    private

    def order_params
        params.require(:order).permit(:user_id, :total)
    end

   
end
