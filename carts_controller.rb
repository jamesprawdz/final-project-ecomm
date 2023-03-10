class CartsController < ApplicationController

    def index
        render json: Cart.all
    end
 
    def show
        @cart = Cart.find(params[:id])
        render json: current_user.cart, status: :ok
    end


    def destroy
        @cart = @current_cart
        @cart.destroy
        session[:cart_id] = nil
    end
end
