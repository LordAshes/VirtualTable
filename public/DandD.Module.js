// Defines the contents of the context menu. Key are the lables in the context menu and values are the corresponding REST API calls. 
// If REST API definition contains an & then the trailing content will be passed to the REST API during the AJAX request.
// REST API definition can perform more than one REST API call by separating the REST API calls with a comma.
// The contextMenuOptionsForGroup hash first processes the actions through the applyClientSideMenuActionTransforms() function to allow
// different values to be sent to the REST API for each token. For example, the offset, fan, cascade and shuffle actions all have different
// property values for each token. The applyClientSideMenuActionTransforms() function does this before each token is sent to the RESTful
// server for the specified action.
contextMenuOptionsForToken =
{
  "Roll": "roll",
  "-1": "",
  "Take": "take",
  "Drop": "drop",
  "-2": "",
  "Heal": "first",
  "Wound": "state&state=1",
  "Poison": "state&state=2",
  "-3": "",
  "Torch": "edit&token[bright]=60&token[dim]=120&token[eyes]=global&source=Torch",
  "Lantern": "edit&token[bright]=120&token[dim]=240&token[eyes]=global&source=Lantern",
  "Darkvison": "edit&token[bright]=120&token[dim]=240&token[eyes]=darkvision&source=Darkvision",
  "Regular": "edit&token[bright]=20&token[dim]=25&token[eyes]=regular&source=None",
  "-4": "",
  "Rotate (45CW)": "rotate&rotate=45",
  "Rotate (45CCW)": "rotate&rotate=-45",
  "Rotate (90CW)": "rotate&rotate=90",
  "Rotate (90CCW)": "rotate&rotate=-90",
  "-5": "",
  "Lock": "lock",
  "-6": "",
  "Cancel": "",
};

contextMenuOptionsForBackground =
{
  "Daylight": "first,edit&token[bright]=2000&token[dim]=2125&token[eyes]=global",
  "Night": "last,edit&token[bright]=40&token[dim]=40&token[eyes]=global",
  "-1": "",
  "Unlock": "unlock",
  "-2": "",
  "Cancel": "",
};

contextMenuOptionsForGroup =
{
  "Roll": "roll",
  "-1": "",
  "Cancel": "",
};

// Module Settings
settings =
{
  "Width": 1330,
  "Height": 810,
  "Color": "#AAAAAA",
  "Chat": {"x": 1350, "y": 40},
  "Darkness": true,
  "DiagnosticMode": ""
}

// Set module to use darkness. Disgnostic mode empty means render darkness normally (other options are "light" and "obstacles".

obstacles = [
				[	{"x": 58, "y": 82},
					{"x": 439, "y": 82},
					{"x": 439, "y": 369},
					{"x": 463, "y": 369},
					{"x": 463, "y": 510},
					{"x": 439, "y": 510},
					{"x": 439, "y": 629},
					{"x": 249, "y": 629},
					{"x": 249, "y": 349},
					{"x": 58, "y": 349},
				],
				[
					{"x": 439, "y": 82},
					{"x": 512, "y": 82},
					{"x": 512, "y": 229},
					{"x": 439, "y": 229},
				],
				[
					{"x": 249, "y": 629},
					{"x": 439, "y": 629},
					{"x": 439, "y": 747},
					{"x": 249, "y": 747},
				],
				[
					{"x": 58, "y": 629},
					{"x": 249, "y": 629},
					{"x": 249, "y": 747},
					{"x": 58, "y": 747},
				],
				[
					{"x": 628, "y": 62},
					{"x": 888, "y": 62},
					{"x": 888, "y": 372},
					{"x": 628, "y": 372},
				],
				[
					{"x": 888, "y": 62},
					{"x": 982, "y": 62},
					{"x": 982, "y": 372},
					{"x": 888, "y": 372},
				],
				[
					{"x": 557, "y": 463},
					{"x": 840, "y": 463},
					{"x": 840, "y": 581},
					{"x": 982, "y": 581},
					{"x": 982, "y": 747},
					{"x": 557, "y": 747},
				],
				[
					{"x": 840, "y": 463},
					{"x": 982, "y": 463},
					{"x": 982, "y": 581},
					{"x": 840, "y": 581},
				],
			];
