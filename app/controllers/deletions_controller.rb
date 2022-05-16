class DeletionsController < ApplicationController
  def create
    @item = Item.find(params[:item_id])
    @deletion = @item.deletions.create(deletion_params)
    redirect_to items_path(@item)
  end

  private
  def deletion_params
    params.require(:deletion).permit(:comment)
  end
end
