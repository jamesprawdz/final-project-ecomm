class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create, :index, :show]
    
    def index
        render json: User.all
    end

    def show
        if current_user
            render json: current_user, status: :ok, serializer: UserWithCartSerializer
        else
            render json: { errors: ['Not authorized'] }, status: :unauthorized
        end
    end

    def create
        user = User.create!(user_params) # create a new user with User.create! and pass the user_params to it, which will create a user based on the information in the request body
        if user.valid? # if the user is valid, meaning if the user meets the validations in the model
            session[:user_id] = user.id # set the session user_id to the user.id
            @cart = Cart.create(user_id: user.id) # create a new cart for the user
            render json: user, status: :created # render back the user as JSON
        else 
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity # if the user is not valid, render back the errors as JSON
        end
    end

    def account_info
        if session[:user_id]
          user = User.find(session[:user_id])
          render json: {
            email: user.email,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name
          }
        else
          render json: { error: 'User not logged in' }, status: :unauthorized
        end
      end

    private

    def user_params
        params.permit(:email, :username, :first_name, :last_name, :password)
    end
end
