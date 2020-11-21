// Function for performing client side menu selection transformation based on the selected menu action.
// Resulting token values are passed back via the "by-reference" specs object. This function adjusts the
// tokens x, y and z values based on the selected menu action before the values are sent to the RESTful
// server using an AJAX request.
function applyClientSideMenuActionTransforms(action,value,specs)
{
  //
  // Offset: Adjusts the relative position of the tokens based on the first token and the selected location
  //
  if(action=="offset")
  {
    // If this is the first token, adjust the x and y starting value one interval in the opposite direction so that when one internal
	// value is added for each token (including the starting one) the first token will end up at the selected x and y value.
    if(action==specs["action"])
	{
      // Determine the relative offset by which all selected tokens are moved		
      specs["dx"]=specs["x"]-parseInt(specs["token"].style.left);
	  specs["dy"]=specs["y"]-parseInt(specs["token"].style.top);
	}
	// Call the RESTful "edit" operation.
	specs["action"] = "edit"; 
	// Offset the x and y value by the spacing interval value for each token
	specs["x"]=parseInt(specs["token"].style.left)+specs["dx"];
 	specs["y"]=parseInt(specs["token"].style.top)+specs["dy"]; 
  }

  //
  // Stack: Moves all selected tokens to the selected location.
  //
  else if(action=="stack")
  { 
    // Call the RESTful "edit" operation.
    specs["action"] = "edit";
    // No specs transformations for x, y and z are necessary because by default x, y is the location of the user click. 	
  }
  
  //
  // Fan: Moves all selected tokens to the selected location and staggers them horizontally by a given amount.
  //
  else if(action=="fan")
  { 
    // If this is the first token, adjust the x starting value one horizontal interval back so that when one horizontal
	// interval is added for each token (including the starting one) the first token will end up at the selected x value.
    if(action==specs["action"]){ specs["x"]=specs["x"]-parseInt(value.substring(1));} 
	// Call the RESTful "edit" operation.
	specs["action"] = "edit";
	// Offset the x value by the horizontal spacing interval for each token
	specs["x"]=specs["x"]+parseInt(value.substring(1)); 
  
  }
  
  //
  // Cascade: Moves all selected tokens to the selected location and staggers them horizontally (+) and vertically (-) by a given amount.  
  // 
  else if(action=="cascade")
  {
    // If this is the first token, adjust the x and y starting value one interval in the opposite direction so that when one internal
	// value is added for each token (including the starting one) the first token will end up at the selected x and y value.
    if(action==specs["action"])
	{ 
      specs["x"]=specs["x"]-parseInt(value.substring(1));
	  specs["y"]=specs["y"]+parseInt(value.substring(1));
	}
	// Call the RESTful "edit" operation.
	specs["action"] = "edit"; 
	// Offset the x and y value by the spacing interval value for each token
	specs["x"]=specs["x"]+parseInt(value.substring(1));
 	specs["y"]=specs["y"]-parseInt(value.substring(1)); 
  }
  
  //
  // Shuffle: Randomly adjusts the z value of each token
  //
  if(action=="shuffle")
  { 
	// Call the RESTful "edit" operation.
    specs["action"] = "edit";
	// Adjust the z property to a random number between 20 and 900. This operation is usually followed by a reorder operation to
	// readjust all of the token z orders to consecutive values.
	specs["z"]=Math.floor((Math.random() * 900) + 20);
  }

  //
  // Cut: Places a number of bottom tokens on top of the z order
  //
  if(action=="cut")
  { 
    if(action==specs["action"])
	{ 
      // Randomly generate the point at which the token group (e.g. deck) is to be cut
	  specs["cutIndex"]=Math.floor((Math.random() * specs["count"]-2) + 2);
	  specs["index"]=1;
	  alert("Cut at "+specs["cutIndex"]);
	}
	// Call the RESTful "edit" operation.
    specs["action"] = "edit";
	// If the token if after the randomly selected cut index, shift the token's z property by 500 (to move the lower portion to the top)
	if(specs["index"]>specs["cutIndex"]){specs["z"]=parseInt(specs["z"])+500;}
	alert("Setting Z-Index To "+specs["z"]);
	specs["index"]++;
  }  
}