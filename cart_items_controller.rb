class CartItemsController < ApplicationController

  def index
    render json: current_user.cart_items
  end

  def create
    cart_item = CartItem.create!(cart_item_params)
    render json: cart_item, status: :created
  end

  def update
    cart_item = CartItem.find(params[:id])
    cart_item.update(cart_item_params)
    render json: cart_item
  end

  def destroy
    cart_item = CartItem.find(params[:id])
    cart_item.destroy
    render json: cart_item
  end

  private
    def cart_item_params
      params.require(:cart_item).permit(:quantity, :product_id, :cart_id)
    end

end