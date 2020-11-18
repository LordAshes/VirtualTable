// Defines the contents of the context menu. Key are the lables in the context menu and values are the corresponding REST API calls. 
// If REST API definition contains a colon then the trailing content will be passed to the REST API call under the key 'value'.
// REST API definition can perform more than one REST API call by separating the REST API calls with a comma.
var contextMenuOptionsForToken =
{
  "Flip": "cycle",
  "-1": "",
  "Take": "state&state=1,take&player={Player}",
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
  "-4": "",
  "Move To Back": "back,reorder",
  "Move To Front": "front,reorder",
};

var contextMenuOptionsForBackground =
{
  "Unlock": "unlock"
};

var contextMenuOptionsForGroup =
{
  "Stack": "stack",
  "Fan": "fan&20",
  "Cascade": "cascade&20",
  "Shuffle": "roll"
};

// Module Settings
var settings =
{
  "Width": 800,
  "Height": 700,
  "Color": "#007700"
}

