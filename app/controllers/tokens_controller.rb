require 'json'

class TokensController < ApplicationController

  def index
    # Display all of the tokens for a particular game or all of the tokens that have changes after the provided from DateTime.
	# This is used directly by the periodic AJAX routine to determine any changes tokens and is also used indirectly by most token REST API requests to provide token changes back to the AJAX request.
    @game = Game.find(params[:game_id])
	if(params.key?(:from))
	  # Display tokens that have been changed after the from DateTime
	  @tokens = @game.tokens.select{ |token|  (params[:from].to_time.to_i < token.updated_at.to_time.to_i) }
	  @tokens = @tokens.sort_by{ |t|  t.updated_at }
	  @feedback = "["+params[:from]+"]"
	else
	  # Display all tokens if from DateTime is not provided
	  @tokens = @game.tokens.all
	  @tokens = @tokens.sort_by{ |t|  t.updated_at }
	end
  end
  
  def show
    # Shows infromation about a particulat token
    @game = Game.find(params[:game_id])
	@token = @game.tokens.find(params[:id])
  end

  def new
    # Creates a new token
    @game = Game.find(params[:game_id])
    @token = @game.tokens.create(token_params)
	getTokens()
    render 'index'
  end
  
  def edit
    # Edit token (typically used to update x and y co-ordinates)
    @game = Game.find(params[:game_id])
	@token = @game.tokens.find(params[:id])
    @token.update(token_params)
	if(params.key?"record")
	  @game.transactions.create(JSON.parse("{\"content\": \""+params[:player]+" moved "+getVisibleName(@token.title)+" to "+@token.x.to_s+","+@token.y.to_s+","+@token.z.to_s+"\"}"))
	end
	getTokens()
    render 'index'
  end

  def create
    # Create new token
    @game = Game.find(params[:game_id])
    @token = @game.tokens.create(token_params)
	getTokens()
    render 'index'
  end

  def update
    # Update token
    @game = Game.find(params[:game_id])
	@token = @game.tokens.find(params[:id])
    @token.update(token_params)
	if(params.key?"record")
	  @game.transactions.create(JSON.parse("{\"content\": \""+params[:player]+" moved "+getVisibleName(@token.title)+" To "+@token.x.to_s+","+@token.y.to_s+","+@token.z.to_s+"\"}"))
	end
	getTokens()
    render 'index'
  end

  def delete
    # Delete token
    @game = Game.find(params[:game_id])
	@token = @game.tokens.find(params[:id])
	@token.destroy
	getTokens()
    render 'index'
  end
  
  def take
    # Sets token location to the indicated value
    @game = Game.find(params[:game_id])
	@token = @game.tokens.find(params[:id])
	@token.location = params[:player];
	@token.save
	if(params.key?"record")
	  @game.transactions.create(JSON.parse("{\"content\": \""+params[:player]+" took "+getVisibleName(@token.title)+"\"}"))
	end
	getTokens()
	render 'index'
  end
  
  def drop
    # Sets token location to Table
    @game = Game.find(params[:game_id])
	@token = @game.tokens.find(params[:id])
	@token.location = "Table";
	@token.save
	if(params.key?"record")
	  @game.transactions.create(JSON.parse("{\"content\": \""+params[:player]+" dropped "+getVisibleName(@token.title)+"\"}"))
	end
	getTokens()
	render 'index'
  end

  def first
    # Sets token to its first state
    @game = Game.find(params[:game_id])
	@token = @game.tokens.find(params[:id])
    @states = @token.states.split(',')
	@token.state = @states[0];
	@token.save
	if(params.key?"record")
	  @game.transactions.create(JSON.parse("{\"content\": \""+params[:player]+" set "+getVisibleName(@token.title)+" to first state "+getVisibleName(@token.state)+"\"}"))
	end
	getTokens()
	render 'index'
  end
  
  def prev
    # Sets token to its previous state (if available)
    @game = Game.find(params[:game_id])
	@token = @game.tokens.find(params[:id])
    @states = @token.states.split(',')
	@index = @states.find_index(@token.state)
	if(@index>0)
	  @index=@index-1
	end
	@token.state = @states[@index];
	@token.save
	if(params.key?"record")
	  @game.transactions.create(JSON.parse("{\"content\": \""+params[:player]+" set "+getVisibleName(@token.title)+" to previous state "+getVisibleName(@token.state)+"\"}"))
	end
	getTokens()
	render 'index'
  end

  def state
    # Sets token to its first state
    @game = Game.find(params[:game_id])
	@token = @game.tokens.find(params[:id])
    @states = @token.states.split(',')
	@token.state = @states[params[:state].to_i];
	@token.save
	if(params.key?"record")
	  @game.transactions.create(JSON.parse("{\"content\": \""+params[:player]+" set "+getVisibleName(@token.title)+" to state "+getVisibleName(@token.state)+"\"}"))
	end
	getTokens()
	render 'index'
  end
  
  def next
    # Sets token to its next state (if available)
    @game = Game.find(params[:game_id])
	@token = @game.tokens.find(params[:id])
    @states = @token.states.split(',')
	@index = @states.find_index(@token.state)
	if(@index<(@states.length-1))
	  @index=@index+1
	end
	@token.state = @states[@index];
	@token.save
	if(params.key?"record")
	  @game.transactions.create(JSON.parse("{\"content\": \""+params[:player]+" set "+getVisibleName(@token.title)+" to next state "+getVisibleName(@token.state)+"\"}"))
	end
	getTokens()
	render 'index'
  end

  def cycle
    # Sets token to its next state or first state if token was at last state
    @game = Game.find(params[:game_id])
	@token = @game.tokens.find(params[:id])
    @states = @token.states.split(',')
	@index = @states.find_index(@token.state)
	if(@index<(@states.length-1))
	  @index=@index+1
	else
	  @index=0
	end
	@token.state = @states[@index];
	@token.save
	if(params.key?"record")
	  @game.transactions.create(JSON.parse("{\"content\": \""+params[:player]+" cycled "+getVisibleName(@token.title)+" state to "+getVisibleName(@token.state)+"\"}"))
	end
	getTokens()
	render 'index'
  end
  
  def roll
    # Sets token to a random state
    @game = Game.find(params[:game_id])
	@token = @game.tokens.find(params[:id])
    @states = @token.states.split(',')
	@token.state = @states[rand(@states.length)];
	@token.save
	if(params.key?"record")
	  @game.transactions.create(JSON.parse("{\"content\": \""+params[:player]+" rolled "+getVisibleName(@token.title)+" to state "+getVisibleName(@token.state)+"\"}"))
	end
	getTokens()
	render 'index'
  end

  def last
    # Sets token to its last state
    @game = Game.find(params[:game_id])
	@token = @game.tokens.find(params[:id])
    @states = @token.states.split(',')
	@token.state = @states[@states.length-1];
	@token.save
	if(params.key?"record")
	  @game.transactions.create(JSON.parse("{\"content\": \""+params[:player]+" set "+getVisibleName(@token.title)+" to last state "+getVisibleName(@token.state)+"\"}"))
	end
	getTokens()
	render 'index'
  end

  def rotate
    # Adjusts tokens rotation value by specificed amount
    @game = Game.find(params[:game_id])  
	@token = @game.tokens.find(params[:id])
	@token.rotation = @token.rotation.to_i + params[:rotate].to_i
	# Align rotation to be between 0 and 360
	if(@token.rotation < 0)
	  @token.rotation = @token.rotation + 360
	end
	if(@token.rotation > 360)
	  @token.rotation = @token.rotation - 360
	end
	@token.save
	if(params.key?"record")
	  @game.transactions.create(JSON.parse("{\"content\": \""+params[:player]+" rotated "+getVisibleName(@token.title)+" by "+params[:rotate]+" degrees\"}"))
	end
	getTokens()
	render 'index'	
  end

  def lock
    # Adjust token locked value to locked.
    @game = Game.find(params[:game_id])  
	@token = @game.tokens.find(params[:id])
	@token.locked = "Locked";
	@token.save
	if(params.key?"record")
	  @game.transactions.create(JSON.parse("{\"content\": \""+params[:player]+" locked "+getVisibleName(@token.title)+"\"}"))
	end
	getTokens()
	render 'index'
  end
  
  def unlock
    # Adjust token locked value to unlocked.
    @game = Game.find(params[:game_id])  
	@token = @game.tokens.find(params[:id])
	@token.locked = "Unlocked";
	@token.save
	if(params.key?"record")
	  @game.transactions.create(JSON.parse("{\"content\": \""+params[:player]+" unlocked "+getVisibleName(@token.title)+"\"}"))
	end
	getTokens()
	render 'index'
  end
  
  def back
    # Adjust token z value to lowest. Requires reorder REST API call afterwards to re-order tokens.
	# Reorder uses values 10 and up. This sets value to 8 so that after re-order this token will be first.
    @game = Game.find(params[:game_id])  
	@token = @game.tokens.find(params[:id])
	@token.z = 8;
	@token.save
	if(params.key?"record")
	  @game.transactions.create(JSON.parse("{\"content\": \""+params[:player]+" send "+getVisibleName(@token.title)+" to the back\"}"))
	end
	getTokens()
	render 'index'
  end
  
  def front
    # Adjust token z value to highest. Requires reorder REST API call afterwards to re-order tokens.
	# Reorder uses values 10 and up. This sets value to 999 so that after re-order this token will be last.
    @game = Game.find(params[:game_id])  
    @token = @game.tokens.find(params[:id])
	@token.z = 999;
	@token.save
	if(params.key?"record")
	  @game.transactions.create(JSON.parse("{\"content\": \""+params[:player]+" send "+getVisibleName(@token.title)+" to the front\"}"))
	end
	getTokens()
	render 'index'
  end
  
  def reorder
    # Reorders tokens by sorting them according to the z value and then re-writing the z values
	# with incremental numbers starting at 10. 
    @game = Game.find(params[:game_id])  
	@tokens = @game.tokens.all
	@tokens = @tokens.sort_by{ |t|  t.z }
	@index = 10
	@feedback = ""
	@tokens.each do |token|
	  @feedback = @feedback + "Set "+token.title+" from "+token.z.to_s+" to "
	  token.z = @index
	  token.save
	  @feedback = @feedback + token.z.to_s+", "
      @index = @index + 1	  
	end 
	if(params.key?"record")
	  @game.transactions.create(JSON.parse("{\"content\": \"System reorder tokens\"}"))
	end
	render 'index'
  end

  private
    def token_params
      params.require(:token).permit(:title, :x, :y, :z, :rotation, :state, :states, :location, :locked)
    end
	
    def getTokens
	  if(params.key?(:from))
	    # Display tokens that have been changed after the from DateTime
	    @tokens = @game.tokens.select{ |token|  (params[:from].to_time.to_i < token.updated_at.to_time.to_i) }
	    @tokens = @tokens.sort_by{ |t|  t.updated_at }
	  else
		# Display all tokens if from DateTime is not provided
		@tokens = @game.tokens.all
		@tokens = @tokens.sort_by{ |t|  t.updated_at }
	  end
	end
	
	def getVisibleName(tk)
	  if(tk.include?"(")
	    tk = tk[0,tk.index('(')]
	  end
	  return tk
	end
	
end
