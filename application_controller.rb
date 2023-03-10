class ApplicationController < ActionController::API
rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found_response
rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    include ActionController::Cookies
    before_action :authorize

    private

    def render_record_not_found_response(exception)
        render json: { error: "#{exception.model} not found" }, status: :not_found
    end

    def render_unprocessable_entity_response(exception)
        render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end

    # helper method to keep track of current user
    
    def current_user
        @current_user ||= User.find_by(id: session[:user_id])
    end

    def cart_params
        params.require(:cart).permit(:user_id)
    end

    def current_cart
        if session[:user_id]
          @current_cart ||= Cart.find_by(user_id: session[:user_id])
        else
          @current_cart = nil
        end
      end


    def authorize
        render json: {errors: ["Not authorized"]}, status: :unauthorized unless current_user
    end
    
end
