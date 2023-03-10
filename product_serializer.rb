class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :image, :price, :stock
end
