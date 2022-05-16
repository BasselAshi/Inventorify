class ItemsController < ApplicationController
  def index
    @items = Item.where(:deletion_id => nil).all
    @deleted_successfully = params[:deleted]
  end

  def deleted
    @items = Item.where.not(:deletion_id => nil).all
    @items.each do |item|
      item.deletion = Deletion.find(item.deletion_id)
    end
  end

  def show
    @item = Item.find(params[:id])
  end

  def new
    @item = Item.new
  end

  def create
    @item = Item.new(item_params)

    if @item.save
      redirect_to root_path
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @item = Item.find(params[:id])
    @deletion = Deletion.new
  end

  def update
    @item = Item.find(params[:id])

    if @item.update(item_params)
      redirect_to root_path
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    item = Item.find(params[:id])
    item.deletion_id = item.deletions.create(destroy_item_params).id
    item.save

    redirect_to root_url('deleted' => item.name)
  end

  private
    def item_params
      if params[:item][:deletion_id] == "nil"
        params[:item][:deletion_id] = nil
      end
      params.require(:item).permit(:name, :price, :deletion_id)
    end
    def destroy_item_params
      params.require(:item).permit(:comment)
    end
end
