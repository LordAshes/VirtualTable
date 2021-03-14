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
  "Take": "state&state=1,take",
  "Play": "state&state=1,drop",
  "Give": "state&state=0,drop",
  "-2": "",
  "Prev": "prev",
  "Next": "next",
  "Roll": "roll",
  "-3": "",
  "Rotate (45CW)": "rotate&rotate=45",
  "Rotate (45CCW)": "rotate&rotate=-45",
  "Rotate (90CW)": "rotate&rotate=90",
  "Rotate (90CCW)": "rotate&rotate=-90",
  "-3": "",
  "Move To Back": "back,reorder",
  "Move To Front": "front,reorder",
  "-4": "",
  "Cancel": "",
};

contextMenuOptionsForBackground =
{
  "Shuffle": "shuffle",
  "-1": "",
  "Cancel": ""
};

contextMenuOptionsForGroup =
{
  "-0": "",
  "Flip": "cycle",
  "-1": "",
  "Take": "state&state=1,take",
  "Hand": "take,state&state=1,fan&20",
  "-2": "",
  "Play": "state&state=1,drop",
  "Give": "state&state=0,drop",
  "-3": "",
  "Offet": "offset",
  "Stack": "stack",
  "Fan": "fan&20",
  "Cascade": "cascade&20",
  "-4": "",
  "Shuffle": "roll",
  "Cut": "cut,1x:reorder",
  "-5": "",
  "Cancel": "",
};

// Module Settings
settings =
{
  "Width": 1330,
  "Height": 800,
  "Color": "#AAAAAA",
  "Chat": {"x": 1350, "y": 40},
  "Darkness": false,
  "DiagnosticMode": ""
}