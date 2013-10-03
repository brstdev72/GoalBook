var showGoal = Ti.UI.currentWindow;

showGoal.orientationModes = [Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT, Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT];

var temp = '';
var myDatabase = Ti.Database.install('/myDatabase.sqlite', 'myDatabase.sqlite');
var settingResultSet = myDatabase.execute('SELECT * FROM Background_images WHERE selected_view=?', '1');
var this_path = '';
var this_color = '';
while (settingResultSet.isValidRow()) {
	this_path = settingResultSet.fieldByName('path');
	this_color = settingResultSet.fieldByName('color_view');
	settingResultSet.next();
}
settingResultSet.close();

var create_goalResultSet = myDatabase.execute('SELECT * FROM create_goal');
var this_title = [];
var this_description = [];
var this_affirmation = [];
var this_image = [];
var this_date = [];
var this_achieved = [];
while (create_goalResultSet.isValidRow()) {
	this_title.push(create_goalResultSet.fieldByName('title'));
	this_description.push(create_goalResultSet.fieldByName('description'));
	this_affirmation.push(create_goalResultSet.fieldByName('affirmation'));
	this_image.push(create_goalResultSet.fieldByName('image'));
	this_date.push(create_goalResultSet.fieldByName('date'));
	this_achieved.push(create_goalResultSet.fieldByName('achieved'));
	create_goalResultSet.next();
}
var count = this_title.length;
create_goalResultSet.close();

//****************************************************************************Fonts***************************************************

var fontsResultSet = myDatabase.execute('SELECT * FROM fonts WHERE selected=?', '1');
var this_font = '';
while (fontsResultSet.isValidRow()) {
	this_font = fontsResultSet.fieldByName('name');
	fontsResultSet.next();
}
fontsResultSet.close();

var tmp = (Titanium.Platform.displayCaps.platformHeight * 2.8) / 100;
var tmp2 =  (Titanium.Platform.displayCaps.platformHeight * 2) / 100;
var corner = Math.round(Ti.Platform.displayCaps.platformWidth * 0.01);
var corner1 = Math.round(Ti.Platform.displayCaps.platformWidth * 0.02);
var width = Math.round(Ti.Platform.displayCaps.platformWidth * 0.003);

var second = Titanium.UI.createView({
	backgroundColor : 'black',
	width : '100%',
	height : '100%'
});
showGoal.add(second);

var secondsubself = Titanium.UI.createView({
	backgroundColor : 'white',
	width : '96%',
	height : '96%',
	backgroundImage : this_path
});
second.add(secondsubself);

var secondsubselfBottom = Titanium.UI.createView({
	width : '100%',
	height : '11%',
	bottom : '0%',
	backgroundImage : '/images/topbar.png',
	layout : 'horizontal'
});
secondsubself.add(secondsubselfBottom);

var secondmyGoalBook = Ti.UI.createView({
	backgroundColor : this_color,
	height : '96%',
	width : '20%',
	borderRadius : corner,
});

// Listen for click events.
secondmyGoalBook.addEventListener('click', function() {
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
	width : 80
});
secondCreate_goal.add(secondCreate_goalicon);

var secondcompleteGoal = Ti.UI.createView({
	height : '100%',
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
	width : 80
});
secondcompleteGoal.add(secondcompleteGoalicon);

// Create a Button.
var secondsetting = Ti.UI.createView({
	height : '100%',
	width : '20%',
	borderRadius : corner,
});

// Listen for click events.
secondsetting.addEventListener('click', function() {
	var Settings = Titanium.UI.createWindow({
		backgroundColor : 'white',
		url : 'Setting.js',
		orientationModes : 'PORTRAIT',
		navBarHidden : true,
		fullscreen : true
	});
	Settings.open();
});

// Add to the parent view.
secondsubselfBottom.add(secondsetting);

var secondsettingicon = Ti.UI.createView({
	backgroundImage : '/images/settings.png',
	height : 80,
	width : 80
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
	width : 80
});
secondhome.add(secondhomeicon);

Titanium.Gesture.addEventListener('orientationchange', function(e) {
	switch(e.orientation) {
		case Ti.UI.PORTRAIT:
		case Ti.UI.UPSIDE_PORTRAIT:
			secondsubself.remove(secondsubselfcenterLandscape);
			secondsubself.add(secondsubselfcenter);
			CARD.setCurrentPage(CARDs.getCurrentPage());

			break;
		case Ti.UI.LANDSCAPE_LEFT:
		case Ti.UI.LANDSCAPE_RIGHT:
			secondsubself.remove(secondsubselfcenter);
			secondsubself.add(secondsubselfcenterLandscape);
			CARDs.setCurrentPage(CARD.getCurrentPage());
			break;
		case Ti.UI.UNKNOWN:
		default:
			break;
	}
});

//*******************************************************POTRAIT MODE****************************************************
var secondsubselfcenter = Titanium.UI.createView({
	width : '100%',
	height : '85%',
	top : '2%'
});

var view = [];
for (var i = 0; i < count; i++) {

	view[i] = Ti.UI.createView({
		height : '100%',
		id : i,
		width : '100%'
	});

	var Tittle_view = Ti.UI.createScrollView({
		scrollType : 'horizontal',
		width : '80%',
		id : i,
		height : '6.7%',
		left : '5%',
		top : '0%',
	});
	view[i].add(Tittle_view);
	var name = this_title[i].replace(" ", "\u00A0");

	var Getting_Started = Ti.UI.createLabel({
		text : name,
		color : 'black',
		font : {
			fontSize : tmp,
			fontFamily : this_font
		},
		height : '100%',
		left : '0%',
		top : '0%'
	});
	Tittle_view.add(Getting_Started);

	var baseImage = Titanium.UI.createImageView({
		image : this_image[i],
		width : 1024,
		height : 1024,
	});

	// Here's the view we'll use to do the cropping.
	// It's never displayed either.
	var cropView = Titanium.UI.createView({
		width : 824,
		height : 612
	});

	// Add the image to the crop-view.
	// Position it left and above origin.
	cropView.add(baseImage);
	baseImage.top = -200;
	baseImage.left = -100;

	// now convert the crop-view to an image Blob
	var croppedImage = cropView.toImage();
	// Create an ImageView.
	var GoalImage = Ti.UI.createImageView({
		backgroundImage : '/images/noImage.png',
		image : croppedImage,
		width : '90%',
		id : i,
		height : '46%',
		left : '5%',
		top : '8%',
		borderRadius : corner1,
		// borderWidth : width,
		// borderColor : 'black'
	});
	GoalImage.addEventListener('click', function(e) {
		temp = e.source.id;
		var check = Ti.App.Properties.setBool('check', true);
		var viewdata = Ti.App.Properties.setString('data', temp);
		var Create_Goal = Titanium.UI.createWindow({
			backgroundColor : 'white',
			url : 'Create_Goal.js',
			orientationModes : 'PORTRAIT',
			navBarHidden : true
		});
		Create_Goal.open();
	});
	view[i].add(GoalImage);

	var deleteImage = Ti.UI.createImageView({
		image : '/images/delete-icon.png',
		width : '10%',
		id : i,
		height : '8%',
		right : '1%',
		top : '4%',
	});
	view[i].add(deleteImage);

	deleteView = Ti.UI.createView({
		width : '12%',
		id : i,
		height : '10%',
		right : '0%',
		top : '2%',
	});
	deleteView.addEventListener('click', function(e) {
		comp = e.source.id;
		complt = comp + 1;

		var alertDialog = Titanium.UI.createAlertDialog({
			title : 'Delete Goal',
			message : 'Do you want to delete this Goal',
			buttonNames : ['Yes', 'No'],
			cancel : 1
		});

		alertDialog.addEventListener('click', function(theEvent) {
			switch (theEvent.index) {
				case 0:
					if (count > 1) {
						myDatabase.execute('DELETE FROM create_goal WHERE rowid=?', complt);
						var showGoal = Ti.UI.createWindow({
							backgroundColor : 'white',
							url : 'showGoal.js',
							navBarHidden : true,
							fullscreen : true
						});
						showGoal.open();
					} else {
						myDatabase.execute('DELETE FROM create_goal');
						var showGoal = Ti.UI.createWindow({
							backgroundColor : 'white',
							url : 'showGoal.js',
							navBarHidden : true,
							fullscreen : true
						});
						showGoal.open();
					}

					break;
				//This will never be reached, if you specified cancel for index 1
				case 1:

					break;
				default:
					break;
			}
		});
		alertDialog.show();

	});
	view[i].add(deleteView);

	// Create a Label.
	var Description = Ti.UI.createLabel({
		text : 'Goal Description:',
		color : 'black',
		font : {
			fontSize : tmp2,
			fontFamily : this_font
		},
		left : '5%',
		top : '55%',
		id : i
	});
	Description.addEventListener('click', function(e) {
		temp = e.source.id;
		var check = Ti.App.Properties.setBool('check', true);
		var viewdata = Ti.App.Properties.setString('data', temp);
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
	view[i].add(Description);
	// Add to the parent view.
	detailView = Ti.UI.createScrollView({
		bottom : '0%',
		backgroundColor : 'white',
		height : '40%',
		width : '43%',
		left : '5%',
		id : i,
		// borderRadius : corner1,
		// borderWidth : width,
		// borderColor : 'black',
		layout : 'vertical'
	});
	detailView.addEventListener('click', function(e) {
		temp = e.source.id;
		var check = Ti.App.Properties.setBool('check', true);
		var viewdata = Ti.App.Properties.setString('data', temp);
		var Create_Goal = Titanium.UI.createWindow({
			backgroundColor : 'white',
			url : 'Create_Goal.js',
			orientationModes : 'PORTRAIT',
			navBarHidden : true,
			fullscreen : true
		});
		Create_Goal.open();
	});
	view[i].add(detailView);

	// Create a Label.
	var Goal_Description = Ti.UI.createLabel({
		text : this_description[i],
		color : 'black',
		font : {
			fontSize : tmp2,
			fontFamily : this_font
		},
		left : 0,
		id : i
	});
	Goal_Description.addEventListener('click', function(e) {
	});

	// Add to the parent view.
	detailView.add(Goal_Description);

	var AffirmationTitle = Ti.UI.createLabel({
		text : 'Next Step:',
		color : 'black',
		font : {
			fontSize : tmp2,
			fontFamily : this_font
		},
		left : '51%',
		top : '55%',
		id : i
	});
	AffirmationTitle.addEventListener('click', function(e) {
		temp = e.source.id;
		var check = Ti.App.Properties.setBool('check', true);
		var viewdata = Ti.App.Properties.setString('data', temp);
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
	view[i].add(AffirmationTitle);

	affirmationView = Ti.UI.createScrollView({
		top : '60%',
		backgroundColor : 'white',
		height : '19%',
		width : '44%',
		right : '5%',
		id : i,
		// borderRadius : corner1,
		// borderWidth : width,
		// borderColor : 'black',
		layout : 'vertical'
	});
	affirmationView.addEventListener('click', function(e) {
		temp = e.source.id;
		var check = Ti.App.Properties.setBool('check', true);
		var viewdata = Ti.App.Properties.setString('data', temp);
		var Create_Goal = Titanium.UI.createWindow({
			backgroundColor : 'white',
			url : 'Create_Goal.js',
			orientationModes : 'PORTRAIT',
			navBarHidden : true,
			fullscreen : true
		});
		Create_Goal.open();
	});
	view[i].add(affirmationView);

	var Affirmation = Ti.UI.createLabel({
		text : this_affirmation[i],
		color : 'black',
		font : {
			fontSize : tmp2,
			fontFamily : this_font
		},
		left : 0,
		id : i
	});
	Affirmation.addEventListener('click', function(e) {
	});

	// Add to the parent view.
	affirmationView.add(Affirmation);

	dateView = Ti.UI.createView({
		top : '79%',
		height : '12%',
		width : '44%',
		right : '5%',
		layout : 'vertical'
	});
	view[i].add(dateView);

	var DateCompletion = Ti.UI.createLabel({
		text : 'Date for completion:',
		color : 'black',
		font : {
			fontSize : tmp2,
			fontFamily : this_font
		},
		left : '0%',
		top : '10%'
	});

	// Add to the parent view.
	dateView.add(DateCompletion);

	var Date = Ti.UI.createLabel({
		text : this_date[i],
		color : 'black',
		font : {
			fontSize : tmp2,
			fontFamily : this_font
		},
		left : '0%'
	});

	// Add to the parent view.
	dateView.add(Date);

	var checkImageView = Ti.UI.createView({
		top : '90%',
		height : '4%',
		width : '44%',
		right : '5%',
		id : i,
		layout : 'horizontal'
	});
	checkImageView.addEventListener('click', function(e) {
		var comp = e.source.id;

		var complt = parseInt(comp + 1);
		myDatabase.execute('INSERT INTO complete_goal (title,description,affirmation,image,date) VALUES(?,?,?,?,?)', this_title[comp], this_description[comp], this_affirmation[comp], this_image[comp], this_date[comp]);
		if (count > 1) {
			myDatabase.execute('DELETE FROM create_goal WHERE rowid=?', complt);
		} else {
			myDatabase.execute('DELETE FROM create_goal');
		}
		myDatabase.close();

		var Goalcomplete = Titanium.UI.createWindow({
			backgroundColor : 'white',
			url : 'Goalcomplete.js',
			navBarHidden : true,
			fullscreen : true
		});
		Goalcomplete.open();
	});
	view[i].add(checkImageView);

	var checkImage = Ti.UI.createImageView({
		image : '/images/checkboxs-1.png',
		width : '16%',
		id : i,
		height : '100%',
		top : '0%',
		left : '0%',
		borderColor:'black',
		borderWidth:1
	});
	checkImageView.add(checkImage);

	// Create a Label.
	var narrative = Ti.UI.createLabel({

		text : 'Check box when',
		color : 'black',
		font : {
			fontSize : tmp2,
			fontFamily : this_font
		},
		textAlign : 'center',
		left : '3%',
		id : i
	});

	// Add to the parent view.
	checkImageView.add(narrative);

	// Create a Label.
	var narrative2 = Ti.UI.createLabel({
		text : 'goal is completed',
		color : 'black',
		font : {
			fontSize : tmp2,
			fontFamily : this_font
		},
		textAlign : 'center',
		top : '95%',
		left : '51%',
		id : i
	});
	narrative2.addEventListener('click', function(e) {
		var comp = e.source.id;
		var complt = parseInt(comp + 1);

		indicator();

		myDatabase.execute('INSERT INTO complete_goal (title,description,affirmation,image,date) VALUES(?,?,?,?,?)', this_title[comp], this_description[comp], this_affirmation[comp], this_image[comp], this_date[comp]);
		if (count > 1) {
			myDatabase.execute('DELETE FROM create_goal WHERE rowid=?', complt);
		} else {
			myDatabase.execute('DELETE FROM create_goal');
		}
		myDatabase.close();

		var Goalcomplete = Titanium.UI.createWindow({
			backgroundColor : 'white',
			url : 'Goalcomplete.js',
			navBarHidden : true,
			fullscreen : true
		});
		Goalcomplete.open();
	});

	// Add to the parent view.
	view[i].add(narrative2);

}

var CARD = Ti.UI.createScrollableView({
	views : view,
	//showPagingControl : true
});
CARD.addEventListener('click', function(e) {
});
if (count == 0) {

	// Create a Label.
	var No_Goals = Ti.UI.createLabel({
		text : 'No Goals',
		color : 'black',
		font : {
			fontSize : tmp,
			fontFamily : this_font
		},
		textAlign : 'center'
	});

	// Add to the parent view.
	secondsubselfcenter.add(No_Goals);

} else {
	secondsubselfcenter.add(CARD);
}

//*************************************************LANDSCAPE MODE ******************************************************************

var secondsubselfcenterLandscape = Titanium.UI.createView({
	width : '100%',
	height : '85%',
	top : '1%',
	//backgroundImage : '/images/topbar.png'
});

var pWidth = Ti.Platform.displayCaps.platformWidth;
var pHeight = Ti.Platform.displayCaps.platformHeight;
if (pWidth > pHeight) {
	var oriCurrent = 'landscape';
	secondsubself.add(secondsubselfcenterLandscape);
} else {
	var oriCurrent = 'portrait';
	secondsubself.add(secondsubselfcenter);
}

var viewer = [];
for (var r = 0; r < count; r++) {

	viewer[r] = Ti.UI.createView({
		height : '100%',
		id : r,
		width : '100%',
	});
	viewer[r].addEventListener('click', function(e) {
		// temp = e.source.id;
		// var check = Ti.App.Properties.setBool('check', true);
		// var viewdata = Ti.App.Properties.setString('data', temp);
		// var Create_Goal = Titanium.UI.createWindow({
		// backgroundColor : 'white',
		// url : 'Create_Goal.js',
		// modal : true,
		// navBarHidden : true,
		// fullscreen : true
		//windowSoftInputMode : softInput
		// });
		// Create_Goal.open();
	});

	var Tittle_view_land = Ti.UI.createScrollView({
		scrollType : 'horizontal',
		width : '45%',
		id : i,
		height : '10%',
		left : '3%',
		top : '1%',
	});
	viewer[r].add(Tittle_view_land);

	var Getting_Started = Ti.UI.createLabel({
		text : this_title[r],
		color : 'black',
		height : '100%',
		font : {
			fontSize : tmp,
			fontFamily : this_font
		},
		left : '0%',
		top : '0%'
	});
	Tittle_view_land.add(Getting_Started);

	var baseImage = Titanium.UI.createImageView({
		image : this_image[r],
		width : 1024,
		height : 1024,
	});

	// Here's the view we'll use to do the cropping.
	// It's never displayed either.
	var cropView = Titanium.UI.createView({
		width : 824,
		height : 612
	});

	// Add the image to the crop-view.
	// Position it left and above origin.
	cropView.add(baseImage);
	baseImage.top = -200;
	baseImage.left = -100;
	var croppedImage = cropView.toImage();
	// Create an ImageView.
	var GoalImage = Ti.UI.createImageView({
		backgroundImage : '/images/noImage.png',
		image : croppedImage,
		width : '45%',
		id : r,
		height : '88%',
		top : '12%',
		left : '3%',
		// borderWidth : width,
		// borderColor : 'black',
	});
	GoalImage.addEventListener('click', function(e) {
		temp = e.source.id;
		var check = Ti.App.Properties.setBool('check', true);
		var viewdata = Ti.App.Properties.setString('data', temp);
		var Create_Goal = Titanium.UI.createWindow({
			backgroundColor : 'white',
			url : 'Create_Goal.js',
			orientationModes : 'PORTRAIT',
			navBarHidden : true,
			fullscreen : true
		});
		Create_Goal.open();
	});
	viewer[r].add(GoalImage);

	// Create a Label.
	var Description = Ti.UI.createLabel({
		text : 'Goal Description:',
		color : 'black',
		font : {
			fontSize : tmp2,
			fontFamily : this_font
		},
		left : '52%',
		top : '5%',
		id : r
	});
	Description.addEventListener('click', function(e) {
		temp = e.source.id;
		var check = Ti.App.Properties.setBool('check', true);
		var viewdata = Ti.App.Properties.setString('data', temp);
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
	viewer[r].add(Description);
	// Add to the parent view.
	detailView = Ti.UI.createScrollView({
		top : '12%',
		backgroundColor : 'white',
		height : '36%',
		width : '45%',
		right : '3%',
		id : r,
		//borderRadius : corner1,
		// borderWidth : width,
		// borderColor : 'black',
		layout : 'vertical'
	});
	detailView.addEventListener('click', function(e) {
		temp = e.source.id;
		var check = Ti.App.Properties.setBool('check', true);
		var viewdata = Ti.App.Properties.setString('data', temp);
		var Create_Goal = Titanium.UI.createWindow({
			backgroundColor : 'white',
			url : 'Create_Goal.js',
			orientationModes : 'PORTRAIT',
			navBarHidden : true,
			fullscreen : true
		});
		Create_Goal.open();
	});
	viewer[r].add(detailView);

	// Create a Label.
	var Goal_Description = Ti.UI.createLabel({
		text : this_description[r],
		color : 'black',
		font : {
			fontSize : tmp2,
			fontFamily : this_font
		},
		left : 0,
		id : r
	});
	Goal_Description.addEventListener('click', function(e) {
	});

	// Add to the parent view.
	detailView.add(Goal_Description);

	deleteView = Ti.UI.createView({
		width : '10%',
		id : i,
		height : '13%',
		right : '0%',
		top : '2%',
	});

	var deleteImage = Ti.UI.createImageView({
		image : '/images/delete-icon.png',
		width : '8%',
		id : r,
		height : '11%',
		right : '0.5%',
		top : '5%',
	});
	viewer[r].add(deleteImage);

	deleteView.addEventListener('click', function(e) {
		comp = e.source.id;
		complt = comp + 1;
		var alertDialog = Titanium.UI.createAlertDialog({
			title : 'Delete Goal',
			message : 'Do you want to delete this Goal',
			buttonNames : ['Yes', 'No'],
			cancel : 1
		});

		alertDialog.addEventListener('click', function(theEvent) {
			switch (theEvent.index) {
				case 0:
					if (count > 1) {
						myDatabase.execute('DELETE FROM create_goal WHERE rowid=?', complt);
						var showGoal = Ti.UI.createWindow({
							backgroundColor : 'white',
							url : 'showGoal.js',
							navBarHidden : true,
							fullscreen : true
						});
						showGoal.open();
					} else {
						myDatabase.execute('DELETE FROM create_goal');
						var showGoal = Ti.UI.createWindow({
							backgroundColor : 'white',
							url : 'showGoal.js',
							navBarHidden : true,
							fullscreen : true
						});
						showGoal.open();
					}

					break;
				//This will never be reached, if you specified cancel for index 1
				case 1:

					break;
				default:
					break;
			}
		});
		alertDialog.show();

	});
	viewer[r].add(deleteView);

	var AffirmationTitle = Ti.UI.createLabel({
		text : 'Next Step:',
		color : 'black',
		font : {
			fontSize : tmp2,
			fontFamily : this_font
		},
		left : '52%',
		top : '49%',
		id : r
	});
	AffirmationTitle.addEventListener('click', function(e) {
		temp = e.source.id;
		var check = Ti.App.Properties.setBool('check', true);
		var viewdata = Ti.App.Properties.setString('data', temp);
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
	viewer[r].add(AffirmationTitle);

	affirmationView = Ti.UI.createScrollView({
		top : '55%',
		backgroundColor : 'white',
		height : '22%',
		width : '45%',
		right : '3%',
		id : r,
		//borderRadius : corner1,
		// borderWidth : width,
		// borderColor : 'black',
		layout : 'vertical'
	});
	affirmationView.addEventListener('click', function(e) {
		temp = e.source.id;
		var check = Ti.App.Properties.setBool('check', true);
		var viewdata = Ti.App.Properties.setString('data', temp);
		var Create_Goal = Titanium.UI.createWindow({
			backgroundColor : 'white',
			url : 'Create_Goal.js',
			orientationModes : 'PORTRAIT',
			navBarHidden : true,
			fullscreen : true
		});
		Create_Goal.open();
	});
	viewer[r].add(affirmationView);

	var Affirmation = Ti.UI.createLabel({
		text : this_affirmation[r],
		color : 'black',
		font : {
			fontSize : tmp2,
			fontFamily : this_font
		},
		left : 0,
		id : r
	});
	Affirmation.addEventListener('click', function(e) {
	});
	// Add to the parent view.
	affirmationView.add(Affirmation);

	dateView = Ti.UI.createView({
		top : '77%',
		height : '13%',
		width : '30%',
		right : '18%',
		layout : 'vertical'
	});
	viewer[r].add(dateView);

	var DateCompletion = Ti.UI.createLabel({
		text : 'Date for completion:',
		color : 'black',
		font : {
			fontSize : tmp2,
			fontFamily : this_font
		},
		left : '0%',
		top : '3%',
		id : r
	});
	DateCompletion.addEventListener('click', function(e) {
	});
	// Add to the parent view.
	dateView.add(DateCompletion);

	var Date = Ti.UI.createLabel({
		text : this_date[r],
		color : 'black',
		font : {
			fontSize : tmp2,
			fontFamily : this_font
		},
		left : '0%',
		bottom : '1%',
	});
	// Add to the parent view.
	dateView.add(Date);

	checkImageView = Ti.UI.createView({
		top : '92%',
		height : '8%',
		width : '12%',
		left : '52%',
		id : r,
		
	});
	viewer[r].add(checkImageView);

	var checkImage = Ti.UI.createImageView({
		image : '/images/checkboxs-1.png',
		width : '50%',
		id : r,
		height : '100%',
		borderColor:'black',
		borderWidth:1
	});
	checkImage.addEventListener('click', function(e) {
	});
	checkImageView.add(checkImage);

	narrative_label = Ti.UI.createLabel({
		text : 'Check box when goal',
		color : 'black',
		font : {
			fontSize : tmp2,
			fontFamily : this_font
		},
		top : '89%',
		height : '6%',
		width : '40%',
		left : '65%',
		id : r,
	});
	viewer[r].add(narrative_label);
	narrative_label = Ti.UI.createLabel({
		text : 'is completed',
		color : 'black',
		font : {
			fontSize : tmp2,
			fontFamily : this_font
		},
		top : '95%',
		height : '5%',
		width : '40%',
		left : '65%',
		id : r,
	});
	viewer[r].add(narrative_label);

	checktickView = Ti.UI.createView({
		top : '90%',
		height : '10%',
		width : '44%',
		left : '52%',
		id : r,
	});
	checktickView.addEventListener('click', function(e) {

		var comp = e.source.id;
		var complt = parseInt(comp + 1);

		indicator();

		myDatabase.execute('INSERT INTO complete_goal (title,description,affirmation,image,date) VALUES(?,?,?,?,?)', this_title[comp], this_description[comp], this_affirmation[comp], this_image[comp], this_date[comp]);
		if (count > 1) {
			myDatabase.execute('DELETE FROM create_goal WHERE rowid=?', complt);
		} else {
			myDatabase.execute('DELETE FROM create_goal');
		}
		myDatabase.close();

		var Goalcomplete = Titanium.UI.createWindow({
			backgroundColor : 'white',
			url : 'Goalcomplete.js',
			navBarHidden : true,
			fullscreen : true
		});
		Goalcomplete.open();
	});
	viewer[r].add(checktickView);
}

var CARDs = Ti.UI.createScrollableView({
	views : viewer,
	//showPagingControl : true
});
CARDs.addEventListener('click', function(e) {
});

if (count == 0) {
	// Create a Label.
	var No_Goals = Ti.UI.createLabel({
		text : 'No Goals',
		color : 'black',
		font : {
			fontSize : tmp,
			fontFamily : this_font
		},
		textAlign : 'center'
	});

	// Add to the parent view.
	secondsubselfcenterLandscape.add(No_Goals);

} else {
	secondsubselfcenterLandscape.add(CARDs);
}

function indicator() {
 var indicatorView = Ti.UI.createView({
  backgroundColor : 'black',
  height : '25%',
  width : '40%',
  opacity : 0.7,
  borderRadius:10
 });
 secondsubself.add(indicatorView);
 var activityIndicator = Ti.UI.createActivityIndicator({
   style : Ti.UI.iPhone.ActivityIndicatorStyle.BIG,

 });
 indicatorView.add(activityIndicator);
 activityIndicator.show();
}
