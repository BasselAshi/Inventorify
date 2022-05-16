class CreateDeletions < ActiveRecord::Migration[7.0]
  def change
    create_table :deletions do |t|
      t.text :comment
      t.references :item, null: false, foreign_key: true

      t.timestamps
    end
  end
end
