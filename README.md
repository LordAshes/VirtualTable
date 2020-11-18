# VirtualTable
Implements a Virtual Table for multiples users to interact with objects on the table via the internet.

-------------------
Installation Notes:
-------------------

Ruby On Rails generates a huge number of files for each project but the majority of these files remain unchanged (e.g. are used to run the server, interpret Ruby, etc). As such these "base files" are provided here in two ZIP files (VirtualTable_RubyOnRails_BaseFiles.Zip and VirtualTable_RubyOnRails_BaseFiles.Z01) since they are unlikley to change. Only the "app", "db" and "public" folders are provided individually since the contents of these folders contain the source code and resources that make up the application (i.e. are likely to change).

As such to use this source code, first unzip the base files and then add in the "apps", "db" and "public" folders from this repository.

--------------------
Virtual Table Usage:
--------------------

To Create A New Session:

Go to http://ip/games (where ip is replace with your server ip or name). This will bring up the session page. Either join an existing session or use the link to create a new one. When creating a new session, you will be prompted for a name and to select the desired module. The name is a unique title that you want to give the session so that you can identify it at a later date. The selection of the module determines what obejcts will be available. There are a few sample modules available but additional modules can easily be made by adding a cfg and js file for the modules in public. Select the "Join Session" button to use the newly created session.

Moving Tokens (Objects):

As the instructions on the session page indicate, Virtual Table uses a click-click operation mode as opposed to drag and drop. To move tokens (objects) click on the desired token and then (without dragging) click on some other location to "teleport" the object to.

Selecting Multiple Tokens (Objects):

To select multiple tokens, left click on any background portion of the module (or any locked token) and then, without dragging, move the mouse to the right and down. This will show a yellow rectangle indicating the selection area. Left click once the area encompasses the desires tokens (objects). The selected tokens will turn slightly transparent to indicate that they are selected. At this point single token operations and area selection is not possible until some action is performed on the selected tokens. Rigth click to get the group token menu and select one of the options (or Cancel to cancel the group selection).

Context Menus:

There are three different context menus available in Virtual Table: token, background and group. If a single token is right clicked then the singel token context menu will come up (unless the group of tokens is currently selected). This context menu typically offers singel token actions appropriate for the module. If the background or a locked token is right clicked then the background context menu is displayed (unless the group of tokens is currently selected). This context menu is used less frequently and typically contains the action to unlock a token. If a group of tokens is selected then right clicking will bring up the group context menu. This menu is typically used to perform actions on each of the selected tokens. The context menus are configured as part of the mdoule configuration and thus only appropriate selection should be available. It should be noted that the context menus are not token specific and thus may provide actions which are not appropriate for the selected token. For example, a module that has both cards and dice may have a Flip action (intended for card tokens) and a Roll action (intended for dice tokens). Both of these actions will appear regardless if a card or die token is selected.  

Token States:

Objects, which are called Tokens in Virtual Table, have one or more state. States determine the apperance of a token. A poker chitp, for example, would likely have one state. Sure, a real poker chip could be flipped over but since both sides are similar and there is no significance to the chip being one way or the other, one state would be sufficient. A card, on the other hand, would likely have two state: face down and face up. A regular six side die would, likely, have 6 states (one for each side). A hero token could have 3 or more states such as unhurt, hurt and dead. The number of states that each token has is up to the designed or the module. The context menus provide appropriate actions for changing these states. A card module may have a Flip action which changes between face down and face up (and vice versa) while a dice module may have a Roll action.   
Ownership:

All tokens have an owner. Tokens which are intende dto be used by anyone have the location (owner) of Table. Any token that has the loction Table shows its true state to all players. If a token's location changes to a player then it shows its first state (as opposed to current state) to all players who do not match the location and it shows it actual current state to only the player that matches the location. Thus, for example, if a card token's first state is the face down state and its second state is the face up state, the owner would the current face up state (assuming the card was face up) while others would see the (first) face down state.

When a token's location is not Table, the token gets a drop shadow indicating that it is owned by someone. The drop shadow is colored to match the player if the player owns that token or is colored in black if a different player owns the token. A tool tip on the token indicates which player (or Table) has ownership of the token.

Player name and color can be set at the top of the game session (unless relocated elsewhere).  

Chat:

The Virtual Table contains a transaction log & chat. Each time any user takes any action it is added to the transaction log for other to see. This way if a user needs to step away from the computer, there is a log of what the other users did in the meantime.


 
