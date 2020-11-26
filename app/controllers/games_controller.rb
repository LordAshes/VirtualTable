require 'json'

class GamesController < ApplicationController

  def index
    # Display all games.
    @games = Game.all
  end

  def show
    # Display a particular game.
	@games = Game.all
    @game = Game.find(params[:id])
  end

  def new
    # Display new game page (uses create to actually create new game).
  end
  
  def edit
    # Edits parameters of a particular game
    @game = Game.find(params[:id])
	@game.update(game_params)
	# Displays all games
	@games = Game.all
    render 'index'
  end
  
  def create
    # Creates new game based on the parameters entered in on the new render (or similar source)
    @game = Game.new(game_params)
	@game.save
	# Reads the specified module configuration file and create all of the specified tokens
	@data = File.read(File.dirname(__FILE__).to_s+"/../../public/"+@game.module+".module.cfg")
	@feedback = ""
	@data.split("\n").each do |line|
	  if(line.downcase.include? "state")
	    @game.tokens.create(JSON.parse(line))
		@msg = JSON.parse(line).to_s.gsub! "\"", "'"
		# @game.transactions.create(JSON.parse("{\"content\": \"Added "+@msg+"\"}"));
	  end
	end
	# Displays all games
	@games = Game.all
	render 'index'
  end
  
  def update
    # Updates parameters of a particular game
    @game = Game.find(params[:id])
	@game.update(game_params)
	# Displays all games
	@games = Game.all
    render 'index'
  end
  
  def destroy
    # Destroys a particular game
    @game = Game.find(params[:id])
	@game.destroy
	# Displays all games
	@games = Game.all
    render 'index'
  end
  
  private

  def game_params
    params.require(:game).permit(:title, :module)
  end

end
