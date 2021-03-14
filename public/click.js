  // Note: Requires global game_id variable to be setup with the game id
  
  // Variable for holding data about the currently grabbed token [element_id,x,y,token_id] 
  var holding = "";
  var clickedObject = "";
  
  // Array for holding names of multi selected tokens
  var selected = []
  
  // Variable for holding the last datetime of the last updated item. Used to get only new updates from the server.
  var from="2020-01-01 12:00:00 UTC";
  
  // Variable to determine if area drag is on
  var drag = false;
    
  // Used to initialize the play area when the page is loaded  
  function initializeClicks()
  {
	// Game id validation
	if(typeof(game_id)==="undefined") { alert("Missing global game_id variable setup!"); }
    // Add a handler for right clicks (context menu)
    document.addEventListener( 'contextmenu', function(e) { 'use strict'; showMenu(e); e.preventDefault(); } );
	
	var zoom = document.createElement("IMG");
	zoom.id = "Zoom";
	zoom.src = "";
	zoom.style.position = "absolute";
	zoom.style.pointerEvents = "none";
	zoom.style.visibility = "hidden";
	zoom.style.left = settings["Zoom"]["x"]+"px";
	zoom.style.top = settings["Zoom"]["y"]+"px";
	document.body.appendChild(zoom);
  }
  
  // Handler for left clicks (grab/drop)
  function clickHandler(id,el)
  {
	// Prevent left click operations if a group of tokens is selected
	if(selected.length>0){return;}
	
    // If not holding anyting then click is a grab
    if(holding=="")
	{
	  // Grab Token (if it is not locked)
      tk = document.getElementById(el+"_"+id);
	  if(typeof(tk)!=="undefined"  && tk!==null)
	  {
		if(tk.className.indexOf("Locked")<0)
		{
		  // Highlight token to indicate it is selected
	      tk.style.border = "1px solid red";
	      tk.style.backgroundColor = "rgba(255, 0, 0, 0.10)";
		  // Update holding data
	      holding = [el, event.clientX-parseInt(tk.style.left), event.clientY-parseInt(tk.style.top), id];
		}
		else
		{
		  // Start area selection (area drag stops are handled by the area objects and not this click handler)
		  dragStart();
		}
		clickedObject = [el, event.clientX-parseInt(tk.style.left), event.clientY-parseInt(tk.style.top), id];
	  }
	}
	else
	{
	  // Drop Token
	  tk = document.getElementById(holding[0]+"_"+holding[3]);
	  // Remove highlight
	  tk.style.border = "";
	  tk.style.backgroundColor = "rgba(0, 0, 0, 0.00)";
	  // Determine new x and y position
	  var x = event.clientX - holding[1];
	  var y = event.clientY - holding[2];
	  var token_id = holding[3];
	  // If this was not a context menu request (id=-1 when request is a context menu request) update the token data using a REST API call
	  if(id!=-1)
	  {
		$.ajax({ url: "/games/"+game_id+"/tokens/"+token_id+"/edit?player="+document.getElementById('player').value+"&from="+from+"&token[x]="+x+"&token[y]="+y+"&record=true" })
		.done(function(data)
		{
			$.ajax({ url: "/games/"+game_id+"/tokens/"+token_id+"/front?player="+document.getElementById('player').value+"&game_id="+game_id+"&id="+token_id+"&from="+from })
			.done(function(data)
			{
				$.ajax({ url: "/games/"+game_id+"/tokens/"+token_id+"/reorder?player="+document.getElementById('player').value+"&game_id="+game_id+"&id="+token_id+"&from="+from })
				.done(function(data){ update(data);});
			});
		});
	  }
	  // Clear holding data 
	  holding = "";
	}
	// Stop event propagation to only select the top token
	event.stopPropagation();
  }
  
  // Cancel selection without performing an operation
  function deselect()
  {
	  // Get Token
	  tk = document.getElementById(holding[0]+"_"+holding[3]);
	  if(typeof(tk)!=="undefined" && tk!==null)
	  {
	    // Remove highlight
	    tk.style.border = "";
	    tk.style.backgroundColor = "rgba(0, 0, 0, 0.00)";
	  }
	  // Clear holding data 
	  holding = "";
  }
  
  // Function for displaying the context menu
  function showMenu(e)
  {
    // Click mouse area to select the token
    var x = parseInt(e.clientX);
	var y = parseInt(e.clientY);
    document.elementFromPoint(x,y).click();
	// Build the context menu
	var content = "";
	if(selected.length>0)
	{
	  for(var property in contextMenuOptionsForGroup)
	  {
	    // If context menu item does not start with a minus then add it as a button to the menu content
	    if(property.substring(0,1)!="-")
	    {
          content = content + "<button onClick=\"document.body.removeChild(document.getElementById('ContextMenu')); executeGroupMenu('"+contextMenuOptionsForGroup[property]+"',"+(x-parseInt(document.getElementById("Table_0").style.left))+","+(y-parseInt(document.getElementById("Table_0").style.top))+"); \" style='Width: 120px;'>"+property+"</button><BR>";
	    }
	    // If context menu item starts with a minus then add it as a break in the menu content
	    else
	    {
		  // Use the action for break entries to determine if the break is a label or a line. If value is blank, a line is created. If value is not blank it is used as the label value. 
		  if(contextMenuOptionsForGroup[property]=="")
		  {
			content = content + "<span style='font-size: 2pt;'><HR></span>";
		  }
		  else
		  {
			content = content + "<span style='font-size: 8pt;'>"+contextMenuOptionsForGroup[property]+"<BR></span>";
		  }
	    }
      }
	}
	else if(document.getElementById(clickedObject[0]+"_"+clickedObject[3]).className.indexOf("Locked")>-1)
	{
	  for(var property in contextMenuOptionsForBackground)
	  {
	    // If context menu item does not start with a minus then add it as a button to the menu content
	    if(property.substring(0,1)!="-")
	    {
          content = content + "<button onClick=\"document.body.removeChild(document.getElementById('ContextMenu')); executeMenu('"+clickedObject[3]+"','"+contextMenuOptionsForBackground[property]+"&x="+x+"&y="+y+"'); clickHandler('-1','"+clickedObject[0]+"'); \" style='Width: 120px;'>"+property+"</button><BR>";
	    }
	    // If context menu item starts with a minus then add it as a break in the menu content
	    else
	    {
	      content = content + "<span style='font-size: 2pt;'><HR></span>";
	    }
      }
	}
	else
	{
	  for(var property in contextMenuOptionsForToken)
	  {
	    // If context menu item does not start with a minus then add it as a button to the menu content
	    if(property.substring(0,1)!="-")
	    {
          content = content + "<button onClick=\"document.body.removeChild(document.getElementById('ContextMenu')); executeMenu('"+clickedObject[3]+"','"+contextMenuOptionsForToken[property]+"'); clickHandler('-1','"+clickedObject[0]+"'); \" style='Width: 120px;'>"+property+"</button><BR>";
	    }
	    // If context menu item starts with a minus then add it as a break in the menu content
	    else
	    {
	      content = content + "<span style='font-size: 2pt;'><HR></span>";
	    }
      }
	}
	if(content!="")
	{
	  // Create the context menu element dynamically and add it to the page
      var div = document.createElement("div");
	  div.id = "ContextMenu";
	  div.innerHTML=content;
	  div.style = "Position: Absolute; Left:"+e.clientX+"px; Top:"+e.clientY+"px; z-Index: 2;";
	  document.body.appendChild(div);
	}
  	dragAbort();
  }
  
  // Function for executing a context menu selection
  function executeMenu(token,actions)
  {
	dragAbort();
    // Break out the actions string into individual acions
    actions = actions + ","
    var action = actions.split(',')[0];
	var value = "";
	// Parse out the value portion of the action if present
	if(action.indexOf("&")>-1)
	{
	  value = action.substring(action.indexOf("&"));
	  action = action.substring(0,action.indexOf("&"));
	}
	// Determine any remaining actions (if any)
	actions = actions.substring(actions.indexOf(',')+1);
	// Make AJAX request to the corresponding REST API
    $.ajax({ url: "/games/"+game_id+"/tokens/"+token+"/"+action+"?id="+token+"&player="+document.getElementById('player').value+"&from="+from+""+value+"&record=true" }).done(function(data){update(data);});
	// Call function recursively if there are any remaining actions
	if(actions!="" && actions!=","){setTimeout("executeMenu('"+token+"','"+actions+"');",1000);}
	// Deselect any token 
	deselect();
  }

  // Function for executing a context menu selection
  function executeGroupMenu(actions,x,y)
  {
	dragAbort();
    // Break out the actions string into individual acions
    var action = actions.split(',')[0];
	// Determine any remaining actions (if any)
	if(actions.indexOf(',')>-1){ actions = actions.substring(actions.indexOf(',')+1); } else { actions = ""; }
	var value = "";
	// Parse out the value portion of the action if present
	if(action.indexOf("&")>-1)
	{
	  value = action.substring(action.indexOf("&"));
	  action = action.substring(0,action.indexOf("&"));
	}
	// Make AJAX request to the corresponding REST API
	var token_id = -1;
	var token = null;
	var specs = {"count": selected.length, "action": action, "x": x, "y": y, "z": 0, "token": null };
    selected.forEach(function(el)	   
	{	  
	  // Process each token
	  token_id = el.substring(el.lastIndexOf("_")+1);
	  token = document.getElementById(el.substring(el.lastIndexOf(":")+1));
	  // Set opacity back to 1 to indicate that token is no longer group selected
	  token.style.opacity=1;
	  // Update the z order for the particular token in the specs
	  specs["z"] = token.style.zIndex;
	  specs["token"] = token;
	  // Apply client side token transformations based on selected action. These typically adjust x,y and z token properties per token.
	  // Specs is an object which holds the click location of the menu and the tokens z values. Since it is passed by reference each
	  // successive token can modify these values based on the selected action and then the token action is sent to the RESTful server via AJAX request.
	  // (Possible client side token transformation actions are stored in ClientSideMenuActions.js)
	  applyClientSideMenuActionTransforms(action,value,specs)
	  // Send action to the REESTful server using AJAX request
	  $.ajax({ url: "/games/"+game_id+"/tokens/"+token_id+"/"+specs["action"]+"?id="+token_id+"&player="+document.getElementById('player').value+"&token[x]="+specs["x"]+"&token[y]="+specs["y"]+"&token[z]="+specs["z"]+"&from="+from+"&record=true"+value }).done(function(data){update(data);});
	});
	// Call function recursively if there are any remaining actions
	if(actions!="")
	{
	  if(actions.substring(0,3)!="1x:")
	  {
		// Execute additional actions
		executeGroupMenu(actions,x,y);
	  }
	  else
	  {
		// Single token action is usually used for re-order so pause a moment to allow outstanding actions to complete
		if(actions.substring(3).indexOf(",")<0)
		{
			setTimeout("executeMenu('"+token_id+"','"+actions.substring(3)+"');",1000);
		}
		else
		{
			var thisAction = actions.substring(3);
			thisAction = thisAction.substring(0,thisAction.indexOf(","));
			var remainingActions = actions.substring(3);
			remainingActions = remainingActions.substring(remainingActions.indexOf(",")+1);
			setTimeout("executeMenu('"+token_id+"','"+actions.substring(3)+"');executeGroupMenu('"+remainingActions+"',"+x+","+y+");",1000);
		}
	  }
	}
	else
	{
	  // Deselect any token
	  deselect();
	  selected = [];
	}
  }

  // Function for starting an area selection. While the actions is called drag it is actually and click and move operation.
  function dragStart()
  {
	// Abort any drag operations in progress (if any)
	dragAbort();
	// Create new drag area element (which consists of a div element with a transparent backrgound and a solid border)
    var area = document.createElement("div");
	area.id = "Area";
    area.style = "position: absolute; z-index: 998; left: "+event.clientX+"px; top: "+event.clientY+"px; border: 3px solid yellow; background-color: rgba(0,0,0,0.1);";
	// Register a onClick event for ending the drag. By registering it this way as opposed to an EventListern the onClick appears in the Inspect code. 
	area.setAttribute("onClick","dragEnd();");
	area.setAttribute("onMouseMove","dragUpdate();");
	document.body.appendChild(area);
	drag = true;
  }
  
  // Function for updating the selection area as the mouse is moved during a drag operation. While the actions is called drag it is actually and click and move operation.
  function dragUpdate(el,e)
  {
	// Take action only if a area selection is in progress
    if(drag)
	{
	  // Update the width and height of the area to match the mouse position
	  var area = document.getElementById("Area");
	  area.style.width = (event.clientX-parseInt(area.style.left))+"px";
	  area.style.height = (event.clientY-parseInt(area.style.top))+"px";
	}
	else
	{
	  if(typeof(e)!="undefined")
	  {
		if(e.altKey)
		{
			var zoom = document.getElementById("Zoom");
			if(zoom.style.visibility=="hidden")
			{
				var url = document.getElementById(el).src;
				url = url.substring(0,url.lastIndexOf("."))+".zoom"+url.substring(url.lastIndexOf("."));
				var base = url.substring(0,url.lastIndexOf("/"));
				zoom.src = url;
				// zoom.style.left = e.clientX+"px";
			    // zoom.style.top = e.clientY+"px";
				zoom.style.zIndex = 1000;
				zoom.style.visibility="visible";
				zoom.setAttribute("onError","document.getElementById('Zoom').src='"+base+"/no.zoom.png';");
			}
		}
		else
		{
			document.getElementById("Zoom").style.visibility="hidden";
			document.getElementById("Zoom").src="";
		}
	  }
	}
  }

  // Function for stopping area selection. While the actions is called drag it is actually and click and move operation.
  function dragAbort()
  {
    var area = document.getElementById("Area");
	// Check to see if a area exists before trying to destroy it (since function may be called preventatively even when no drag is in progress)
	// While is used in case accidentally multiple area selections are started.
	while(typeof(area)!=="undefined" && area!==null) 
	{ 
      // Remove the area
	  document.body.removeChild(area); 
	  // Try getting a reference to another area in cased, accidentally, multiple area selections exist
	  area = document.getElementById("Area");
	}
	drag = false;
  }

  // Function for processing an area selection. While the actions is called drag it is actually and click and move operation.  
  function dragEnd()
  {
	// Obtain the area specs
    var area = document.getElementById("Area");
	var x = parseInt(area.style.left)-parseInt(document.getElementById("Table_0").style.left);
	var y = parseInt(area.style.top)-parseInt(document.getElementById("Table_0").style.top);
	var w = parseInt(area.style.width);
	var h = parseInt(area.style.height);
	// Destroy the area selection indicator
	dragAbort();
	drag = false;
	// Get all unlocked tokens
	var tks = document.getElementsByClassName("Unlocked");
	selected = [];
	// Check each token
	for (let tk of tks)
	{
	  // Check to see if token anchor is inside the specified area
	  if(isInside(x,y,w,h,tk))
	  {
		// Add the token's z-order and id to the selected array
		selected.push(tk.style.zIndex+":"+tk.id);
		// Change the token's opacity to 50% to indicate that the token is included in the group 
		tk.style.opacity = 0.5;
	  }
	};
	// Sort selected entries in reverse order. This will sort the entries by reverse z-order which is necessary for operations like fan and cascade.
	selected.sort();
	selected.reverse();
  }
  
  // Function to determining if a point is with an area
  function isInside(x,y,w,h,tk)
  {
	// alert(tk.id+":\r\n"+x+"<"+parseInt(tk.style.left)+"<"+(x+w)+"\r\n"+y+"<"+parseInt(tk.style.top)+"<"+(y+h));
	if(x<parseInt(tk.style.left))
	{
	  if(y<parseInt(tk.style.top))
	  {
		if((x+w)>parseInt(tk.style.left))
		{
		  if((y+h)>parseInt(tk.style.top))
		  {
			  return true;
		  }
		}
	  }
	}
	return false;
  }
  
  // Function to deterct the browser size
  function detectBrowserSize()
  {
    var myWidth = 0, myHeight = 0;
    if (typeof (window.innerWidth) == 'number') {
        //Non-IE
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
    } else if (document.documentElement && (document.documentElement.clientWidth ||   document.documentElement.clientHeight)) {
        //IE 6+ in 'standards compliant mode'
        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.clientHeight;
    } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
        //IE 4 compatible
        myWidth = document.body.clientWidth;
        myHeight = document.body.clientHeight;
    }
    return {"w": myWidth, "h": myHeight};
  }
