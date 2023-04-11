class CreateArticles < ActiveRecord::Migration[7.0]
  def change
    create_table :articles do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.string :image
      t.datetime :deleted_at
      t.boolean :active, default: true

      t.timestamps
    end
  end
end
