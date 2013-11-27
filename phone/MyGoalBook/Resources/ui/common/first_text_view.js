//FirstView Component Constructor
var first_text_view = Ti.UI.currentWindow;
first_text_view.orientationModes = [Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT, Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT];
var tmp = (Titanium.Platform.displayCaps.platformHeight * 3.8) / 100;
var tmp1 = (Titanium.Platform.displayCaps.platformHeight * 3.3) / 100;
var tmp2 = (Titanium.Platform.displayCaps.platformHeight * 2.3) / 100;
var corner = Math.round(Ti.Platform.displayCaps.platformWidth * 0.01);

var myDatabase = Ti.Database.install('/myDatabase.sqlite', 'myDatabase.sqlite');
var settingResultSet = myDatabase.execute('SELECT * FROM Background_images WHERE selected_view=?', '1');
var this_path = '';
var this_color = '';

while (settingResultSet.isValidRow()) {
	this_path = settingResultSet.fieldByName('path');
	this_color = settingResultSet.fieldByName('color_view');
	//   Ti.API.info(this_username + ' ' + this_user_name + ' ' + this_user_email  + ' ' + this_user_password);
	settingResultSet.next();
}
var count = this_path.length;
settingResultSet.close();

//****************************************************************************Fonts***************************************************

var fontsResultSet = myDatabase.execute('SELECT * FROM fonts WHERE selected=?', '1');
var this_font = '';
while (fontsResultSet.isValidRow()) {
	this_font = fontsResultSet.fieldByName('name');
	//   Ti.API.info(this_username + ' ' + this_user_name + ' ' + this_user_email  + ' ' + this_user_password);
	fontsResultSet.next();
}
fontsResultSet.close();

// //****************************************************************************Reminder***************************************************

var reminderResultSet = myDatabase.execute('SELECT * FROM Reminder WHERE rowid=?', '1');
var this_reminder = '';
while (reminderResultSet.isValidRow()) {
	this_reminder = reminderResultSet.fieldByName('reminder');
	//   Ti.API.info(this_username + ' ' + this_user_name + ' ' + this_user_email  + ' ' + this_user_password);
	reminderResultSet.next();
}
reminderResultSet.close();

Titanium.Gesture.addEventListener('orientationchange', function(e) {
	switch(e.orientation) {
		case Ti.UI.PORTRAIT:
		case Ti.UI.UPSIDE_PORTRAIT:
			secondsubselfBottom.height = '11%';

			break;
		case Ti.UI.LANDSCAPE_LEFT:
		case Ti.UI.LANDSCAPE_RIGHT:
			secondsubselfBottom.height = '13%';
			break;
		case Ti.UI.UNKNOWN:
		default:
			break;
	}
});

var first = Titanium.UI.createView({
	backgroundColor : 'black',
	width : '100%',
	height : '100%',
});
first_text_view.add(first);

supersubself = Titanium.UI.createView({
	backgroundColor : 'white',
	width : '96%',
	height : '96%',
	backgroundImage : this_path,

});
first.add(supersubself);

subself = Titanium.UI.createScrollView({
	width : '100%',
	height : '89%',
	top : '0%',
	layout : 'vertical',
	scrollType : 'vertical'

});
supersubself.add(subself);

//**************************************************************View 1*************************************************************

var Getting_Started = Ti.UI.createLabel({
	text : 'Say YES to Your DREAMS',
	color : 'black',
	font : {
		fontSize : tmp,
		fontWeight : 'bold',
		fontFamily : this_font
	},
	left : '2%',
	right : '2%',
	top : '1%'
});
subself.add(Getting_Started);

// Create a Label.
var bodyText1 = Ti.UI.createLabel({
	text : "You have the power to create whatever you want…greater happiness, more joy, deeper fulfillment and more abundance. \n \nMyGoalBook provides you with a unique visualization tool to allow you to embrace the principles of the Law of Attraction.",
	color : 'black',
	font : {
		fontSize : tmp1,
		fontFamily : this_font
	},
	height : 'auto',
	width : 'auto',
	left : '5%',
	right : '5%',
});

// Add to the parent view

subself.add(bodyText1);

//**************************************************************View 2*************************************************************

var Getting_Started2 = Ti.UI.createLabel({
	text : 'Empower Yourself. Envision Your Future',
	color : 'black',
	font : {
		fontSize : tmp,
		fontWeight : 'bold',
		fontFamily : this_font
	},
	left : '2%',
	right : '2%',
	top : '1%',
});
subself.add(Getting_Started2);

// Create a Label.
var bodyText2 = Ti.UI.createLabel({
	text : "Personal Success results from the ability to act, the ability to take action and the ability to produce results. ",
	color : 'black',
	font : {
		fontSize : tmp1,
		fontFamily : this_font
	},
	height : 'auto',
	width : 'auto',
	left : '5%',
	right : '5%',
});

// Add to the parent view

subself.add(bodyText2);

//**************************************************************View 3*************************************************************

var Getting_Started3 = Ti.UI.createLabel({
	text : 'Applying the Laws of Attraction',
	color : 'black',
	font : {
		fontSize : tmp,
		fontWeight : 'bold',
		fontFamily : this_font
	},
	left : '2%',
	right : '2%',
	top : '1%'
});
subself.add(Getting_Started3);

// Create a Label.
var bodyText3 = Ti.UI.createLabel({
	text : "By making simple, small changes daily, you will absolutely transform the quality of your life more quickly than you ever thought possible. Not only will you learn to take control of your own life through personal development, but you’ll learn to help others make life-altering changes as well. ",
	color : 'black',
	font : {
		fontSize : tmp1,
		fontFamily : this_font
	},
	height : 'auto',
	width : 'auto',
	left : '5%',
	right : '5%',
});

// Add to the parent view

subself.add(bodyText3);

//**************************************************************View 4*************************************************************

var Getting_Started4 = Ti.UI.createLabel({
	text : 'A Powerful and Versatile Visualization Tool',
	color : 'black',
	font : {
		fontSize : tmp,
		fontWeight : 'bold',
		fontFamily : this_font
	},
	left : '2%',
	right : '2%',
	top : '1%'
});
subself.add(Getting_Started4);

// Create a Label.
var bodyText4 = Ti.UI.createLabel({
	text : "Often the biggest challenge to achieving what we desire is our ability to repeatedly review our Goals on a daily basis - if you don’t see them, they will soon be out of sight… and out of mind. \n \nMyGoalBook removes this obstacle by providing you with access to your Goals Wherever and Whenever You Like – it will even remind you to Visualize What You Desire. ",
	color : 'black',
	font : {
		fontSize : tmp1,
		fontFamily : this_font
	},
	height : 'auto',
	width : 'auto',
	left : '5%',
	right : '5%',
});

// Add to the parent view

subself.add(bodyText4);

//**************************************************************View 5*************************************************************

var Getting_Started5 = Ti.UI.createLabel({
	text : 'It Only Works',
	color : 'black',
	font : {
		fontSize : tmp,
		fontWeight : 'bold',
		fontFamily : this_font
	},
	left : '2%',
	top : '1%',
	right : '2%'
});
subself.add(Getting_Started5);

// Create a Label.
var bodyText5 = Ti.UI.createLabel({
	text : "MyGoalBook keeps you focused and on track towards achieving your goals. Don’t downplay the simplicity of MyGoalBook.\n\nIt works, and there are countless examples of high achievers who have put these principles into play in their lives and are reaping great rewards as a result.",
	color : 'black',
	font : {
		fontSize : tmp1,
		fontFamily : this_font
	},
	height : 'auto',
	width : 'auto',
	left : '5%',
	right : '5%'
});

// Add to the parent view

subself.add(bodyText5);

//**************************************************************View 6*************************************************************

var Getting_Started6 = Ti.UI.createLabel({
	text : 'How to use MyGoalBook',
	color : 'black',
	font : {
		fontSize : tmp,
		fontWeight : 'bold',
		fontFamily : this_font
	},
	left : '2%',
	top : '1%',
	right : '2%'
});
subself.add(Getting_Started6);

// Create a Label.
var bodyText7 = Ti.UI.createLabel({
	text : "Think about your Goals – it’s always worth starting out with a clean piece of paper and writing constantly for 10 minutes a list of all the things that you desire, want to achieve, would like to experience, places to visit etc.\n\nOnce you are happy with this list, prioritise them – which ones are you determined to achieve?\n\nFor each one of these, write a brief description, find a suitable image and identify a step that you can take soon to move forward towards your goal. Finally attach a date by which you wish to achieve this goal. \n\nGo to ‘Create Goal’ and upload all of this within the app. Press ‘Save’ Congratulations, you’ve just created your first Goal Card within MyGoalBook. Repeat for as many Goals as you like.\n\nNow go to ‘Settings’ and set specific times and frequencies that you would like to be reminded to “Visualise” your Goals.\n\nYou can also upload a copy of your Goal Card to the most popular Social Media sites.\n\nOnce you have achieved individual Goals, click on the ‘Achieved’ button within the Goal Card. You can see all of your completed Goals by clicking on the Completed Goals icon.",
	color : 'black',
	font : {
		fontSize : tmp1,
		fontFamily : this_font
	},
	height : 'auto',
	width : 'auto',
	left : '5%',
	right : '5%'
});

// Add to the parent view

subself.add(bodyText7);

//**************************************************************View 7*************************************************************

var Getting_Started7 = Ti.UI.createLabel({
	text : 'About MyGoalBook',
	color : 'black',
	font : {
		fontSize : tmp,
		fontWeight : 'bold',
		fontFamily : this_font
	},
	left : '2%',
	top : '1%',
	right : '2%'
});
// Add to the parent view.
subself.add(Getting_Started7);

// Create a Label.
var bodyText8 = Ti.UI.createLabel({
	text : "Version – 2.5",
	color : 'black',
	font : {
		fontSize : tmp1,
		fontFamily : this_font
	},
	height : 'auto',
	width : 'auto',
	left : '5%',
	//top : '3%'
});
subself.add(bodyText8);

// Create a Label.
var bodyText9 = Ti.UI.createLabel({
	text : "Send us your feedback ",
	color : 'black',
	font : {
		fontSize : tmp1,
		fontFamily : this_font
	},
	height : 'auto',
	width : 'auto',
	left : '5%',
	right : '5%',
	top : '0.5%'
});
bodyText9.addEventListener('click', function(e) {
	var emailDialog = Ti.UI.createEmailDialog();
	emailDialog.subject = "My Goal Book";
	emailDialog.toRecipients = ['feedback@mygoalbook.net'];
	emailDialog.messageBody = '';
	// var f = Ti.Filesystem.getFile('cricket.wav');
	// emailDialog.addAttachment(f);
	emailDialog.open();
});
subself.add(bodyText9);

var bottom_line = Ti.UI.createView({
	backgroundColor : 'black',
	height : 1,
	width : 165,
	left : '5%',
	right : '5%',
});
subself.add(bottom_line);

var bodyText10 = Ti.UI.createLabel({
	text : "Help",
	color : 'black',
	font : {
		fontSize : tmp1,
		fontFamily : this_font
	},
	height : 'auto',
	width : 'auto',
	left : '5%',
	right : '5%',
	top : '0.5%'
});
bodyText10.addEventListener('click', function(e) {
	//open link in safari - application will close
	Titanium.Platform.openURL('http://www.mygoalbook.net/help');
});

subself.add(bodyText10);

var bottom_line = Ti.UI.createView({
	backgroundColor : 'black',
	height : 1,
	width : 40,
	left : '5%',
	right : '5%',
});
subself.add(bottom_line);

var bodyText11 = Ti.UI.createLabel({
	text : "Terms & Conditions",
	color : 'black',
	font : {
		fontSize : tmp1,
		fontFamily : this_font
	},
	height : 'auto',
	width : 'auto',
	left : '5%',
	right : '5%',
	top : '0.5%'
});
bodyText11.addEventListener('click', function(e) {
	//open link in safari - application will close
	Titanium.Platform.openURL('http://www.mygoalbook.net/terms');
});

subself.add(bodyText11);

var bottom_line = Ti.UI.createView({
	backgroundColor : 'black',
	height : 1,
	width : 150,
	left : '5%',
	right : '5%',
});
subself.add(bottom_line);

var bodyText12 = Ti.UI.createLabel({
	text : "Feedback",
	color : 'black',
	font : {
		fontSize : tmp1,
		fontFamily : this_font
	},
	height : 'auto',
	width : 'auto',
	left : '5%',
	right : '5%',
	top : '0.5%'
});
bodyText12.addEventListener('click', function(e) {
	//open link in safari - application will close
	Titanium.Platform.openURL('http://www.mygoalbook.net/feedback');
});

subself.add(bodyText12);

var bottom_line = Ti.UI.createView({
	backgroundColor : 'black',
	height : 1,
	width : 72,
	left : '5%',
	right : '5%',
});
subself.add(bottom_line);

var bodyText13 = Ti.UI.createLabel({
	text : "Review this App",
	color : 'black',
	font : {
		fontSize : tmp1,
		fontFamily : this_font
	},
	height : 'auto',
	width : 'auto',
	left : '5%',
	right : '5%',
	top : '0.5%'
});
bodyText13.addEventListener('click', function(e) {
	Titanium.Platform.openURL('http://www.mygoalbook.net/feedback');
});

subself.add(bodyText13);

var bottom_line = Ti.UI.createView({
	backgroundColor : 'black',
	height : 1,
	width : 120,
	left : '5%',
	right : '5%',
});
subself.add(bottom_line);

var bodyText14 = Ti.UI.createLabel({
	text : "Follow us on Twitter ",
	color : 'black',
	font : {
		fontSize : tmp1,
		fontFamily : this_font
	},
	height : 'auto',
	width : 'auto',
	left : '5%',
	right : '5%',
	top : '0.5%'
});
bodyText14.addEventListener('click', function(e) {
	//open link in safari - application will close
	Titanium.Platform.openURL('http://www.twitter.com/mygoalbook');
});

subself.add(bodyText14);

var bottom_line = Ti.UI.createView({
	backgroundColor : 'black',
	height : 1,
	width : 152,
	left : '5%',
	right : '5%',
});
subself.add(bottom_line);

var bodyText15 = Ti.UI.createLabel({
	text : "Follow us on Facebook ",
	color : 'black',
	font : {
		fontSize : tmp1,
		fontFamily : this_font
	},
	height : 'auto',
	width : 'auto',
	left : '5%',
	right : '5%',
	top : '0.5%'
});
bodyText15.addEventListener('click', function(e) {
	//open link in safari - application will close
	Titanium.Platform.openURL('https://facebook.com/MyGoalBook');
});

subself.add(bodyText15);

var bottom_line = Ti.UI.createView({
	backgroundColor : 'black',
	height : 1,
	width : 165,
	left : '5%',
	right : '5%',
});
subself.add(bottom_line);

var bodyText16 = Ti.UI.createLabel({
	text : "Visit MyGoalBook.net",
	color : 'black',
	font : {
		fontSize : tmp1,
		fontFamily : this_font
	},
	height : 'auto',
	width : 'auto',
	left : '5%',
	right : '5%',
	top : '0.5%'
});
bodyText16.addEventListener('click', function(e) {
	//open link in safari - application will close
	Titanium.Platform.openURL('http://www.mygoalbook.net');
});
subself.add(bodyText16);

var bottom_line = Ti.UI.createView({
	backgroundColor : 'black',
	height : 1,
	width : 160,
	left : '5%',
	right : '5%',
});
subself.add(bottom_line);

var bodyText17 = Ti.UI.createLabel({
	text : "\n",
	color : 'black',
	font : {
		fontSize : tmp1,
		fontFamily : this_font
	},
	height : 'auto',
	width : 'auto',
	left : '5%',
	right : '5%'
});

subself.add(bodyText17);

//*********************************************************bottom View*********************************************

secondsubselfBottom = Titanium.UI.createView({
	width : '100%',
	height : '11%',
	bottom : '0%',
	backgroundImage : '/images/topbar.png',
	layout : 'horizontal'
});
supersubself.add(secondsubselfBottom);
// Create a Button.

var secondmyGoalBook = Ti.UI.createView({
	height : '96%',
	width : '20%',
	borderRadius : corner,

});

// Listen for click events.
secondmyGoalBook.addEventListener('click', function() {

	indicator();

	var showGoal = Ti.UI.createWindow({
		backgroundColor : 'white',
		url : 'showGoal.js',
		navBarHidden : true,
		fullscreen : true,
		exitOnClose : true
	});
	showGoal.open();
});

// Add to the parent view.
secondsubselfBottom.add(secondmyGoalBook);
var secondmyGoalBookicon = Ti.UI.createView({
	backgroundImage : '/images/MyGoalBook.png',
	height : 35,
	width : 35,

});
secondmyGoalBook.add(secondmyGoalBookicon);

// Create a Button.
var secondCreate_goal = Ti.UI.createView({
	height : '96%',
	width : '20%',
	borderRadius : corner,
});

// Listen for click events.
secondCreate_goal.addEventListener('click', function() {

	indicator();

	var check = Ti.App.Properties.setBool('check', false);
	var Create_Goal = Titanium.UI.createWindow({
		backgroundColor : 'white',
		url : 'Create_Goal.js',
		navBarHidden : true,
		fullscreen : true,
		exitOnClose : true
	});
	Create_Goal.open();
});

// Add to the parent view.
secondsubselfBottom.add(secondCreate_goal);

var secondCreate_goalicon = Ti.UI.createView({
	backgroundImage : '/images/createGoal.png',
	height : 35,
	width : 35,

});
secondCreate_goal.add(secondCreate_goalicon);

var secondcompleteGoal = Ti.UI.createView({
	height : '96%',
	width : '19.5%',
	borderRadius : corner,
});

// Listen for click events.
secondcompleteGoal.addEventListener('click', function() {

	indicator();

	var Goalcomplete = Titanium.UI.createWindow({
		backgroundColor : 'white',
		url : 'Goalcomplete.js',
		navBarHidden : true,
		fullscreen : true,
		exitOnClose : true
	});
	Goalcomplete.open();
});

// Add to the parent view.
secondsubselfBottom.add(secondcompleteGoal);

var secondcompleteGoalicon = Ti.UI.createView({
	backgroundImage : '/images/Goal_complete.png',
	height : 35,
	width : 35,

});
secondcompleteGoal.add(secondcompleteGoalicon);

// Create a Button.
var secondsetting = Ti.UI.createView({
	height : '96%',
	width : '20%',
	borderRadius : corner,
});

// Listen for click events.
secondsetting.addEventListener('click', function() {

	indicator();

	var Settings = Titanium.UI.createWindow({
		backgroundColor : 'white',
		url : 'Setting.js',
		navBarHidden : true,
		fullscreen : true,
		exitOnClose : true
	});
	Settings.open();
});

// Add to the parent view.
secondsubselfBottom.add(secondsetting);

var secondsettingicon = Ti.UI.createView({
	backgroundImage : '/images/settings.png',
	height : 35,
	width : 35,

});
secondsetting.add(secondsettingicon);

var secondhome = Ti.UI.createView({
	backgroundColor : this_color,
	height : '96%',
	width : '20%',
	borderRadius : corner,
});

// Listen for click events.
secondhome.addEventListener('click', function() {
});

// Add to the parent view.
secondsubselfBottom.add(secondhome);

var secondhomeicon = Ti.UI.createView({
	backgroundImage : '/images/home1.png',
	height : 35,
	width : 35,

});
secondhome.add(secondhomeicon);

function decorateLabel(label) {
	var decoratedView = Titanium.UI.createView({
		width : Titanium.UI.SIZE,
		height : Titanium.UI.SIZE,
		layout : 'vertical',
		left : 0,
	});
	decoratedView.add(label);

	setTimeout(function() {
		var lineView = Titanium.UI.createView({
			width : label.Size.width,
			left : label.left,
			height : 1,
			backgroundColor : label.color ? label.color : 'black',
			top : -1,
			bottom : 0
		});
		decoratedView.add(lineView);
	}, 1000);

	return decoratedView;
}

function indicator() {
	var indicatorView = Ti.UI.createView({
		backgroundColor : 'black',
		height : '25%',
		width : '40%',
		opacity : 0.7,
		borderRadius : 10
	});
	subself.add(indicatorView);
	var activityIndicator = Ti.UI.createActivityIndicator({
		style : Ti.UI.ActivityIndicatorStyle.BIG,

	});
	indicatorView.add(activityIndicator);
	activityIndicator.show();
}
