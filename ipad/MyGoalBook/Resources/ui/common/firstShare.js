function firstShare() {
	var firstShare = Ti.UI.createWindow({
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
	
	var show = Ti.App.Properties.getBool('show');

	var module = require('de.marcelpociot.social');

	var myDatabase = Ti.Database.install('/myDatabase.sqlite', 'myDatabase.sqlite');

	var firstShareResultSet = myDatabase.execute('SELECT * FROM TempImage');
	var imagepath = '';
	while (firstShareResultSet.isValidRow()) {
		imagepath = firstShareResultSet.fieldByName('imagepath');
		firstShareResultSet.next();
	}
	firstShareResultSet.close();

	var title = Ti.App.Properties.getString('titl');
	var description = Ti.App.Properties.getString('descriptio');
	var affirmation = Ti.App.Properties.getString('affirmatio');
	var date = Ti.App.Properties.getString('dat');

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

	var tmp = (Titanium.Platform.displayCaps.platformHeight * 3.8) / 100;
	var corner = Math.round(Ti.Platform.displayCaps.platformWidth * 0.025);
	var width = Math.round(Ti.Platform.displayCaps.platformWidth * 0.005);

	var AllView = Ti.UI.createView({
		backgroundImage : this_path,
		backgroundColor : 'white',
		width : '96%',
		height : '96%'
	});

	firstShare.add(AllView);

	var share = Ti.UI.createView({
		backgroundColor : 'black',
		opacity : 0.7,
		height : '55%',
		width : '85%',
		borderColor : '#000',
		borderWidth : width,
		borderRadius : corner,
	});

	// Create a Label.
	var sharelabel = Ti.UI.createLabel({
		text : 'Commit to this goal by sharing it with others',
		color : 'white',
		font : {
			fontSize : tmp,
			fontFamily : this_font
		},
		top : '7%',
		textAlign : 'center'
	});

	// Add to the parent view.
	share.add(sharelabel);

	// Create a Button.
	var facebook = Ti.UI.createButton({
		backgroundImage : '/images/icon_facebook-white.png',
		height : '35%',
		width : '35%',
		left : '10%',
		bottom : '22%'
	});
	share.add(facebook);

	// Listen for click events.
	facebook.addEventListener('click', function(e) {
		module.showSheet({
			service : 'facebook',
			message : "I've just started using #MyGoalBook, Aristotle would use it too: \n\nGoal Description:\n" + description + "\n\nNext Step: \n" + affirmation + "\n\n'I've been using MyGoalBook to help me achieve my Goals\n",
			urls : ['http://www.facebook.com/mygoalbook'],
			images : [imagepath],
			success : function() {
				var myDatabase = Ti.Database.install('/myDatabase.sqlite', 'myDatabase.sqlite');
				myDatabase.execute('INSERT INTO create_goal (title,description,affirmation,image,date) VALUES(?,?,?,?,?)', title, description, affirmation, imagepath, date);
				myDatabase.close();
				var show = Ti.App.Properties.getBool('show');
				if (show) {
					showAlert();
				} else {
					Ti.API.error('else' + show);
					Ti.App.Properties.setInt('start', 1);
					var show = Ti.App.Properties.setBool('show', false);
					Ti.App.properties.setBool('close', false);
					var Show_Goal = require('ui/common/Goal_Tab');
					new Show_Goal('showGoal').open();
				}
			},
			cancel : function() {
				alert("Share cancelled");
			},
			error : function() {
				alert("Unable to Share");
			}
		});
	});
	// Add to the parent view.

	// Create a Button.
	var twitter = Ti.UI.createButton({
		backgroundImage : '/images/icon_twitter-white.png',
		height : '35%',
		width : '35%',
		bottom : '22%',
		right : '10%'

	});

	// Listen for click events.
	twitter.addEventListener('click', function(e) {
		module.showSheet({
			service : 'twitter',
			message : "I've just started using #MyGoalBook, Aristotle would use it too: \n\nGoal Title:\n" + title,
			urls : ['http://www.twitter.com/mygoalbook'],
			images : [imagepath],
			success : function() {
				var myDatabase = Ti.Database.install('/myDatabase.sqlite', 'myDatabase.sqlite');
				myDatabase.execute('INSERT INTO create_goal (title,description,affirmation,image,date) VALUES(?,?,?,?,?)', title, description, affirmation, imagepath, date);
				myDatabase.close();
				var show = Ti.App.Properties.getBool('show');
				if (show) {
					showAlert();
				} else {
					Ti.App.Properties.setInt('start', 1);
					var show = Ti.App.Properties.setBool('show', false);
					Ti.App.properties.setBool('close', false);
					var Show_Goal = require('ui/common/Goal_Tab');
					new Show_Goal('showGoal').open();
				}
			},
			cancel : function() {
				alert("User canceled tweet");
			},
			error : function() {
				alert("Unable to send tweet");
			}
		});

	});
	share.add(twitter);

	// Create a Label.
	var uploadlater = Ti.UI.createLabel({
		text : "I'll upload later",
		color : 'white',
		font : {
			fontSize : tmp,
			fontFamily : this_font
		},
		bottom : '7%',
		textAlign : 'center',
		height : 'auto',
		width : 'auto'
	});
	uploadlater.addEventListener('click', function() {
		indicator();
		var myDatabase = Ti.Database.install('/myDatabase.sqlite', 'myDatabase.sqlite');
		myDatabase.execute('INSERT INTO create_goal (title,description,affirmation,image,date) VALUES(?,?,?,?,?)', title, description, affirmation, imagepath, date);
		myDatabase.close();
		Ti.App.Properties.setBool('show', false);
		Ti.App.Properties.setInt('start', 1);
		var Show_Goal = require('ui/common/Goal_Tab');
		new Show_Goal('showGoal').open();
	});

	// Add to the parent view.
	share.add(uploadlater);

	var bottom_line = Ti.UI.createView({
		backgroundColor : 'white',
		height : 1,
		width : 'auto',
		left : '20%',
		right : '20%',
		bottom : '6%'
	});
	share.add(bottom_line);

	AllView.add(share);

	function showAlert() {

		var alertDialog = Titanium.UI.createAlertDialog({
			title : 'Create Goal',
			message : 'Do you want to add another goal?',
			buttonNames : ['yes', 'No'],
			cancel : 1
		});

		alertDialog.addEventListener('click', function(theEvent) {
			switch (theEvent.index) {
				case 0:
					Ti.App.Properties.setInt('start', 0);
					Ti.App.Properties.setBool('show', true);
					Ti.App.properties.setBool('close', true);
					if (!show) {
						var newWindowClass = require('ui/common/Create_Goal');
						var newWindow = new newWindowClass();

						var currentWin = firstShare;
						newWindow.containingTab = currentWin.containingTab;
						//currentWin.close();
						currentWin.containingTab.open(newWindow, {
							animated : false
						});
					} else {		
						var newWindowClass = require('ui/common/Create_Goal');
						var newWindow = new newWindowClass();
						newWindow.open();
					}

					break;
				//This will never be reached, if you specified cancel for index 1
				case 1:
					Ti.App.Properties.setInt('start', 1);
					Ti.App.Properties.setBool('show', false);
					Ti.App.properties.setBool('close', false);
					var Show_Goal = require('ui/common/Goal_Tab');
					new Show_Goal('showGoal').open();
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
		AllView.add(indicatorView);
		var activityIndicator = Ti.UI.createActivityIndicator({
			style : Ti.UI.iPhone.ActivityIndicatorStyle.BIG,

		});
		indicatorView.add(activityIndicator);
		activityIndicator.show();
	}

	return firstShare;
};
module.exports = firstShare;
