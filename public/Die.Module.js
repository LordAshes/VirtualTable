// Defines the contents of the context menu. Key are the lables in the context menu and values are the corresponding REST API calls. 
// If REST API definition contains a colon then the trailing content will be passed to the REST API call under the key 'value'.
// REST API definition can perform more than one REST API call by separating the REST API calls with a comma.
var contextMenuOptionsForToken =
{
  "Roll": "roll",
  "-1": "",
  "Rotate (45CW)": "rotate&rotate=45",
  "Rotate (45CCW)": "rotate&rotate=-45",
  "Rotate (90CW)": "rotate&rotate=90",
  "Rotate (90CCW)": "rotate&rotate=-90",
};

var contextMenuOptionsForBackground =
{
};

var contextMenuOptionsForGroup =
{
  "Roll": "roll"
};


// Module Settings
var settings =
{
  "Width": 1920,
  "Height": 920,
  "Color": "#AAAAAA"
}

