class Api::V1::ArticlesController < ApplicationController
  before_action :set_article, only: %i[show destroy]

  def index
    articles = Article.all.order(created_at: :desc)
    render json: articles
  end

  def create
    # The article_params is a private method where you allow your controller parameters to prevent wrong or malicious content from getting into your database
    article = Article.create!(article_params)
    if article
      render json: article
    else
      render json: article.errors
    end
  end

  def show
    # give instance variable
    render json: @article
  end

  # GET /articles/edit/
  def edit
    # first, find existing article
    @article = Article.find(params[:id])

    if @article.respond_to?(:to_s)
      # update given article with parameters
      # do not Article.update(article_params), you will update all the articles
      @article.update(article_params)
      #Handle a successful update, render article
      render json: @article
    else
      render json: { message: "An error has occurred" }
    end
  end

  def destroy
    @article&.destroy
    render json: { message: "Article deleted!" }
  end

  def article_params
    params.permit(:title, :description)
  end

  def set_article
    @article = Article.find(params[:id])
  end
end
