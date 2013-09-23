var Setting = Ti.UI.currentWindow;
Setting.orientationModes = [Ti.UI.PORTRAIT];

var myDatabase = Ti.Database.install('/myDatabase.sqlite', 'myDatabase.sqlite');
var settingResultSet = myDatabase.execute('SELECT * FROM Background_images');
var this_path = [];
var this_name = [];
var this_selected_view = [];

while (settingResultSet.isValidRow()) {
	this_path.push(settingResultSet.fieldByName('path'));
	this_name.push(settingResultSet.fieldByName('name'));
	this_selected_view.push(settingResultSet.fieldByName('selected_view'));
	//   Ti.API.info(this_username + ' ' + this_user_name + ' ' + this_user_email  + ' ' + this_user_password);
	settingResultSet.next();
}
var count = this_path.length;
settingResultSet.close();

var settingResultSet = myDatabase.execute('SELECT * FROM Background_images WHERE selected_view=?', '1');
var this_path = '';
var this_color = '';
while (settingResultSet.isValidRow()) {
	path = settingResultSet.fieldByName('path');
	this_color = settingResultSet.fieldByName('color_view');
	settingResultSet.next();
}
settingResultSet.close();

//***************************************************************Fonts******************************************

var fontsResultSet = myDatabase.execute('SELECT * FROM fonts WHERE selected=?', '1');
var this_font = '';
while (fontsResultSet.isValidRow()) {
	this_font = fontsResultSet.fieldByName('name');
	//   Ti.API.info(this_username + ' ' + this_user_name + ' ' + this_user_email  + ' ' + this_user_password);
	fontsResultSet.next();
}
fontsResultSet.close();

//**************************************************Social update*************************************************************

var socialResultSet = myDatabase.execute('SELECT * FROM Social_media WHERE rowid=?', '1');
var this_Social = '';

while (socialResultSet.isValidRow()) {
	this_Social = socialResultSet.fieldByName('social');

	socialResultSet.next();
}
socialResultSet.close();

var remindervalue = '';
var socialvalue = '';
var background = 'gray';
var fonts = 'georgia';
var tmp = (Titanium.Platform.displayCaps.platformHeight * 2.8) / 100;
var tmp2 = (Titanium.Platform.displayCaps.platformHeight * 2.2) / 100;
var tmp3 = (Titanium.Platform.displayCaps.platformHeight * 1.8) / 100;
var corner = Math.round(Ti.Platform.displayCaps.platformWidth * 0.01);

//create object instance, a parasitic subclass of Observable
var self = Titanium.UI.createView({
	backgroundColor : 'black',
	width : '100%',
	height : '100%',
});
Setting.add(self);

var subself = Titanium.UI.createView({
	backgroundColor : 'white',
	width : '96%',
	height : '96%',
	backgroundImage : path
});
self.add(subself);
var Getting_Started = Ti.UI.createLabel({
	text : 'Settings',
	color : 'black',
	font : {
		fontSize : tmp,
		fontFamily : this_font
	},
	left : '6.5%',
	top : '2%'
});
subself.add(Getting_Started);

var secondsubselfBottom = Titanium.UI.createView({
	width : '100%',
	height : '11%',
	bottom : '0%',
	backgroundImage : '/images/topbar.png',
	layout : 'horizontal'
});
subself.add(secondsubselfBottom);

var secondmyGoalBook = Ti.UI.createView({
	//backgroundImage : '/images/MyGoalBook.png',
	height : '100%',
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
		fullscreen : true
	});
	showGoal.open();
});

// Add to the parent view.
secondsubselfBottom.add(secondmyGoalBook);

var secondmyGoalBookicon = Ti.UI.createView({
	backgroundImage : '/images/MyGoalBook.png',
	height : 80,
	width : 80
});
secondmyGoalBook.add(secondmyGoalBookicon);

// Create a Button.
var secondCreate_goal = Ti.UI.createView({
	height : '100%',
	width : '20%',
	borderRadius : corner,
});

// Listen for click events.
secondCreate_goal.addEventListener('click', function() {
	var check = Ti.App.Properties.setBool('check', false);
	var Create_Goal = Titanium.UI.createWindow({
		backgroundColor : 'white',
		url : 'Create_Goal.js',
		orientationModes : 'PORTRAIT',
		navBarHidden : true,
		fullscreen : true
	});
	Create_Goal.open();
});
// Add to the parent view.
secondsubselfBottom.add(secondCreate_goal);

var secondCreate_goalicon = Ti.UI.createView({
	backgroundImage : '/images/createGoal.png',
	height : 80,
	width : 80,

});
secondCreate_goal.add(secondCreate_goalicon);

var secondcompleteGoal = Ti.UI.createView({
	height : '96%',
	width : '20%',
	borderRadius : corner,
});

// Listen for click events.
secondcompleteGoal.addEventListener('click', function() {

	indicator();

	var Goalcomplete = Titanium.UI.createWindow({
		backgroundColor : 'white',
		url : 'Goalcomplete.js',
		navBarHidden : true,
		fullscreen : true
	});
	Goalcomplete.open();
});

// Add to the parent view.
secondsubselfBottom.add(secondcompleteGoal);

var secondcompleteGoalicon = Ti.UI.createView({
	backgroundImage : '/images/Goal_complete.png',
	height : 80,
	width : 80,
});
secondcompleteGoal.add(secondcompleteGoalicon);

// Create a Button.
var secondsetting = Ti.UI.createView({
	backgroundColor : this_color,
	height : '96%',
	width : '20%',
	borderRadius : corner,
});

// Add to the parent view.
secondsubselfBottom.add(secondsetting);

var secondsettingicon = Ti.UI.createView({
	backgroundImage : '/images/settings.png',
	height : 80,
	width : 80,
});
secondsetting.add(secondsettingicon);

// Create a Button.
var secondhome = Ti.UI.createView({
	height : '100%',
	width : '19.5%',
	borderRadius : corner,
});

// Listen for click events.
secondhome.addEventListener('click', function() {
	var first_text_view = Ti.UI.createWindow({
		backgroundColor : 'white',
		url : 'first_text_view.js',
		navBarHidden : true,
		fullscreen : true
	});
	first_text_view.open();
});

// Add to the parent view.
secondsubselfBottom.add(secondhome);

var secondhomeicon = Ti.UI.createView({
	backgroundImage : '/images/home.png',
	height : 80,
	width : 80,

});
secondhome.add(secondhomeicon);

var view1 = Ti.UI.createView({
	backgroundColor : 'white',
	height : '8%',
	top : '9%',
	left : '5%',
	width : '90%',
	borderRadius : corner,
	borderColor : 'black',
	borderWidth : 1
});

view1.addEventListener('click', function() {
	subself.add(font_view);
	if (this_font == 'Chantelli_Antiqua') {
		fontView1.add(ImageView1);
	} else if (this_font == 'Aaargh') {
		fontView2.add(ImageView2);
	} else if (this_font == 'georgia') {
		fontView3.add(ImageView3);
	} else if (this_font == 'Vollkorn') {
		fontView4.add(ImageView4);
	} else if (this_font == 'Kameron') {
		fontView5.add(ImageView5);
	} else if (this_font == 'Alike') {
		fontView6.add(ImageView6);
	} else {
		fontView7.add(ImageView7);
	}
});

subself.add(view1);

// Create a Label.
var Choose_title = Ti.UI.createLabel({
	text : 'Choose Preferred Font:',
	color : 'black',
	font : {
		fontSize : tmp2,
		fontFamily : this_font
	},
	left : '2%',
	textAlign : 'center'
});

// Add to the parent view.
view1.add(Choose_title);

var Choose_subtitle = Ti.UI.createView({
	height : '100%',
	width : '18%',
	right : '0%',
	textAlign : 'center'
});
// Add to the parent view.
view1.add(Choose_subtitle);

var image1 = Ti.UI.createImageView({
	backgroundImage : '/images/arrow.png',
	height : '50%',
	width : '50%'
});
Choose_subtitle.add(image1);
var subtitle1 = Ti.UI.createLabel({
	text : 'All of your Goal Cards will utilise this Font',
	color : 'black',
	font : {
		fontSize : tmp3,
		fontFamily : this_font
	},
	left : '5%',
	right : '5%',
	top : '20%'
});

subself.add(subtitle1);

var view2 = Ti.UI.createView({
	backgroundColor : 'white',
	height : '8%',
	top : '27%',
	left : '5%',
	width : '90%',
	borderRadius : corner,
	borderColor : 'black',
	borderWidth : 1
});
view2.addEventListener('click', function() {
	subself.add(CARDs);
});

subself.add(view2);

// Create a Label.
var Choose_title = Ti.UI.createLabel({
	text : 'Choose Preferred Background:',
	color : 'black',
	font : {
		fontSize : tmp2,
		fontFamily : this_font
	},
	left : '2%',
	textAlign : 'center'
});

// Add to the parent view.
view2.add(Choose_title);

var Choose_subtitle = Ti.UI.createView({
	height : '100%',
	width : '18%',
	right : '0%'
});
// Add to the parent view.
view2.add(Choose_subtitle);

var image2 = Ti.UI.createImageView({
	backgroundImage : '/images/arrow.png',
	height : '50%',
	width : '50%'
});
Choose_subtitle.add(image2);

var view3 = Ti.UI.createView({
	backgroundColor : 'white',
	height : '8%',
	top : '45%',
	left : '5%',
	width : '90%',
	borderRadius : corner,
	borderColor : 'black',
	borderWidth : 1
});

subself.add(view3);

// Create a Label.
var Choose_title = Ti.UI.createLabel({
	text : 'Social Media Updates:',
	color : 'black',
	font : {
		fontSize : tmp2,
		fontFamily : this_font
	},
	left : '2%',
	textAlign : 'center'
});

// Add to the parent view.
view3.add(Choose_title);

if (this_Social == 'yes') {
	socialvalue = true;
} else {
	socialvalue = false;
}
// Create a Switch.
var aSwitch = Ti.UI.createSwitch({
	right : '1%',
	value : socialvalue
});

// Listen for change events.
aSwitch.addEventListener('change', function(e) {
	if (aSwitch.value == true) {
		myDatabase.execute('UPDATE Social_media SET social=? WHERE rowid=?', 'yes', '1');
	} else {
		myDatabase.execute('UPDATE Social_media SET social=? WHERE rowid=?', 'no', '1');
	}
});

// Add to the parent view.
view3.add(aSwitch);

var subtitle3 = Ti.UI.createLabel({
	text : 'set up your account to upload your complete Goals/ Next Step to your Social Media accounts',
	color : 'black',
	font : {
		fontSize : tmp3,
		fontFamily : this_font
	},
	left : '5%',
	top : '56%',
	right : '5%',
	textAlign : 'center'
});

subself.add(subtitle3);

var view4 = Ti.UI.createView({
	backgroundColor : 'white',
	height : '8%',
	top : '63%',
	left : '5%',
	width : '90%',
	borderRadius : corner,
	borderColor : 'black',
	borderWidth : 1
});

subself.add(view4);

// Create a Label.
var Choose_title = Ti.UI.createLabel({
	text : 'Set Update Reminder:',
	color : 'black',
	font : {
		fontSize : tmp2,
		fontFamily : this_font
	},
	left : '2%',
	textAlign : 'center'
});

// Add to the parent view.
view4.add(Choose_title);

var subtitle4 = Ti.UI.createLabel({
	text : 'set up regular notifications to remind you to review your goal book at least twice a day',
	color : 'black',
	font : {
		fontSize : tmp3,
		fontFamily : this_font
	},
	left : '5%',
	right : '5%',
	top : '73%',
	textAlign : 'center'
});

subself.add(subtitle4);

// Create a Button.
var Set_Reminder = Ti.UI.createButton({
	title : 'Reminder',
	height : '80%',
	width : '30%',
	right : '2%',
	font:{fontSize:tmp2}
});
var calendar = require('com.gs.calendar');
// Listen for click events.
Set_Reminder.addEventListener('click', function() {
	var startDate = new Date();
	// event should start now
	var endDate = new Date();
	endDate.setHours(startDate.getHours() + 2);
	// and end two hours from now

	// create and show the event dialog
	var eventDialog = calendar.createEventDialog({
		eventTitle : "My Goal Book", // optional
		eventStartDate : startDate, // optional
		eventEndDate : endDate, // optional
		eventLocation : "My Location", // optional
		eventNotes : "This is my notes", // optional

		//eventAllDay:true,			// optional - can set to true for all day events

		animated : true, // optional - default is true
		barColor : "#000"	// optional - sets the navbar color
	});

	// attach a listener for the "complete" event
	eventDialog.addEventListener("complete", function(e) {
		if (e.success) {
			// event was added!
			//label.text = "Event was successfully added";
			//Titanium.API.info("eventIdentifier of the added event: " + e.eventIdentifier);

		} else {
			// event was NOT added

			switch (e.action) {
				case eventDialog.CANCELED:
					//label.text = "User has canceled the dialog";
					break;
				case eventDialog.NOT_SUPPORTED:
					//label.text = "EventKit is only supported on iOS 4 and newer";
					break;
				case eventDialog.SAVED:
					// user tried to save the event, but something went wrong
					//label.text = "Error while trying to save the event";
					break;
			}
		}
	});

	// show the event dialog
	eventDialog.open();

	//888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888

	function printEventDetails(eventID) {
		Ti.API.info('eventID:' + eventID);
		var defCalendar = Ti.Calendar.defaultCalendar;
		var eventFromCalendar = defCalendar.getEventById(eventID);
		if (eventFromCalendar != null) {
			Ti.API.info('Printing event values ::');
			Ti.API.info('title : ' + eventFromCalendar.title);
			Ti.API.info('notes : ' + eventFromCalendar.notes);
			Ti.API.info('location:' + eventFromCalendar.location);
			Ti.API.info('allDay ? :' + eventFromCalendar.allDay);
			Ti.API.info('status : ' + eventFromCalendar.status);
			Ti.API.info('availability : ' + eventFromCalendar.availability);
			Ti.API.info('hasAlarm ? : ' + eventFromCalendar.hasAlarm);
			Ti.API.info('id : ' + eventFromCalendar.id);
			Ti.API.info('isDetached ? : ' + eventFromCalendar.isDetached);
			Ti.API.info('begin : ' + eventFromCalendar.begin);
			Ti.API.info('end : ' + eventFromCalendar.end);
			var eventRule = eventFromCalendar.recurrenceRules;
			Ti.API.info("recurrenceRules : " + eventRule);
			for (var i = 0; i < eventRule.length; i++) {
				Ti.API.info("Rule # " + i);
				Ti.API.info('frequency : ' + eventRule[i].frequency);
				Ti.API.info('interval : ' + eventRule[i].interval);
				Ti.API.info('daysofTheWeek : ');
				var daysofTheWeek = eventRule[i].daysOfTheWeek;
				for (var j = 0; j < daysofTheWeek.length; j++) {
					Ti.API.info('{ dayOfWeek : ' + daysofTheWeek[j].dayOfWeek + 'weekNumber : ' + daysofTheWeek[j].week + '}, ');
				}
				Ti.API.info('firstDayOfTheWeek : ' + eventRule[i].firstDayOfTheWeek);
				Ti.API.info('daysOfTheMonth : ');
				var daysOfTheMonth = eventRule[i].daysOfTheMonth;
				for (var j = 0; j < daysOfTheMonth.length; j++) {
					Ti.API.info(' ' + daysOfTheMonth[j]);
				}
				Ti.API.info('daysOfTheYear : ');
				var daysOfTheYear = eventRule[i].daysOfTheYear;
				for (var j = 0; i < daysOfTheYear.length; j++) {
					Ti.API.info(' ' + daysOfTheYear[j]);
				}
				Ti.API.info('weeksOfTheYear : ');
				var weeksOfTheYear = eventRule[i].weeksOfTheYear;
				for (var j = 0; j < weeksOfTheYear.length; j++) {
					Ti.API.info(' ' + weeksOfTheYear[j]);
				}
				Ti.API.info('monthsOfTheYear : ');
				var monthsOfTheYear = eventRule[i].monthsOfTheYear;
				for (var j = 0; j < monthsOfTheYear.length; j++) {
					Ti.API.info(' ' + monthsOfTheYear[j]);
				}
				Ti.API.info('daysOfTheYear : ');
				var setPositions = eventRule[i].setPositions;
				for (var j = 0; j < setPositions.length; j++) {
					Ti.API.info(' ' + setPositions[j]);
				}
			};
			Ti.API.info('alerts : ' + eventFromCalendar.alerts);
			var newAlerts = eventFromCalendar.alerts;

			for (var i = 0; i < newAlerts.length; i++) {
				Ti.API.info('*****ALert ' + i);
				Ti.API.info('absoluteDate :' + newAlerts[i].absoluteDate);
				Ti.API.info('relativeOffset ;' + newAlerts[i].relativeOffset);
			}
		}
	}

	if (Ti.Calendar.eventsAuthorization == Ti.Calendar.AUTHORIZATION_AUTHORIZED) {
		//performCalendarWriteFunctions();
	} else {
		Ti.Calendar.requestEventsAuthorization(function(e) {
			if (e.success) {

			} else {
				alert('Access to calendar is not allowed');
			}
		});
	}
});

// Add to the parent view.
view4.add(Set_Reminder);

//**************************************************************************************Background View*****************************************************

var background_view = Ti.UI.createView({
	backgroundImage : '/images/topbar_dark.png',
	height : '90%',
	width : '90%',
	borderColor : 'black',
	borderRadius : 5
});

var background1 = Ti.UI.createView({
	backgroundImage : '/images/bg1.png',
	height : '50%',
	width : '50%',
	top : '0%',
	left : '0%',
	borderColor : 'black',
	borderRadius : 5
});
background1.addEventListener('click', function() {

	indicator();

	myDatabase.execute('UPDATE Background_images SET selected_view=?', '0');
	myDatabase.execute('UPDATE Background_images SET selected_view=? WHERE name=?', '1', 'gray');
	var Settings = Titanium.UI.createWindow({
		backgroundColor : 'white',
		url : 'Setting.js',
		orientationModes : 'PORTRAIT',
		navBarHidden : true,
		fullscreen : true
	});
	Settings.open();
	subself.remove(CARDs);
});
background_view.add(background1);

var background2 = Ti.UI.createView({
	backgroundImage : '/images/bg2.png',
	height : '100%',
	width : '100%',
	top : '0%',
	left : '50%',
	borderColor : 'black',
	borderRadius : 5
});
background2.addEventListener('click', function() {

	indicator();

	myDatabase.execute('UPDATE Background_images SET selected_view=?', '0');
	myDatabase.execute('UPDATE Background_images SET selected_view=? WHERE name=?', '1', 'yellow');
	var Settings = Titanium.UI.createWindow({
		backgroundColor : 'white',
		url : 'Setting.js',
		orientationModes : 'PORTRAIT',
		navBarHidden : true,
		fullscreen : true
	});
	Settings.open();
	subself.remove(CARDs);
});
background_view.add(background2);

var background3 = Ti.UI.createView({
	backgroundImage : '/images/bg3.png',
	height : '100%',
	width : '100%',
	top : '50%',
	left : '0%',
	borderColor : 'black',
	borderRadius : 5
});
background3.addEventListener('click', function() {

	indicator();

	myDatabase.execute('UPDATE Background_images SET selected_view=?', '0');
	myDatabase.execute('UPDATE Background_images SET selected_view=? WHERE name=?', '1', 'sky');
	var Settings = Titanium.UI.createWindow({
		backgroundColor : 'white',
		url : 'Setting.js',
		orientationModes : 'PORTRAIT',
		navBarHidden : true,
		fullscreen : true
	});
	Settings.open();
	subself.remove(CARDs);
});
background_view.add(background3);

var background4 = Ti.UI.createView({
	backgroundImage : '/images/bg4.png',
	height : '100%',
	width : '100%',
	top : '50%',
	left : '50%',
	borderColor : 'black',
	borderRadius : 5
});
background4.addEventListener('click', function() {

	indicator();

	myDatabase.execute('UPDATE Background_images SET selected_view=?', '0');
	myDatabase.execute('UPDATE Background_images SET selected_view=? WHERE name=?', '1', 'blue');
	var Settings = Titanium.UI.createWindow({
		backgroundColor : 'white',
		url : 'Setting.js',
		orientationModes : 'PORTRAIT',
		navBarHidden : true,
		fullscreen : true
	});
	Settings.open();
	subself.remove(CARDs);
});
background_view.add(background4);

var background_view2 = Ti.UI.createView({
	backgroundImage : '/images/topbar_dark.png',
	height : '90%',
	width : '90%',
	borderColor : 'black',
	borderRadius : 5
});

var background21 = Ti.UI.createView({
	backgroundImage : 'none',
	height : '50%',
	width : '50%',
	top : '0%',
	left : '0%',
	borderColor : 'black',
	borderRadius : 5
});
background21.addEventListener('click', function() {

	indicator();

	myDatabase.execute('UPDATE Background_images SET selected_view=?', '0');
	myDatabase.execute('UPDATE Background_images SET selected_view=? WHERE name=?', '1', 'white');
	var Settings = Titanium.UI.createWindow({
		backgroundColor : 'white',
		url : 'Setting.js',
		orientationModes : 'PORTRAIT',
		navBarHidden : true,
		fullscreen : true
	});
	Settings.open();
	subself.remove(CARDs);
});
background_view2.add(background21);

var CARDs = Ti.UI.createScrollableView({
	views : [background_view, background_view2]
	//showPagingControl : true
});

//**************************************************************************************Font View*****************************************************

var font_view = Ti.UI.createView({
	height : '100%',
	width : '100%',
});

var font_top_view = Ti.UI.createView({
	height : '58%',
	width : '100%',
	top : '0%'
});
font_top_view.addEventListener('click', function() {
	subself.remove(font_view);
})
font_view.add(font_top_view);

var font_bottom_main_view = Ti.UI.createView({
	backgroundColor : 'white',
	height : '40%',
	width : '90%',
	borderColor : 'black',
	borderRadius : 5,
	bottom : '2%'
});
font_view.add(font_bottom_main_view);

var font_bottom_view = Ti.UI.createScrollView({
	backgroundColor : 'white',
	height : '90%',
	width : '100%',
	top : '10%',
	layout : 'vertical'
});
font_bottom_main_view.add(font_bottom_view);

var fontView1 = Ti.UI.createView({
	backgroundImage : '/images/topbar.png',
	height : '30%',
	width : '90%',
	borderColor : 'black',
	borderRadius : 5
});

var ImageView1 = Ti.UI.createImageView({
	image : '/images/tick.png',
	width : '10%',
	height : '50%',
	right : '5%'
});

fontView1.addEventListener('click', function() {

	indicator();

	fontView1.add(ImageView1);

	myDatabase.execute('UPDATE Fonts SET selected=?', '0');
	myDatabase.execute('UPDATE Fonts SET selected=? WHERE name=?', '1', 'Chantelli_Antiqua');
	var Settings = Titanium.UI.createWindow({
		backgroundColor : 'white',
		url : 'Setting.js',
		orientationModes : 'PORTRAIT',
		navBarHidden : true,
		fullscreen : true
	});
	Settings.open();

});
font_bottom_view.add(fontView1);

var font1 = Ti.UI.createLabel({
	text : 'Chantelli Antiqua',
	color : 'black',
	font : {
		fontSize : tmp,
		fontFamily : 'Chantelli_Antiqua'
	},
	left : '5%'
})

fontView1.add(font1);

var fontView2 = Ti.UI.createView({
	backgroundImage : '/images/topbar.png',
	height : '30%',
	width : '90%',
	borderColor : 'black',
	borderRadius : 5
});

var ImageView2 = Ti.UI.createImageView({
	image : '/images/tick.png',
	width : '10%',
	height : '50%',
	right : '5%'
});

fontView2.addEventListener('click', function() {

	indicator();

	fontView2.add(ImageView2);

	myDatabase.execute('UPDATE Fonts SET selected=?', '0');
	myDatabase.execute('UPDATE Fonts SET selected=? WHERE name=?', '1', 'Aaargh');
	var Settings = Titanium.UI.createWindow({
		backgroundColor : 'white',
		url : 'Setting.js',
		orientationModes : 'PORTRAIT',
		navBarHidden : true,
		fullscreen : true
	});
	Settings.open();

});

font_bottom_view.add(fontView2);

var font2 = Ti.UI.createLabel({
	text : 'Aaargh',
	color : 'black',
	font : {
		fontSize : tmp,
		fontFamily : 'Aaargh'
	},
	left : '5%'
});

fontView2.add(font2);

var fontView3 = Ti.UI.createView({
	backgroundImage : '/images/topbar.png',
	height : '30%',
	width : '90%',
	borderColor : 'black',
	borderRadius : 5
});

var ImageView3 = Ti.UI.createImageView({
	image : '/images/tick.png',
	width : '10%',
	height : '50%',
	right : '5%'
});

fontView3.addEventListener('click', function() {

	indicator();

	fontView3.add(ImageView3);

	myDatabase.execute('UPDATE Fonts SET selected=?', '0');
	myDatabase.execute('UPDATE Fonts SET selected=? WHERE name=?', '1', 'georgia');
	var Settings = Titanium.UI.createWindow({
		backgroundColor : 'white',
		url : 'Setting.js',
		orientationModes : 'PORTRAIT',
		navBarHidden : true,
		fullscreen : true
	});
	Settings.open();

});
font_bottom_view.add(fontView3);

var font3 = Ti.UI.createLabel({
	text : 'georgia',
	color : 'black',
	font : {
		fontSize : tmp,
		fontFamily : 'georgia'
	},
	left : '5%'
});

fontView3.add(font3);

var fontView4 = Ti.UI.createView({
	backgroundImage : '/images/topbar.png',
	height : '30%',
	width : '90%',
	borderColor : 'black',
	borderRadius : 5
});

var ImageView4 = Ti.UI.createImageView({
	image : '/images/tick.png',
	width : '10%',
	height : '50%',
	right : '5%'
});

fontView4.addEventListener('click', function() {

	indicator();

	fontView4.add(ImageView4);

	myDatabase.execute('UPDATE Fonts SET selected=?', '0');
	myDatabase.execute('UPDATE Fonts SET selected=? WHERE name=?', '1', 'Vollkorn');
	var Settings = Titanium.UI.createWindow({
		backgroundColor : 'white',
		url : 'Setting.js',
		orientationModes : 'PORTRAIT',
		navBarHidden : true,
		fullscreen : true
	});
	Settings.open();

});
font_bottom_view.add(fontView4);

var font4 = Ti.UI.createLabel({
	text : 'Vollkorn',
	color : 'black',
	font : {
		fontSize : tmp,
		fontFamily : 'Vollkorn'
	},
	left : '5%'
});

fontView4.add(font4);

var fontView5 = Ti.UI.createView({
	backgroundImage : '/images/topbar.png',
	height : '30%',
	width : '90%',
	borderColor : 'black',
	borderRadius : 5
});

var ImageView5 = Ti.UI.createImageView({
	image : '/images/tick.png',
	width : '10%',
	height : '50%',
	right : '5%'
});

fontView5.addEventListener('click', function() {

	indicator();

	fontView5.add(ImageView5);

	myDatabase.execute('UPDATE Fonts SET selected=?', '0');
	myDatabase.execute('UPDATE Fonts SET selected=? WHERE name=?', '1', 'Kameron');
	var Settings = Titanium.UI.createWindow({
		backgroundColor : 'white',
		url : 'Setting.js',
		orientationModes : 'PORTRAIT',
		navBarHidden : true,
		fullscreen : true
	});
	Settings.open();

});
font_bottom_view.add(fontView5);

var font5 = Ti.UI.createLabel({
	text : 'Kameron',
	color : 'black',
	font : {
		fontSize : tmp,
		fontFamily : 'Kameron'
	},
	left : '5%'
});

fontView5.add(font5);

var fontView6 = Ti.UI.createView({
	backgroundImage : '/images/topbar.png',
	height : '30%',
	width : '90%',
	borderColor : 'black',
	borderRadius : 5
});

var ImageView6 = Ti.UI.createImageView({
	image : '/images/tick.png',
	width : '10%',
	height : '50%',
	right : '5%'
});

fontView6.addEventListener('click', function() {

	indicator();

	fontView6.add(ImageView6);

	myDatabase.execute('UPDATE Fonts SET selected=?', '0');
	myDatabase.execute('UPDATE Fonts SET selected=? WHERE name=?', '1', 'Alike');
	var Settings = Titanium.UI.createWindow({
		backgroundColor : 'white',
		url : 'Setting.js',
		orientationModes : 'PORTRAIT',
		navBarHidden : true,
		fullscreen : true
	});
	Settings.open();

});
font_bottom_view.add(fontView6);

var font6 = Ti.UI.createLabel({
	text : 'Alike',
	color : 'black',
	font : {
		fontSize : tmp,
		fontFamily : 'Alike'
	},
	left : '5%'
});

fontView6.add(font6);

var fontView7 = Ti.UI.createView({
	backgroundImage : '/images/topbar.png',
	height : '30%',
	width : '90%',
	borderColor : 'black',
	borderRadius : 5
});
font_bottom_view.add(fontView7);

var ImageView7 = Ti.UI.createImageView({
	image : '/images/tick.png',
	width : '10%',
	height : '50%',
	right : '5%'
});

fontView7.addEventListener('click', function() {

	indicator();

	fontView7.add(ImageView7);
	myDatabase.execute('UPDATE Fonts SET selected=?', '0');
	myDatabase.execute('UPDATE Fonts SET selected=? WHERE name=?', '1', 'SF Arch Rival');
	var Settings = Titanium.UI.createWindow({
		backgroundColor : 'white',
		url : 'Setting.js',
		orientationModes : 'PORTRAIT',
		navBarHidden : true,
		fullscreen : true
	});
	Settings.open();

});

var font7 = Ti.UI.createLabel({
	text : 'SF Arch Rival',
	color : 'black',
	font : {
		fontSize : tmp,
		fontFamily : 'SF Arch Rival'
	},
	left : '5%',
});

fontView7.add(font7);

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

