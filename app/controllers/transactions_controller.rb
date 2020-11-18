class TransactionsController < ApplicationController

  def index
    # Display all of the transactions for a particular game or all of the transactions that have changes after the provided from DateTime.
	# This is used directly by the periodic AJAX routine to determine any changes transactions and is also used indirectly by most transaction
	# REST API requests to provide transaction changes back to the AJAX request.
    @game = Game.find(params[:game_id])
	if(params.key?(:from))
	  # Display transactions that have been changed after the from DateTime
	  @transactions = @game.transactions.select{ |trans|  (params[:from].to_time.to_i < trans.created_at.to_time.to_i) }
	  @transactions = @transactions.sort_by{ |t|  t.created_at }
	else
	  # Display all transactions if from DateTime is not provided
	  @transactions = @game.transactions.all
	  @transactions = @transactions.sort_by{ |t|  t.created_at }
	end
  end
  
  def show
    # Shows infromation about a particulat transaction
    @game = Game.find(params[:game_id])
	@transaction = @game.transactions.find(params[:id])
  end

  def new
    # Creates a new transaction
    @game = Game.find(params[:game_id])
    @transaction = @game.transactions.create(transaction_params)
	getTransactions()
    render 'index'
  end
  
  def edit
    # Edit transaction (typically used to update x and y co-ordinates)
    @game = Game.find(params[:game_id])
	@transaction = @game.transactions.find(params[:id])
    @transaction.update(transaction_params)
	getTransactions()
    render 'index'
  end

  def create
    # Create new transaction
    @game = Game.find(params[:game_id])
    @transaction = @game.transactions.create(transaction_params)
	getTransactions()
    render 'index'
  end

  def update
    # Update transaction
    @game = Game.find(params[:game_id])
	@transaction = @game.transactions.find(params[:id])
    @transaction.update(transaction_params)
	getTransactions()
    render 'index'
  end

  def delete
    # Delete transaction
    @game = Game.find(params[:game_id])
	@transaction = @game.transactions.find(params[:id])
	@transaction.destroy
	getTransactions()
    render 'index'
  end
  
  private

  def transaction_params
    params.require(:transaction).permit(:content)
  end
  
  def getTransactions
	if(params.key?(:from))
	  # Display transactions that have been changed after the from DateTime
	  @transactions = @game.transactions.select{ |trans|  (params[:from].to_time.to_i < trans.created_at.to_time.to_i) }
	  @transactions = @transactions.sort_by{ |t|  t.created_at }
	else
	  #Display all transactions if from DateTime is not provided
	  transactions = @game.transactions.all
	  transactions = @transactions.sort_by{ |t|  t.created_at }
	end
  end
	
end
