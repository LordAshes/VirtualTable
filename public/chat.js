  // Note: Requires global game_id variable to be setup with the game id

  // Variable for holding update timer so it can be disabled on navigation away from the page
  var updateChatTimer = null;
  
  // Variable for holding the last datetime of the last updated item. Used to get only new updates from the server.
  var fromChat="2020-01-01 12:00:00 UTC";
  
  // Variable for holding chat entries
  var chatList = "";
  
  // Used to initialize the play area when the page is loaded  
  function initializeChat()
  {
	// Game id validation
	if(typeof(game_id)=="undefined") { alert("Missing global game_id variable setup!"); }
    // Activate AJAX chat update requests using REST API call
    updateTimer = setInterval('$.ajax({ url: "/games/"+game_id+"/transactions?from="+fromChat }).done(function(data){chat(data);});',1000);

    // Create chat dynamically so that all of the properties are defined here to enable functions like resize 
	var div = document.createElement("div");
	div.id = "Chat";
	div.className = "ChatBar";
	div.style="Position: Absolute; Left: "+settings["Chat"]["x"]+"px; Top: "+settings["Chat"]["y"]+"px;	Width: 500px; Height: 800px; Overflow: scroll; Border: 1px solid black;";
	document.body.appendChild(div);
	var in1 = document.createElement("input");
	in1.id = "ChatBox";
	in1.className = "ChatBar";
	in1.type = "text";
	in1.style="Position: Absolute; Left: "+(settings["Chat"]["x"]+20)+"px; Top: 850px; Width: 360px;";
	document.body.appendChild(in1);
	var in2 = document.createElement("input");
	in2.id = "ChatBoxSubmit";
	in2.className = "ChatBar";
	in2.type = "submit";
	in2.value = "Send";
	in2.style="Position: Absolute; Left: "+(settings["Chat"]["x"]+400)+"px; Top: 850px;";
	in2.setAttribute("onClick","sendChat()");
	document.body.appendChild(in2);
	var btn = document.createElement("button");
	btn.id = "ChatBoxResize";
	btn.className = "ChatBar";
	btn.style = "Position: Absolute; Left: "+(settings["Chat"]["x"]+460)+"px; Top: 850px; Width: 20px; Height:20px; background: url(/triangle_down.png)";
	btn.setAttribute("onClick","resizeChat()");
	document.body.appendChild(btn);	
	
	for (i = 0; i <100; i++)
	{
	  chatList = chatList + "<BR>\r\n"
	}
  }
  
  // Used to stop char updates
  function destroyChat()
  {
    clearInterval(updateChatTimer);
  }
    
  // Callback function to update chat messages. Called by the response to the AJAX periodic request.
  function chat(data)
  {
	// Parse out unused sections of the data (i.e. Ruby on Rails headers and footers)
	data = data.substring(data.indexOf("|"));
	data = data.substring(0,data.lastIndexOf("|")+1);
	// Each line is a single chat update. Add each chart update to the chat array so that we can easily drop off old entries once the maximum capacity is reached.
	messages = data.split('\n');
	messages.forEach(function(msg)
	{
  	  if(msg!="")
	  {
		fromChat = msg.substring(1,24);
	    // Remove last entry from the chat string
		chatList=chatList.substring(0,chatList.length-2);
		chatList=chatList.substring(0,chatList.lastIndexOf("\r\n"));
		// Place new item at the beginning of chat string
		msg = msg.substring(0,msg.length-1);
		// msg = "<span style='font-size: 8pt;'>"+msg.substring(0,25)+"</span><span style='font-size: 12pt;'>"+msg.substring(25)+"</span><BR>\r\n";
		msg = "&nbsp;"+msg.substring(27)+"</span><BR>\r\n";
	    chatList=msg+chatList;
	  }
	});
	if(chatList.substring(0,18)=="&nbsp;&lt;Session:")
	{
		// Turn off updates
		try { destroyUpdates(); destroyChat(); }catch(e){;}
		document.location.href = document.location.href.substring(0,document.location.href.lastIndexOf("/")+1)+parseInt(chatList.substring(18));
	}
    // Update chat contents
	document.getElementById("Chat").innerHTML = chatList;
	// fromChat = chatList.substring(chatList.indexOf("|")+1,chatList.indexOf("|")+24);
	// Update timestamp of the last chat message which is used by the update AJAX request to avoid getting old chat messages 
	document.getElementById('check').innerHTML = "["+from+"]["+fromChat+"]";
  }
  
  // Function to send player messages to the chat/transactions log
  function sendChat()
  {
	// Make an AJAX request to add the message to the transactions log
	$.ajax({ url: "/games/"+game_id+"/transactions/new?transaction[content]="+document.getElementById('player').value+" says \""+document.getElementById("ChatBox").value+"\"&player="+document.getElementById('player').value+"&from="+from });
	// Clear the chat box making it ready for future messages
	document.getElementById("ChatBox").value="";
  }

  // Toggles between a expanded view of the transactions log and a compressed (one entry) view  
  function resizeChat()
  {
    var div = document.getElementById('Chat');
	// If size is not expanded
	if(parseInt(div.style.height)!=800)
	{		
        // Expand it
		div.style.top = "40px";
		div.style.height = "800px";
	}
	else
	{
		// Contract it
		div.style.top = "802px";
		div.style.height = "38px";
	}
  }