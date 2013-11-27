function first_text_view() {
var first_text_view = Ti.UI.createWindow({
		//title : 'Ecotour',
		backgroundColor : 'white',
		//barColor : colors.titlebar,
		tabBarHidden : true,
		animated : false,
		transition : Titanium.UI.iPhone.AnimationStyle.NONE,
		//modalTransitionStyle:Titanium.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,

		navBarHidden : true,
	    translucent : false
	});

first_text_view.orientationModes = [Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT, Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT];
var tmp = (Titanium.Platform.displayCaps.platformHeight * 2.8) / 100;
var tmp1 =  (Titanium.Platform.displayCaps.platformHeight * 2.4) / 100;
var hgt = (Titanium.Platform.displayCaps.platformHeight * 6) / 100;
var tmp2 = (Titanium.Platform.displayCaps.platformHeight * 2.5) / 100;
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

//****************************************************************************Fonts***************************************************

//create object instance, a parasitic subclass of Observable
AddViews();
var pWidth = Ti.Platform.displayCaps.platformWidth;
	var pHeight = Ti.Platform.displayCaps.platformHeight;
	if (pWidth > pHeight) {
		var oriCurrent = 'landscape';
		secondsubselfBottom.height = '13%';
	} else {
		var oriCurrent = 'portrait';
		secondsubselfBottom.height = '11%';
	}

var subself;
var secondsubselfBottom ;

Titanium.Gesture.addEventListener('orientationchange', function(e) {
	switch(e.orientation) {
		case Ti.UI.PORTRAIT:
		case Ti.UI.UPSIDE_PORTRAIT:
		
			AddViews();
			secondsubselfBottom.height = '11%';
			break;
		case Ti.UI.LANDSCAPE_LEFT:
		case Ti.UI.LANDSCAPE_RIGHT:		
			AddViews();
			secondsubselfBottom.height = '13%';
			break;
		case Ti.UI.UNKNOWN:
		default:
			break;
	}
});

function AddViews() {
	var first = Titanium.UI.createView({
		backgroundColor : 'black',
		width : '100%',
		height : '100%',
	});
	first_text_view.add(first);

	supersubself = Titanium.UI.createScrollView({
		backgroundColor : 'white',
		width : '96%',
		height : '96%',
		backgroundImage : this_path,
		scrollType:'vertical'
	});
	first.add(supersubself);

	subself = Titanium.UI.createScrollView({
		width : '100%',
		height : '87%',
		top : '0%',
		layout : 'vertical',

	});
	supersubself.add(subself);

	// var subselfcenter = Titanium.UI.createScrollView({
	// width : '90%',
	// height : '65%',
	// top : '18%',
	// backgroundImage : '/images/topbar.png'
	// });
	// subself.add(subselfcenter);

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
		//open link in safari - application will close
		var emailDialog = Ti.UI.createEmailDialog();
		emailDialog.subject = "My Goal Book Feedback";
		emailDialog.toRecipients = ['feedback@mygoalbook.net'];
		emailDialog.messageBody = '';
		emailDialog.open();
	});
	subself.add(bodyText9);

	var bottom_line = Ti.UI.createView({
		backgroundColor : 'black',
		height : 1,
		width : 245,
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
		width : 50,
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
		width : 240,
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
		width : 112,
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

		var ApptentiveModule = require('com.apptentive.titanium');
		Ti.API.info("module is => " + ApptentiveModule);

		//API Key
		var apiKey = ApptentiveModule.apiKey();
		if (apiKey) {
			//throw Error("Apptentive API key should be nil when not set!");
		}
		ApptentiveModule.setApiKey('769930e7c3380763bc6777e7ae6896be5b9a85708d0ee6d4d2e63124a2540321');
		apiKey = ApptentiveModule.apiKey();
		if (apiKey != '769930e7c3380763bc6777e7ae6896be5b9a85708d0ee6d4d2e63124a2540321') {
			throw Error("Apptentive API key was not properly set!");
		}

		//UserName
		var userName = ApptentiveModule.initialUserName();
		if (userName) {
			//throw Error("Apptentive username should be nil when not set!");
		}
		ApptentiveModule.setInitialUserName("Steven P. Jobs");
		userName = ApptentiveModule.initialUserName();
		if (userName != "Steven P. Jobs") {
			//throw Error("Apptentive username was not properly set!");
		}

		//EmailAddress
		var email = ApptentiveModule.initialUserEmailAddress();
		if (email) {
			//throw Error("Apptentive email should be nil when not set!");
		}
		ApptentiveModule.setInitialUserEmailAddress("");
		email = ApptentiveModule.initialUserEmailAddress();
		if (email != "") {
			//throw Error("Apptentive email address was not properly set!");
		}

		//Custom data
		ApptentiveModule.addCustomDataWithKey("1 Infinite Loop, Cupertino CA", "address");
		ApptentiveModule.addCustomDataWithKey("RemoveThisData", "remove");
		ApptentiveModule.removeCustomDataWithKey("remove");

		ApptentiveModule.presentMessageCenter();
	});

	subself.add(bodyText13);

	var bottom_line = Ti.UI.createView({
		backgroundColor : 'black',
		height : 1,
		width : 180,
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
		width : 242,
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
		width : 265,
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
		width : 260,
		left : '5%',
		right : '5%',
	});
	subself.add(bottom_line);

	var bodyText17 = Ti.UI.createLabel({
		text : "\n\n\n\n\n\n\n\n\n",
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
	// var fronts = Ti.UI.createScrollableView({
	// //backgroundColor:'red',
	// height : '89%',
	// width : '90%',
	// top : '0%',
	// views : [Topsubself1, Topsubself2, Topsubself3, Topsubself4, Topsubself5, Topsubself6, Topsubself7],
	// showPagingControl : true,
	// pagingControlColor : 'transparent'
	// });
	// fronts.addEventListener('click', function(e) {
	// });
	// subself.add(fronts);

	//*********************************************************bottom View*********************************************

	secondsubselfBottom = Titanium.UI.createView({
		width : '100%',
		height : '11%',
		bottom : '0%',
		backgroundImage : '/images/topbar.png',
		layout : 'horizontal'
	});
	supersubself.add(secondsubselfBottom);

	var secondmyGoalBook = Ti.UI.createView({
		height : '100%',
		width : '20%',
		borderRadius : corner,
	});

	// Listen for click events.
	secondmyGoalBook.addEventListener('click', function() {
	var newWindowClass = require('/ui/common/showGoal');
					var newWindow = new newWindowClass();
			
                 var currentWin=first_text_view;
					newWindow.containingTab = currentWin.containingTab;
					
					currentWin.containingTab.open(newWindow, {
						animated : false
					});
	});

	// Add to the parent view.
	secondsubselfBottom.add(secondmyGoalBook);
	var secondmyGoalBookicon = Ti.UI.createView({
		backgroundImage : '/images/MyGoalBook.png',
		height : 65,
		width : 60,

	});
	secondmyGoalBook.add(secondmyGoalBookicon);

	// Create a Button.
	var secondCreate_goal = Ti.UI.createView({
		height : '100%',
		width : '19.9%',
		borderRadius : corner,
	});

	// Listen for click events.
	secondCreate_goal.addEventListener('click', function() {

		var check = Ti.App.Properties.setBool('check', false);
	var newWindowClass = require('/ui/common/Create_Goal');
					var newWindow = new newWindowClass();
			
                 var currentWin=first_text_view;
					newWindow.containingTab = currentWin.containingTab;
					
					currentWin.containingTab.open(newWindow, {
						animated : false
					});
	});

	// Add to the parent view.
	secondsubselfBottom.add(secondCreate_goal);

	var secondCreate_goalicon = Ti.UI.createView({
		backgroundImage : '/images/createGoal.png',
		height : 65,
		width : 60,

	});
	secondCreate_goal.add(secondCreate_goalicon);

	var secondcompleteGoal = Ti.UI.createView({
		height : '100%',
		width : '19.9%',
		borderRadius : corner,
	});

	// Listen for click events.
	secondcompleteGoal.addEventListener('click', function() {
		var newWindowClass = require('/ui/common/Goalcomplete');
					var newWindow = new newWindowClass();
			
                 var currentWin=first_text_view;
					newWindow.containingTab = currentWin.containingTab;
					
					currentWin.containingTab.open(newWindow, {
						animated : false
					});
	});

	// Add to the parent view.
	secondsubselfBottom.add(secondcompleteGoal);

	var secondcompleteGoalicon = Ti.UI.createView({
		backgroundImage : '/images/Goal_complete.png',
		height : 65,
		width : 60,

	});
	secondcompleteGoal.add(secondcompleteGoalicon);

	// Create a Button.
	var secondsetting = Ti.UI.createView({
		height : '100%',
		width : '19.9%',
		borderRadius : corner,
	});

	// Listen for click events.
	secondsetting.addEventListener('click', function() {

		var newWindowClass = require('/ui/common/Setting');
					var newWindow = new newWindowClass();
			
                 var currentWin=first_text_view;
					newWindow.containingTab = currentWin.containingTab;
					
					currentWin.containingTab.open(newWindow, {
						animated : false
					});
	});

	// Add to the parent view.
	secondsubselfBottom.add(secondsetting);

	var secondsettingicon = Ti.UI.createView({
		backgroundImage : '/images/settings.png',
		height : 65,
		width : 60,

	});
	secondsetting.add(secondsettingicon);

	// Create a Button.
	var secondhome = Ti.UI.createView({
		//backgroundImage : '/images/home1.png',
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
		height : 65,
		width : 60,

	});
	secondhome.add(secondhomeicon);
}

function Showalert() {
	var alertDialog = Titanium.UI.createAlertDialog({
		title : 'Upload Image',
		message : 'Would you want to parmanently hide this page  ?',
		buttonNames : ['Yes', 'No'],
		cancel : 1
	});

	alertDialog.addEventListener('click', function(theEvent) {
		if (theEvent.index !== theEvent.cancel) {
			//alert('hello');
		}
		switch (theEvent.index) {
			case 0:
				page = 'yes';
				myDatabase = Ti.Database.open('myDatabase');
				var sql = 'CREATE TABLE IF NOT EXISTS pages(page TEXT)';
				myDatabase.execute(sql);
				myDatabase.execute('INSERT INTO pages (page) VALUES(?)', page);
				myDatabase.close();
				var newWindowClass = require('/ui/common/showGoal');
					var newWindow = new newWindowClass();
			
                 var currentWin=first_text_view;
					newWindow.containingTab = currentWin.containingTab;
					
					currentWin.containingTab.open(newWindow, {
						animated : false
					});
				break;
			//This will never be reached, if you specified cancel for index 1
			case 1:
				page = 'no';
				myDatabase = Ti.Database.open('myDatabase');
				var sql = 'CREATE TABLE IF NOT EXISTS pages(page TEXT)';
				myDatabase.execute(sql);
				myDatabase.execute('INSERT INTO pages (page) VALUES(?)', page);
				myDatabase.close();
				break;
			default:
				break;
		}
	});
	alertDialog.show();
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
		style : Ti.UI.iPhone.ActivityIndicatorStyle.BIG,

	});
	indicatorView.add(activityIndicator);
	activityIndicator.show();
}

	return first_text_view;
};

module.exports = first_text_view;
