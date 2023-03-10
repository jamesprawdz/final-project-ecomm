class SessionsController < ApplicationController
  skip_before_action :authorize, only: [:create]
  
  # def create
  #   user = User.find_by(email: params[:email])
  #   if user&.authenticate(params[:password])
  #     # Save the user's previous cart and create a new cart for the session
  #     previous_cart = current_cart
  #     session[:cart_id] = nil
  #     current_user = user
  #     session[:user_id] = user.id

  #     # If the user had a previous cart, merge it with the new cart
  #     if previous_cart
  #       current_cart.merge(previous_cart)
  #     end

  #     render json: user, status: :ok
  #   else
  #     render json: { errors: ['Invalid email or password'] }, status: :unauthorized
  #   end
  # end

  # def create
  #   user = User.find_by(email: params[:email])

  #   if user && user.authenticate(params[:password])
  #     session[:user_id] = user.id

  #     # Find or create a new cart for the user
  #     if user.cart.nil?
  #       cart = Cart.create(user: user)
  #     else
  #       cart = user.cart
  #     end

  #     # If there is an existing cart in the session, merge it with the user's cart
  #     if session[:cart_id]
  #       previous_cart = Cart.find_by(id: session[:cart_id])
  #       cart.merge(previous_cart) if previous_cart
  #     end

  #     session[:cart_id] = cart.id

  #     render json: user, status: :ok
  #   else
  #     render json: { errors: ['Invalid email or password'] }, status: :unauthorized
  #   end
  # end
  

  # def create
  #   user = User.find_by(email: params[:email])

  #   if user && user.authenticate(params[:password])
  #     session[:user_id] = user.id

  #     # Find or create a new cart for the user
  #     if user.cart.nil?
  #       cart = Cart.create(user_id: user_id)
  #     else
  #       cart = user.cart
  #     end

  #     # If there is an existing cart in the session, merge it with the user's cart
  #     if session[:cart_id]
  #       previous_cart = Cart.find_by(id: session[:cart_id])
  #       cart.merge(previous_cart) if previous_cart
  #     end

  #     session[:cart_id] = cart.id

  #     render json: user, status: :ok
  #   else
  #     render json: { errors: ['Invalid email or password'] }, status: :unauthorized
  #   end
  # end

  # it was a journey -_-

  def create
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      #think below should be changed without the p ;)
      session[:user_id]
      render json: user, status: :ok
    else 
      render json: {errors: ["Invalid username or password"]}, status: :unauthorized
    end
  end


  def destroy
    session.delete :user_id
    head :no_content
  end

end
