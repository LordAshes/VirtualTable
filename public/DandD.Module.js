// Defines the contents of the context menu. Key are the lables in the context menu and values are the corresponding REST API calls. 
// If REST API definition contains an & then the trailing content will be passed to the REST API during the AJAX request.
// REST API definition can perform more than one REST API call by separating the REST API calls with a comma.
// The contextMenuOptionsForGroup hash first processes the actions through the applyClientSideMenuActionTransforms() function to allow
// different values to be sent to the REST API for each token. For example, the offset, fan, cascade and shuffle actions all have different
// property values for each token. The applyClientSideMenuActionTransforms() function does this before each token is sent to the RESTful
// server for the specified action.
var contextMenuOptionsForToken =
{
  "Roll": "roll",
  "-1": "",
  "Rotate (45CW)": "rotate&rotate=45",
  "Rotate (45CCW)": "rotate&rotate=-45",
  "Rotate (90CW)": "rotate&rotate=90",
  "Rotate (90CCW)": "rotate&rotate=-90",
  "-2": "",
  "Cancel": "",
};

var contextMenuOptionsForBackground =
{
  "Cancel": "",
};

var contextMenuOptionsForGroup =
{
  "Roll": "roll",
  "-1": "",
  "Cancel": "",
};


// Module Settings
var settings =
{
  "Width": 280,
  "Height": 280,
  "Color": "#AAAAAA"
}


