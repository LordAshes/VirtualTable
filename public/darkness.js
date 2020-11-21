    function initializeDarkness()
	{
		var dark = document.getElementById("Darkness");
		if(settings["Darkness"])
		{
			dark.style.width = document.getElementById("Table_0").style.width;
			dark.style.height = document.getElementById("Table_0").style.height;
			dark.width = parseInt(document.getElementById("Table_0").style.width);
			dark.height = parseInt(document.getElementById("Table_0").style.height);
			dark.style.visibility = "visible";
		}
		else
		{
			dark.style.width = "0px";
			dark.style.height = "0px";
			dark.width = 0;
			dark.height = 0;
			dark.style.visibility = "hidden";
		}
	}

    function makeDarkness(tokens, obstacles , diagnostic="")
	{
	  // Get canvas and context reference
	  var canvas = document.getElementById("Darkness");	
	  canvas.style.backgroundColor = "rgba(0,0,0,0)";

	  var ctx = canvas.getContext("2d");
	  
	  // Render each token light's area in a different color
	  var index = 255;
	  tokens.forEach(function(token)
	  {
		  ctx.beginPath()
		  ctx.lineWidth=0;
		  if(diagnostic==""){ ctx.strokeStyle="rgba("+index+",0,0,1)"; } else { ctx.strokeStyle="rgba("+index+",0,0,0.5)"; }
		  if(diagnostic==""){ ctx.fillStyle="rgba("+index+",0,0,1)"; } else { ctx.fillStyle="rgba("+index+",0,0,0.5)"; }
		  ctx.arc(token["x"],token["y"],token["r2"],0,2*Math.PI);
		  ctx.closePath();
		  ctx.stroke();
		  ctx.fill();
		  index=index-1;
	  });
	  // Grab canvas color values
	  var tokenData = ctx.getImageData(0,0,parseInt(canvas.style.width),parseInt(canvas.style.height));
	  var tns = tokenData.data;
	  if(diagnostic=="light"){ctx.putImageData(tokenData, 0,0); return;}

	  // Clear canvas
	  ctx.clearRect(0,0,parseInt(canvas.style.width),parseInt(canvas.style.height));
	  
	  // Render each obstacle in a different color
	  var index = 255;
	  obstacles.forEach(function(obs)
	  {
		  ctx.beginPath();
		  var first = true;
		  obs.forEach(function(pnt)
		  {
			  if(first)
			  {
				  ctx.moveTo(pnt["x"],pnt["y"]);
			  }
			  else
			  {
				  ctx.lineTo(pnt["x"],pnt["y"]);
			  }
			  first=false;
		  });
		  ctx.closePath();
		  ctx.stroke();
		  if(diagnostic==""){ ctx.strokeStyle="rgba(0,0,"+index+",1)"; } else { ctx.strokeStyle="rgba(0,0,"+index+",0.5)"; }
		  if(diagnostic==""){ ctx.fillStyle="rgba(0,0,"+index+",1)"; } else { ctx.fillStyle="rgba(0,0,"+index+",0.5)"; }
		  ctx.fill();
		  index=index-1;
	  });
	  // Grab canvas color values
	  var obstacleData = ctx.getImageData(0,0,parseInt(canvas.style.width),parseInt(canvas.style.height));
	  var obs = obstacleData.data;
	  if(diagnostic=="obstacles"){ctx.putImageData(obstacleData, 0,0); return;}

	  // Get the combined color at each token center
	  var visibleAreas = [];
	  w = parseInt(canvas.style.width);
	  h = parseInt(canvas.style.height)
	  tokens.forEach(function(token)
	  {
		x = parseInt(token["x"]);
		y = parseInt(token["y"]);
		r = tns[((y*w)+x)*4+0];
		g = tns[((y*w)+x)*4+1];
		b = obs[((y*w)+x)*4+2];
 		visibleAreas.push( { "a": r+g, "i": b, "x": x, "y": y, "r": parseInt(token["r"]), "r2": parseInt(token["r2"]) } );
	  });

      // Create darkness map
      for(var y=0; y<h; y++)
      {
        for(var x=0; x<w; x++)
        {
		  r = tns[((y*w)+x)*4+0];
		  g = tns[((y*w)+x)*4+1];
		  b = obs[((y*w)+x)*4+2];
		  a = tns[((y*w)+x)*4+3];
		  tns[((y*w)+x)*4+0] = 0;
		  tns[((y*w)+x)*4+1] = 0;
		  tns[((y*w)+x)*4+2] = 0;
		  tns[((y*w)+x)*4+3] = 255;
		  for(var v=0; v<visibleAreas.length; v++)
		  {
			if((visibleAreas[v]["a"]>0)&&(b==visibleAreas[v]["i"]))
			{
  			  var distance = dist(x,y,visibleAreas[v]["x"],visibleAreas[v]["y"]);
			  if(distance<visibleAreas[v]["r"])
			  {
		        tns[((y*w)+x)*4+3] = 0;
			  }
			  else if(distance<visibleAreas[v]["r2"])
			  {
				distance = distance - visibleAreas[v]["r"];
				var intensity = parseInt(196*distance/(visibleAreas[v]["r2"]-visibleAreas[v]["r"]));
		        tns[((y*w)+x)*4+3] = Math.min((intensity+64),tns[((y*w)+x)*4+3]);
			  }
			}
		  }
	    }
	  }	
	  // Draw darkness
	  ctx.putImageData(tokenData, 0,0);
	}

	function dist(x1,y1,x2,y2)
	{
		return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
	}
