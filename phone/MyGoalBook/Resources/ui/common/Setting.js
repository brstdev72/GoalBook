var Setting = Ti.UI.currentWindow;
Setting.orientationModes = [Ti.UI.PORTRAIT];

var hgt = Titanium.Platform.displayCaps.platformHeight;

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
var this_names ='';
while (settingResultSet.isValidRow()) {
	path = settingResultSet.fieldByName('path');
	this_color = settingResultSet.fieldByName('color_view');
	this_names = settingResultSet.fieldByName('name');
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

//**************************************************Reminder*************************************************************

var reminderResultSet = myDatabase.execute('SELECT * FROM Reminder WHERE rowid=?', '1');
var this_reminder = '';
while (reminderResultSet.isValidRow()) {
	this_reminder = reminderResultSet.fieldByName('reminder');
	//   Ti.API.info(this_username + ' ' + this_user_name + ' ' + this_user_email  + ' ' + this_user_password);
	reminderResultSet.next();
}
reminderResultSet.close();

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
var tmp = (Titanium.Platform.displayCaps.platformHeight * 3.8) / 100;
var tmp2 = (Titanium.Platform.displayCaps.platformHeight * 2.8) / 100;
var tmp3 = (Titanium.Platform.displayCaps.platformHeight * 2) / 100;
var corner = Math.round(Ti.Platform.displayCaps.platformWidth * 0.01);
var width = Math.round(Ti.Platform.displayCaps.platformWidth * 0.003);

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
	width : 35
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
	width : 35

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
	width : 35
});
secondcompleteGoal.add(secondcompleteGoalicon);

// Create a Button.
var secondsetting = Ti.UI.createView({
	backgroundColor : this_color,
	height : '96%',
	width : '20%',
	borderRadius : corner,
	top : '2%'
});

// Add to the parent view.
secondsubselfBottom.add(secondsetting);

var secondsettingicon = Ti.UI.createView({
	backgroundImage : '/images/settings1.png',
	height : 35,
	width : 35
});
secondsetting.add(secondsettingicon);

// Create a Button.
var secondhome = Ti.UI.createView({
	height : '100%',
	width : '20%',
	borderRadius : corner,
});

// Listen for click events.
secondhome.addEventListener('click', function() {

	indicator();

	var first_text_view = Ti.UI.createWindow({
		backgroundColor : 'white',
		url : 'first_text_view.js',
		navBarHidden : true,
		fullscreen : true,
		exitOnClose : true
	});
	first_text_view.open();
});

// Add to the parent view.
secondsubselfBottom.add(secondhome);

var secondhomeicon = Ti.UI.createView({
	backgroundImage : '/images/home.png',
	height : 35,
	width : 35

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
	borderWidth : width
});
view1.addEventListener('click', function() {
	subself.add(font_view);
	if (this_font == 'Chantelli_Antiqua') {
		fontView1.add(ImageView1);
	} else if (this_font == 'Aaargh') {
		fontView2.add(ImageView2);
	} else if (this_font == 'georgia') {
		fontView3.add(ImageView3);
	} else if (this_font == 'Vollkorn-Regular') {
		fontView4.add(ImageView4);
	} else if (this_font == 'Kameron-Regular') {
		fontView5.add(ImageView5);
	} else if (this_font == 'Alike-Regular') {
		fontView6.add(ImageView6);
	} else if (this_font == 'SF Arch Rival') {
		fontView7.add(ImageView7);
	} else if (this_font == 'PRINC___') {
		fontView8.add(ImageView8);
	} else if (this_font == 'ASENINE_') {
		fontView9.add(ImageView9);
	} else if (this_font == 'DejaVuSerif') {
		fontView10.add(ImageView10);
	} else if (this_font == 'SplendidN') {
		fontView11.add(ImageView11);
	} else {
		fontView12.add(ImageView12);
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
	borderWidth : width
});
view2.addEventListener('click', function() {
	self.add(background_main);
		subself.opacity = 0.7;
		var ImageView = Ti.UI.createImageView({
			image : '/images/tk.png',
			width : '20%',
			height : '15%',
			bottom : 5,
			right : 5
		});
		if (this_names == 'white') {
			background1.add(ImageView);
		} else if (this_names == 'yellow') {
			background2.add(ImageView);
		} else if (this_names == 'sky') {
			background3.add(ImageView);
		} else if (this_names == 'blue') {
			background4.add(ImageView);
		} else if (this_names == 'gray') {
			background21.add(ImageView);
		} else if (this_names == 'color03') {
			background22.add(ImageView);
		} else if (this_names == 'color16') {
			background23.add(ImageView);
		} else if (this_names == 'color19') {
			background24.add(ImageView);
		} else if (this_names == 'color23') {
			background31.add(ImageView);
		} else if (this_names == 'color25') {
			background32.add(ImageView);
		} else if (this_names == 'color27') {
			background33.add(ImageView);
		} else if (this_names == 'color33') {
			background34.add(ImageView);
		} else if (this_names == 'color36') {
			background41.add(ImageView);
		} else if (this_names == 'color45') {
			background42.add(ImageView);
		} else if (this_names == 'color48') {
			background43.add(ImageView);
		} else {
			background44.add(ImageView);
		}
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
	borderWidth : width
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

// Create a Switch.
var aSwitch = Ti.UI.createSwitch({
	backgroundImage : '/images/on_btn.png',
	right : '1%',
	height : '80%',
	width : '30%',
	titleOff : '',
	title : '',
	titleOn : '',
	value : socialvalue
});

// Listen for change events.
aSwitch.addEventListener('change', function(e) {
	if (aSwitch.value == true) {
		myDatabase.execute('UPDATE Social_media SET social=? WHERE rowid=?', 'yes', '1');
		aSwitch.backgroundImage = '/images/on_btn.png';
	} else {
		myDatabase.execute('UPDATE Social_media SET social=? WHERE rowid=?', 'no', '1');
		aSwitch.backgroundImage = '/images/off_btn.png';
	}
});

if (this_Social == 'yes') {
	socialvalue = true;
	aSwitch.backgroundImage = '/images/on_btn.png';
} else {
	socialvalue = false;
	aSwitch.backgroundImage = '/images/off_btn.png';
}

// Add to the parent view.
view3.add(aSwitch);

var image3 = Ti.UI.createImageView({
	backgroundImage : '/images/arrow.png',
	height : '50%',
	width : '50%'
});
Choose_subtitle.add(image3);

var subtitle3 = Ti.UI.createLabel({
	text : 'set up your account to upload your complete Goals/ Affirmations to your Social Media accounts',
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
	borderWidth : width
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

var setReminder = Ti.UI.createButton({
	height : '90%',
	width : '30%',
	top : '5%',
	font : {
		fontSize : tmp2
	},
	title : 'Reminder',
	right : '1%'
});
// Listen for change events.
setReminder.addEventListener('click', function(e) {
	var SetReminder = Ti.UI.createWindow({
		backgroundColor : 'white',
		url : 'SetReminder.js',
		navBarHidden : true,
		fullscreen : true,
		exitOnClose : true
	});
	SetReminder.open();
});

// Add to the parent view.
view4.add(setReminder);

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

//**************************************************************************************Background View*****************************************************

var background_view = Ti.UI.createView({
	backgroundImage : '/images/topbar_dark.png',
	height : '90%',
	width : '90%',
	borderColor : 'black',
	borderRadius : 5,
	borderWidth : 2
});

var background1 = Ti.UI.createView({
	backgroundImage : '/images/tbg1.png',
	height : '50%',
	width : '50%',
	top : '0%',
	left : '0%',
	borderColor : 'black',
	borderRadius : 5,
	borderWidth : 2
});
background1.addEventListener('click', function() {
	indicator();
	myDatabase.execute('UPDATE Background_images SET selected_view=?', '0');
	myDatabase.execute('UPDATE Background_images SET selected_view=? WHERE name=?', '1', 'gray');
	var Settings = Titanium.UI.createWindow({
		backgroundColor : 'white',
		url : 'Setting.js',
		navBarHidden : true,
		fullscreen : true,
		exitOnClose : true
	});
	Settings.open();
	subself.remove(background_view);
});
background_view.add(background1);

var background2 = Ti.UI.createView({
	backgroundImage : '/images/tbg2.png',
	height : '100%',
	width : '100%',
	top : '0%',
	left : '50%',
	borderColor : 'black',
	borderRadius : 5,
	borderWidth : 2
});
background2.addEventListener('click', function() {
	indicator();

	myDatabase.execute('UPDATE Background_images SET selected_view=?', '0');
	myDatabase.execute('UPDATE Background_images SET selected_view=? WHERE name=?', '1', 'yellow');
	var Settings = Titanium.UI.createWindow({
		backgroundColor : 'white',
		url : 'Setting.js',
		navBarHidden : true,
		fullscreen : true,
		exitOnClose : true
	});
	Settings.open();
	subself.remove(background_view);
});
background_view.add(background2);

var background3 = Ti.UI.createView({
	backgroundImage : '/images/tbg3.png',
	height : '100%',
	width : '100%',
	top : '50%',
	left : '0%',
	borderColor : 'black',
	borderRadius : 5,
	borderWidth : 2
});
background3.addEventListener('click', function() {

	indicator();

	myDatabase.execute('UPDATE Background_images SET selected_view=?', '0');
	myDatabase.execute('UPDATE Background_images SET selected_view=? WHERE name=?', '1', 'sky');
	var Settings = Titanium.UI.createWindow({
		backgroundColor : 'white',
		url : 'Setting.js',
		navBarHidden : true,
		fullscreen : true,
		exitOnClose : true
	});
	Settings.open();
	subself.remove(background_view);
});
background_view.add(background3);

var background4 = Ti.UI.createView({
	backgroundImage : '/images/tbg4.png',
	height : '100%',
	width : '100%',
	top : '50%',
	left : '50%',
	borderColor : 'black',
	borderRadius : 5,
	borderWidth : 2
});
background4.addEventListener('click', function() {

	indicator();

	myDatabase.execute('UPDATE Background_images SET selected_view=?', '0');
	myDatabase.execute('UPDATE Background_images SET selected_view=? WHERE name=?', '1', 'blue');
	var Settings = Titanium.UI.createWindow({
		backgroundColor : 'white',
		url : 'Setting.js',
		navBarHidden : true,
		fullscreen : true,
		exitOnClose : true
	});
	Settings.open();
	subself.remove(background_view);
});
background_view.add(background4);

var background_view2 = Ti.UI.createView({
	backgroundImage : '/images/topbar_dark.png',
	height : '90%',
	width : '90%',
	borderColor : 'black',
	borderRadius : 5,
	borderWidth : 2
});

var background21 = Ti.UI.createView({
	backgroundColor : 'white',
	backgroundImage : 'none',
	height : '50%',
	width : '50%',
	top : '0%',
	left : '0%',
	borderColor : 'black',
	borderRadius : 5,
	borderWidth : 2
});
background21.addEventListener('click', function() {
	indicator();
	myDatabase.execute('UPDATE Background_images SET selected_view=?', '0');
	myDatabase.execute('UPDATE Background_images SET selected_view=? WHERE name=?', '1', 'white');
	var Settings = Titanium.UI.createWindow({
		backgroundColor : 'white',
		url : 'Setting.js',
		navBarHidden : true,
		fullscreen : true,
		exitOnClose : true
	});
	Settings.open();
	subself.remove(background_view);
});
background_view2.add(background21);

var CARDs = Ti.UI.createScrollableView({
	backgroundImage : '/images/topbar_dark.png',
	height : '90%',
	width : '90%',
	views : [background_view, background_view2]
	//showPagingControl : true
});
var background_main = Ti.UI.createView({
	height : '100%',
	width : '100%',
});

var background_sub_main = Ti.UI.createView({
	//backgroundImage : '/images/topbar_dark.png',
	height : '90%',
	width : '90%',
	borderRadius : 5
});
background_main.add(background_sub_main);

var background_view = Ti.UI.createView({
	height : '100%',
	width : '100%',
	borderColor : 'black',
	borderRadius : 5
});

var background1 = Ti.UI.createView({
	backgroundImage : '/images/topbar_dark.png',
	height : '50%',
	width : '50%',
	top : '0%',
	left : '0%',
	borderColor : 'black',
	//borderRadius : 5
});
background1.addEventListener('click', function() {
	backgroundset(background1);
	backgroundfun('white');
});
background_view.add(background1);

var background2 = Ti.UI.createView({
	backgroundImage : '/images/tbg2.png',
	height : '50%',
	width : '50%',
	top : '0%',
	left : '50%',
	borderColor : 'black',
	//borderRadius : 5
});
background2.addEventListener('click', function() {
	backgroundfun('yellow');
	backgroundset(background2);
});
background_view.add(background2);

var background3 = Ti.UI.createView({
	backgroundImage : '/images/tbg3.png',
	height : '50%',
	width : '50%',
	top : '50%',
	left : '0%',
	borderColor : 'black',
	//borderRadius : 5
});
background3.addEventListener('click', function() {
	backgroundfun('sky');
	backgroundset(background3);
});
background_view.add(background3);

var background4 = Ti.UI.createView({
	backgroundImage : '/images/tbg4.png',
	height : '50%',
	width : '50%',
	top : '50%',
	left : '50%',
	borderColor : 'black',
	//borderRadius : 5
});
background4.addEventListener('click', function() {
	backgroundfun('blue');
	backgroundset(background4);
});
background_view.add(background4);

//**************************22222222222222222222222222222*******************************

var background_view2 = Ti.UI.createView({
	backgroundImage : '/images/topbar_dark.png',
	height : '100%',
	width : '100%',
	borderColor : 'black',
	borderRadius : 5
});

var background21 = Ti.UI.createView({
	backgroundImage : '/images/tbg1.png',
	height : '50%',
	width : '50%',
	top : '0%',
	left : '0%',
	borderColor : 'black',
	//borderRadius : 5
});
background21.addEventListener('click', function() {
	backgroundfun('gray');
	backgroundset(background21);
});
background_view2.add(background21);

var background22 = Ti.UI.createView({
	backgroundImage : '/images/tbg03.png',
	height : '50%',
	width : '50%',
	top : '0%',
	left : '50%',
	borderColor : 'black',
	//borderRadius : 5
});
background22.addEventListener('click', function() {
	backgroundfun('color03');
	backgroundset(background22);
});
background_view2.add(background22);

var background23 = Ti.UI.createView({
	backgroundImage : '/images/tbg16.png',
	height : '50%',
	width : '50%',
	top : '50%',
	left : '0%',
	borderColor : 'black',
	//borderRadius : 5
});
background23.addEventListener('click', function() {
	backgroundfun('color16');
	backgroundset(background23);
});
background_view2.add(background23);

var background24 = Ti.UI.createView({
	backgroundImage : '/images/tbg19.png',
	height : '50%',
	width : '50%',
	top : '50%',
	left : '50%',
	borderColor : 'black',
	//borderRadius : 5
});
background24.addEventListener('click', function() {
	backgroundfun('color19');
	backgroundset(background24);
});
background_view2.add(background24);

//**************************33333333333333333333333333333*******************************

var background_view3 = Ti.UI.createView({
	backgroundImage : '/images/topbar_dark.png',
	height : '100%',
	width : '100%',
	borderColor : 'black',
	borderRadius : 5
});

var background31 = Ti.UI.createView({
	backgroundImage : '/images/tbg23.png',
	height : '50%',
	width : '50%',
	top : '0%',
	left : '0%',
	borderColor : 'black',
	//borderRadius : 5
});
background31.addEventListener('click', function() {
	backgroundfun('color23');
	backgroundset(background31);
});
background_view3.add(background31);

var background32 = Ti.UI.createView({
	backgroundImage : '/images/tbg25.png',
	height : '50%',
	width : '50%',
	top : '0%',
	left : '50%',
	borderColor : 'black',
	//borderRadius : 5
});
background32.addEventListener('click', function() {
	backgroundfun('color25');
	backgroundset(background32);
});
background_view3.add(background32);

var background33 = Ti.UI.createView({
	backgroundImage : '/images/tbg27.png',
	height : '50%',
	width : '50%',
	top : '50%',
	left : '0%',
	borderColor : 'black',
	//borderRadius : 5
});
background33.addEventListener('click', function() {
	backgroundfun('color27');
	backgroundset(background33);
});
background_view3.add(background33);

var background34 = Ti.UI.createView({
	backgroundImage : '/images/tbg33.png',
	height : '50%',
	width : '50%',
	top : '50%',
	left : '50%',
	borderColor : 'black',
	//borderRadius : 5
});
background34.addEventListener('click', function() {
	backgroundfun('color33');
	backgroundset(background34);
});
background_view3.add(background34);

//**************************4444444444444444444444444444444*******************************

var background_view4 = Ti.UI.createView({
	backgroundImage : '/images/topbar_dark.png',
	height : '100%',
	width : '100%',
	borderColor : 'black',
	borderRadius : 5
});

var background41 = Ti.UI.createView({
	backgroundImage : '/images/tbg36.png',
	height : '50%',
	width : '50%',
	top : '0%',
	left : '0%',
	borderColor : 'black',
	//borderRadius : 5
});
background41.addEventListener('click', function() {
	backgroundfun('color36');
	backgroundset(background41);
});
background_view4.add(background41);

var background42 = Ti.UI.createView({
	backgroundImage : '/images/tbg45.png',
	height : '50%',
	width : '50%',
	top : '0%',
	left : '50%',
	borderColor : 'black',
	//borderRadius : 5
});
background42.addEventListener('click', function() {
	backgroundfun('color45');
	backgroundset(background42);
});
background_view4.add(background42);

var background43 = Ti.UI.createView({
	backgroundImage : '/images/tbg48.png',
	height : '50%',
	width : '50%',
	top : '50%',
	left : '0%',
	borderColor : 'black',
	//borderRadius : 5
});
background43.addEventListener('click', function() {
	backgroundfun('color48');
	backgroundset(background43);
});
background_view4.add(background43);

var background44 = Ti.UI.createView({
	backgroundImage : '/images/tbg9.png',
	height : '50%',
	width : '50%',
	top : '50%',
	left : '50%',
	borderColor : 'black',
	//borderRadius : 5
});
background44.addEventListener('click', function() {
	backgroundfun('color9');
	backgroundset(background44);
});
background_view4.add(background44);

var CARDs = Ti.UI.createScrollableView({
	views : [background_view, background_view2, background_view3, background_view4],
	showPagingControl : true
});
background_sub_main.add(CARDs);

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
});
font_view.add(font_top_view);

var font_bottom_main_view = Ti.UI.createView({
	backgroundColor : 'white',
	height : '40%',
	width : '90%',
	borderColor : 'black',
	borderRadius : 5,
	bottom : '2%',
	borderWidth : 2
});
font_view.add(font_bottom_main_view);

var font_bottom_view = Ti.UI.createScrollView({
	backgroundColor : 'white',
	height : '85%',
	top : '10%',
	width : '90%',
	layout : 'vertical'
});
font_bottom_main_view.add(font_bottom_view);

var fontView1 = Ti.UI.createView({
	backgroundImage : '/images/topbar.png',
	width : '95%',
	height : hgt * 0.1,
	borderColor : 'black',
	borderRadius : 5,
	borderWidth : 2
});

var ImageView1 = Ti.UI.createImageView({
	image : '/images/tick.png',
	width : '10%',
	height : '50%',
	right : '5%'
});

fontView1.addEventListener('click', function() {
	indicator();

	subself.remove(font_view);
	fontView1.add(ImageView1);
	myDatabase.execute('UPDATE Fonts SET selected=?', '0');
	myDatabase.execute('UPDATE Fonts SET selected=? WHERE name=?', '1', 'Chantelli_Antiqua');
	var Settings = Titanium.UI.createWindow({
		backgroundColor : 'white',
		url : 'Setting.js',
		navBarHidden : true,
		fullscreen : true,
		exitOnClose : true
	});
	Settings.open();

});

var font1 = Ti.UI.createLabel({
	text : 'Chantelli Antiqua',
	color : 'black',
	font : {
		fontSize : tmp,
		fontFamily : 'Chantelli_Antiqua'
	},
	left : '5%'
});

fontView1.add(font1);

font_bottom_view.add(fontView1);
var fontView2 = Ti.UI.createView({
	backgroundImage : '/images/topbar.png',
	width : '95%',
	height : hgt * 0.1,
	borderColor : 'black',
	borderRadius : 5,
	borderWidth : 2
});

var ImageView2 = Ti.UI.createImageView({
	image : '/images/tick.png',
	width : '10%',
	height : '50%',
	right : '5%'
});

fontView2.addEventListener('click', function() {

	indicator();

	subself.remove(font_view);
	fontView2.add(ImageView2);

	myDatabase.execute('UPDATE Fonts SET selected=?', '0');
	myDatabase.execute('UPDATE Fonts SET selected=? WHERE name=?', '1', 'Aaargh');
	var Settings = Titanium.UI.createWindow({
		backgroundColor : 'white',
		url : 'Setting.js',
		navBarHidden : true,
		fullscreen : true,
		exitOnClose : true
	});
	Settings.open();

});

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
font_bottom_view.add(fontView2);

var fontView3 = Ti.UI.createView({
	backgroundImage : '/images/topbar.png',
	width : '95%',
	height : hgt * 0.1,
	borderColor : 'black',
	borderRadius : 5,
	borderWidth : 2
});

var ImageView3 = Ti.UI.createImageView({
	image : '/images/tick.png',
	width : '10%',
	height : '50%',
	right : '5%'
});

fontView3.addEventListener('click', function() {

	indicator();
	subself.remove(font_view);
	fontView3.add(ImageView3);

	myDatabase.execute('UPDATE Fonts SET selected=?', '0');
	myDatabase.execute('UPDATE Fonts SET selected=? WHERE name=?', '1', 'georgia');
	var Settings = Titanium.UI.createWindow({
		backgroundColor : 'white',
		url : 'Setting.js',
		navBarHidden : true,
		fullscreen : true,
		exitOnClose : true
	});
	Settings.open();

});

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
font_bottom_view.add(fontView3);

var fontView4 = Ti.UI.createView({
	backgroundImage : '/images/topbar.png',
	width : '95%',
	height : hgt * 0.1,
	borderColor : 'black',
	borderRadius : 5,
	borderWidth : 2
});

var ImageView4 = Ti.UI.createImageView({
	image : '/images/tick.png',
	width : '10%',
	height : '50%',
	right : '5%'
});

fontView4.addEventListener('click', function() {

	indicator();

	subself.remove(font_view);
	fontView4.add(ImageView4);

	myDatabase.execute('UPDATE Fonts SET selected=?', '0');
	myDatabase.execute('UPDATE Fonts SET selected=? WHERE name=?', '1', 'Vollkorn-Regular');
	var Settings = Titanium.UI.createWindow({
		backgroundColor : 'white',
		url : 'Setting.js',
		navBarHidden : true,
		fullscreen : true,
		exitOnClose : true
	});
	Settings.open();

});

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
font_bottom_view.add(fontView4);

var fontView5 = Ti.UI.createView({
	backgroundImage : '/images/topbar.png',
	width : '95%',
	height : hgt * 0.1,
	borderColor : 'black',
	borderRadius : 5,
	borderWidth : 2
});

var ImageView5 = Ti.UI.createImageView({
	image : '/images/tick.png',
	width : '10%',
	height : '50%',
	right : '5%'
});

fontView5.addEventListener('click', function() {

	indicator();

	subself.remove(font_view);
	fontView5.add(ImageView5);

	myDatabase.execute('UPDATE Fonts SET selected=?', '0');
	myDatabase.execute('UPDATE Fonts SET selected=? WHERE name=?', '1', 'Kameron-Regular');
	var Settings = Titanium.UI.createWindow({
		backgroundColor : 'white',
		url : 'Setting.js',
		navBarHidden : true,
		fullscreen : true,
		exitOnClose : true
	});
	Settings.open();

});

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
font_bottom_view.add(fontView5);

var fontView6 = Ti.UI.createView({
	width : '95%',
	height : hgt * 0.1,
	borderColor : 'black',
	borderRadius : 5,
	borderWidth : 2
});

var ImageView6 = Ti.UI.createImageView({
	image : '/images/tick.png',
	width : '10%',
	height : '50%',
	right : '5%'
});

fontView6.addEventListener('click', function() {

	indicator();

	subself.remove(font_view);
	fontView6.add(ImageView6);

	myDatabase.execute('UPDATE Fonts SET selected=?', '0');
	myDatabase.execute('UPDATE Fonts SET selected=? WHERE name=?', '1', 'Alike-Regular');
	var Settings = Titanium.UI.createWindow({
		backgroundColor : 'white',
		url : 'Setting.js',
		navBarHidden : true,
		fullscreen : true,
		borderWidth : 2
	});
	Settings.open();

});

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
font_bottom_view.add(fontView6);

var fontView7 = Ti.UI.createView({
	width : '95%',
	height : hgt * 0.1,
	borderColor : 'black',
	borderRadius : 5,
	borderWidth : 2
});

var ImageView7 = Ti.UI.createImageView({
	image : '/images/tick.png',
	width : '10%',
	height : '50%',
	right : '5%'
});

fontView7.addEventListener('click', function() {

	indicator();

	subself.remove(font_view);
	fontView7.add(ImageView7);
	myDatabase.execute('UPDATE Fonts SET selected=?', '0');
	myDatabase.execute('UPDATE Fonts SET selected=? WHERE name=?', '1', 'SF Arch Rival');
	var Settings = Titanium.UI.createWindow({
		backgroundColor : 'white',
		url : 'Setting.js',
		navBarHidden : true,
		fullscreen : true,
		exitOnClose : true
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

font_bottom_view.add(fontView7);

var fontView8 = Ti.UI.createView({
	width : '95%',
	height : hgt * 0.1,
	borderColor : 'black',
	borderRadius : 5,
	borderWidth : 2
});
font_bottom_view.add(fontView8);

var ImageView8 = Ti.UI.createImageView({
	image : '/images/tick.png',
	width : '10%',
	height : '50%',
	right : '5%'
});

fontView8.addEventListener('click', function() {

	indicator();
	subself.remove(font_view);
	fontView8.add(ImageView8);
	myDatabase.execute('UPDATE Fonts SET selected=?', '0');
	myDatabase.execute('UPDATE Fonts SET selected=? WHERE name=?', '1', 'PRINC___');
	var Settings = Titanium.UI.createWindow({
		backgroundColor : 'white',
		url : 'Setting.js',
		navBarHidden : true,
		fullscreen : true,
		exitOnClose : true
	});
	Settings.open();

});

var font8 = Ti.UI.createLabel({
	text : 'Print Clearly',
	color : 'black',
	font : {
		fontSize : tmp,
		fontFamily : 'PRINC___'
	},
	left : '5%',
});

fontView8.add(font8);

var fontView9 = Ti.UI.createView({
	width : '95%',
	height : hgt * 0.1,
	borderColor : 'black',
	borderRadius : 5,
	borderWidth : 2
});
font_bottom_view.add(fontView9);

var ImageView9 = Ti.UI.createImageView({
	image : '/images/tick.png',
	width : '10%',
	height : '50%',
	right : '5%'
});

fontView9.addEventListener('click', function() {
	indicator();
	subself.remove(font_view);
	fontView9.add(ImageView9);
	myDatabase.execute('UPDATE Fonts SET selected=?', '0');
	myDatabase.execute('UPDATE Fonts SET selected=? WHERE name=?', '1', 'ASENINE_');
	var Settings = Titanium.UI.createWindow({
		backgroundColor : 'white',
		url : 'Setting.js',
		navBarHidden : true,
		fullscreen : true,
		exitOnClose : true
	});
	Settings.open();
});

var font9 = Ti.UI.createLabel({
	text : 'Asesine',
	color : 'black',
	font : {
		fontSize : tmp,
		fontFamily : 'ASENINE_'
	},
	left : '5%',
});

fontView9.add(font9);

var fontView10 = Ti.UI.createView({
	width : '95%',
	height : hgt * 0.1,
	borderColor : 'black',
	borderRadius : 5,
	borderWidth : 2
});
font_bottom_view.add(fontView10);

var ImageView10 = Ti.UI.createImageView({
	image : '/images/tick.png',
	width : '10%',
	height : '50%',
	right : '5%'
});

fontView10.addEventListener('click', function() {

	indicator();

	fontView10.add(ImageView10);
	subself.remove(font_view);
	myDatabase.execute('UPDATE Fonts SET selected=?', '0');
	myDatabase.execute('UPDATE Fonts SET selected=? WHERE name=?', '1', 'DejaVuSerif');
	var Settings = Titanium.UI.createWindow({
		backgroundColor : 'white',
		url : 'Setting.js',
		navBarHidden : true,
		fullscreen : true,
		exitOnClose : true
	});
	Settings.open();

});

var font10 = Ti.UI.createLabel({
	text : 'Deja vu serif',
	color : 'black',
	font : {
		fontSize : tmp,
		fontFamily : 'DejaVuSerif'
	},
	left : '5%',
});

fontView10.add(font10);

var fontView11 = Ti.UI.createView({
	width : '95%',
	height : hgt * 0.1,
	borderColor : 'black',
	borderRadius : 5,
	borderWidth : 2
});
font_bottom_view.add(fontView11);

var ImageView11 = Ti.UI.createImageView({
	image : '/images/tick.png',
	width : '10%',
	height : '50%',
	right : '5%'
});

fontView11.addEventListener('click', function() {

	indicator();
	subself.remove(font_view);
	fontView11.add(ImageView11);
	myDatabase.execute('UPDATE Fonts SET selected=?', '0');
	myDatabase.execute('UPDATE Fonts SET selected=? WHERE name=?', '1', 'SplendidN');
	var Settings = Titanium.UI.createWindow({
		backgroundColor : 'white',
		url : 'Setting.js',
		navBarHidden : true,
		fullscreen : true,
		exitOnClose : true
	});
	Settings.open();

});

var font11 = Ti.UI.createLabel({
	text : 'Splendid 66',
	color : 'black',
	font : {
		fontSize : tmp,
		fontFamily : 'SplendidN'
	},
	left : '5%',
});

fontView11.add(font11);

var fontView12 = Ti.UI.createView({
	width : '95%',
	height : hgt * 0.1,
	borderColor : 'black',
	borderRadius : 5,
	borderWidth : 2
});
font_bottom_view.add(fontView12);

var ImageView12 = Ti.UI.createImageView({
	image : '/images/tick.png',
	width : '10%',
	height : '50%',
	right : '5%'
});

fontView12.addEventListener('click', function() {

	indicator();
	subself.remove(font_view);
	fontView12.add(ImageView12);
	myDatabase.execute('UPDATE Fonts SET selected=?', '0');
	myDatabase.execute('UPDATE Fonts SET selected=? WHERE name=?', '1', 'daniel');
	var Settings = Titanium.UI.createWindow({
		backgroundColor : 'white',
		url : 'Setting.js',
		navBarHidden : true,
		fullscreen : true,
		exitOnClose : true
	});
	Settings.open();

});

var font12 = Ti.UI.createLabel({
	text : 'Daniel',
	color : 'black',
	font : {
		fontSize : tmp,
		fontFamily : 'daniel'
	},
	left : '5%',
});

fontView12.add(font12);

function backgroundfun(set) {
	indicator();
	myDatabase.execute('UPDATE Background_images SET selected_view=?', '0');
	myDatabase.execute('UPDATE Background_images SET selected_view=? WHERE name=?', '1', set);
	var Settings = Titanium.UI.createWindow({
		backgroundColor : 'white',
		url : 'Setting.js',
		navBarHidden : true,
		fullscreen : true,
		exitOnClose : true
	});
	Settings.open();
	background_main.remove(CARDs);
}

function backgroundset(selected) {
	// Create an ImageView.
	var anImageView = Ti.UI.createImageView({
		image : '/images/tk.png',
		width : '20%',
		height : '15%',
		bottom : 5,
		right : 5
	});

	// Add to the parent view.
	selected.add(anImageView);

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