// Defines the contents of the context menu. Key are the lables in the context menu and values are the corresponding REST API calls. 
// If REST API definition contains an & then the trailing content will be passed to the REST API during the AJAX request.
// REST API definition can perform more than one REST API call by separating the REST API calls with a comma.
// The contextMenuOptionsForGroup hash first processes the actions through the applyClientSideMenuActionTransforms() function to allow
// different values to be sent to the REST API for each token. For example, the offset, fan, cascade and shuffle actions all have different
// property values for each token. The applyClientSideMenuActionTransforms() function does this before each token is sent to the RESTful
// server for the specified action.
contextMenuOptionsForToken =
{
  "Flip": "cycle",
  "-1": "",
  "Draw": "take,state&state=1",
  "Play": "drop,state&state=1",
  "-2": "",
  "Cancel": "",
};

contextMenuOptionsForBackground =
{
  "Shuffle": "shuffle,1x:reorder",
  "-1": "",
  "Cancel": ""
};

contextMenuOptionsForGroup =
{
  "-0": "",
  "Flip": "cycle",
  "-1": "",
  "Face Up": "drop,state&state=1",
  "Face Down": "drop,state&state=0",
  "-2": "",
  "Stack": "stack",
  "-3": "",
  "Shuffle": "shuffle,1x:reorder",
  "Cut": "cut,1x:reorder",
  "-4": "",
  "Cancel": "",
};

// Module Settings
settings =
{
  "Width": 1330,
  "Height": 800,
  "Color": "#00AA00",
  "Chat": {"x": 1350, "y": 40, "visible": false},
  "Zoom": {"x": 625, "y": 225},
  "Darkness": false,
  "DiagnosticMode": ""
}