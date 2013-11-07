function Goalcomplete() {
var Goalcomplete = Ti.UI.createWindow({
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

Goalcomplete.orientationModes = [Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT, Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT];

var module = require('de.marcelpociot.social');

var temp = '';

var myDatabase = Ti.Database.install('/myDatabase.sqlite', 'myDatabase.sqlite');

var settingResultSet = myDatabase.execute('SELECT * FROM Background_images WHERE selected_view=?', '1');
var this_path = '';
var this_color = '';
var this_selected_view = '';

while (settingResultSet.isValidRow()) {
	this_path = settingResultSet.fieldByName('path');
	this_color = settingResultSet.fieldByName('color_view');
	//   Ti.API.info(this_username + ' ' + this_user_name + ' ' + this_user_email  + ' ' + this_user_password);
	settingResultSet.next();
}
settingResultSet.close();

var create_goalResultSet = myDatabase.execute('SELECT * FROM complete_goal');
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

	//   Ti.API.info(this_username + ' ' + this_user_name + ' ' + this_user_email  + ' ' + this_user_password);
	create_goalResultSet.next();
	// alert(this_account_no+'      '+this_bank_name);
}
var count = this_title.length;
create_goalResultSet.close();

//***************************************************************Social Media******************************************
var socialResultSet = myDatabase.execute('SELECT * FROM Social_media WHERE rowid=?', '1');
var this_Social = '';

while (socialResultSet.isValidRow()) {
	this_Social = socialResultSet.fieldByName('social');

	socialResultSet.next();
}
socialResultSet.close();

//***************************************************************Fonts******************************************

var fontsResultSet = myDatabase.execute('SELECT * FROM fonts WHERE selected=?', '1');
var this_font = '';
while (fontsResultSet.isValidRow()) {
	this_font = fontsResultSet.fieldByName('name');
	//   Ti.API.info(this_username + ' ' + this_user_name + ' ' + this_user_email  + ' ' + this_user_password);
	fontsResultSet.next();
}
fontsResultSet.close();

var buy = Ti.App.Properties.getBool('buy', false);

var tmp = 18;
var tmp2 = 12;
var corner = Math.round(Ti.Platform.displayCaps.platformWidth * 0.01);
var corner1 = Math.round(Ti.Platform.displayCaps.platformWidth * 0.02);
var width = Math.round(Ti.Platform.displayCaps.platformWidth * 0.003);
//create object instance, a parasitic subclass of Observable
var second = Titanium.UI.createView({
	backgroundColor : 'black',
	width : '100%',
	height : '100%',
});
Goalcomplete.add(second);

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
	//backgroundImage : '/images/MyGoalBook.png',
	height : '100%',
	width : '20%',
	borderRadius : corner,
});

// Listen for click events.
secondmyGoalBook.addEventListener('click', function() {

	var newWindowClass = require('/ui/common/showGoal');
					var newWindow = new newWindowClass();
			
                 var currentWin=Goalcomplete;
					newWindow.containingTab = currentWin.containingTab;
					
					currentWin.containingTab.open(newWindow, {
						animated : false
					});
					//currentWin.close();
/*	indicator();

	var showGoal = Ti.UI.createWindow({
		backgroundColor : 'white',
		url : 'showGoal.js',
		navBarHidden : true,
		fullscreen : true
	});
	showGoal.open();
	secondsubself.remove(adView);*/
});

// Add to the parent view.
secondsubselfBottom.add(secondmyGoalBook);

var secondmyGoalBookicon = Ti.UI.createView({
	backgroundImage : '/images/MyGoalBook.png',
	height : 35,
	width : 30
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
	var newWindowClass = require('/ui/common/Create_Goal');
					var newWindow = new newWindowClass();
			
                 var currentWin=Goalcomplete;
					newWindow.containingTab = currentWin.containingTab;
					
					currentWin.containingTab.open(newWindow, {
						animated : false
					});
});
// Add to the parent view.
secondsubselfBottom.add(secondCreate_goal);

var secondCreate_goalicon = Ti.UI.createView({
	backgroundImage : '/images/createGoal.png',
	height : 35,
	width : 30,

});
secondCreate_goal.add(secondCreate_goalicon);

var secondcompleteGoal = Ti.UI.createView({
	backgroundColor : this_color,
	height : '96%',
	width : '20%',
	borderRadius : corner,
});

// Listen for click events.
secondcompleteGoal.addEventListener('click', function() {
});

// Add to the parent view.
secondsubselfBottom.add(secondcompleteGoal);

var secondcompleteGoalicon = Ti.UI.createView({
	backgroundImage : '/images/Goal_complete1.png',
	height : 35,
	width : 30
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
	var newWindowClass = require('/ui/common/Setting');
					var newWindow = new newWindowClass();
			
                 var currentWin=Goalcomplete;
					newWindow.containingTab = currentWin.containingTab;
					
					currentWin.containingTab.open(newWindow, {
						animated : false
					});
});

// Add to the parent view.
secondsubselfBottom.add(secondsetting);

var secondsettingicon = Ti.UI.createView({
	backgroundImage : '/images/settings.png',
	height : 35,
	width : 30
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
		var newWindowClass = require('/ui/common/first_text_view');
					var newWindow = new newWindowClass();
			
                 var currentWin=Goalcomplete;
					newWindow.containingTab = currentWin.containingTab;
					
					currentWin.containingTab.open(newWindow, {
						animated : false
					});
});

// Add to the parent view.
secondsubselfBottom.add(secondhome);

var secondhomeicon = Ti.UI.createView({
	backgroundImage : '/images/home.png',
	height : 35,
	width : 30

});
secondhome.add(secondhomeicon);

Titanium.Gesture.addEventListener('orientationchange', function(e) {
	switch(e.orientation) {
		case Ti.UI.PORTRAIT:
		case Ti.UI.UPSIDE_PORTRAIT:
		secondsubselfBottom.height = '11%';
			secondsubself.remove(secondsubselfcenterLandscape);
			secondsubself.add(secondsubselfcenter);
			CARD.setCurrentPage(CARDs.getCurrentPage());
			break;
		case Ti.UI.LANDSCAPE_LEFT:
		case Ti.UI.LANDSCAPE_RIGHT:
		secondsubselfBottom.height = '13%';
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
	height : '87%',
	top : '2%'

});

var tftModule = require('com.tapfortap.ti');
Ti.API.info("module is => " + tftModule);

var tft = tftModule.createTapForTap();
tft.initializeWithApiKey("9b510387a2449fa08cc3be137c35b760");

var interstitial = tftModule.createInterstitial();
interstitial.addEventListener("receive", function(d) {
	Ti.API.info("Interstitial received");
});

interstitial.addEventListener("show", function(d) {
	Ti.API.info("Interstitial shown");
});

interstitial.addEventListener("dismiss", function(d) {
	Ti.API.info("Interstitial dismissed");
});

interstitial.addEventListener("fail", function(d) {
	Ti.API.info("Interstitial dismissed failed because: ", JSON.stringify(d, null, 2));
});
var adView = tftModule.createAdView({
	width : '100%',
	height : '12%',
	top : 0,
	left : 0
});

Ti.API.info("adView is => " + adView);

adView.addEventListener("tap", function(d) {
	Ti.API.info("Banner was tapped");
});

adView.addEventListener("receive", function(d) {
	Ti.API.info("Banner was received");
});

adView.addEventListener("error", function(d) {
	Ti.API.info("Failed to receive banner because ", JSON.stringify(d, null, 2));
});

var view = [];
for (var i = 0; i < count; i++) {

	view[i] = Ti.UI.createView({
		height : '100%',
		id : i,
		width : '100%'
	});
	view[i].addEventListener('click', function(e) {
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

	var Getting_Started = Ti.UI.createLabel({
		text : this_title[i],
		color : 'black',
		font : {
			fontSize : tmp,
			fontFamily : this_font
		},
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
		// borderColor : 'black',
	});
	GoalImage.addEventListener('click', function(e) {
	});
	view[i].add(GoalImage);

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
	});

	// Add to the parent view.
	view[i].add(Description);

	// Add to the parent view.
	detailView = Ti.UI.createScrollView({
		bottom : '0%',
		//backgroundColor : 'white',
		height : '40%',
		width : '43%',
		left : '5%',
		id : i,
		scrollType : 'vertical',
		// borderRadius : corner1,
		// borderWidth : width,
		// borderColor : 'black',
		layout : 'vertical'
	});
	detailView.addEventListener('click', function(e) {
		//temp = e.source.id;
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
		//temp = e.source.id;
	});

	// Add to the parent view.
	detailView.add(Goal_Description);

	var AffirmationTitle = Ti.UI.createLabel({
		text : 'Congratulations:',
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
	});

	// Add to the parent view.
	view[i].add(AffirmationTitle);

	affirmationView = Ti.UI.createScrollView({
		top : '60%',
		//backgroundColor : 'white',
		height : '19%',
		width : '44%',
		right : '5%',
		id : i,
		scrollType : 'vertical',
		// borderRadius : corner1,
		// borderWidth : width,
		// borderColor : 'black',
		layout : 'vertical'
	});
	affirmationView.addEventListener('click', function(e) {
		//temp = e.source.id;
	});
	view[i].add(affirmationView);

	var Affirmation = Ti.UI.createLabel({
		text : "Well done you, you rock!  You've achieved your goal!  Give yourself a slap on the back!  Share you success with your friends.",
		color : 'black',
		font : {
			fontSize : tmp2,
			fontFamily : this_font
		},
		left : 0,
		id : i
	});
	Affirmation.addEventListener('click', function(e) {
		//temp = e.source.id;
	});

	// Add to the parent view.
	affirmationView.add(Affirmation);

	dateView = Ti.UI.createView({
		top : '80%',
		height : '23%',
		width : '44%',
		right : '5%',
		id : i,
		layout : 'vertical'
	});
	dateView.addEventListener('click', function(e) {
		//temp = e.source.id;
	});
	view[i].add(dateView);

	var DateCompletion = Ti.UI.createLabel({
		text : 'Goal Achieved:',
		color : 'black',

		font : {
			fontSize : tmp2,
			fontFamily : this_font
		},
		left : '0%',
		id : i
	});
	DateCompletion.addEventListener('click', function(e) {
		//temp = e.source.id;
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
		left : '0%',
		id : i
	});
	Date.addEventListener('click', function(e) {
		//temp = e.source.id;
	});

	// Add to the parent view.
	dateView.add(Date);

	SocialView = Ti.UI.createView({
		height : '50%',
		width : '100%',
	});
	SocialView.addEventListener('click', function(e) {
		temp = e.source.id;
	});
	dateView.add(SocialView);

	// Create a Button.
	var facebook = Ti.UI.createButton({
		backgroundImage : '/images/icon_facebook.png',
		height : 40,
		width : 40,
		left : '3%',
		id : i
	});

	// Listen for click events.
	facebook.addEventListener('click', function(e) {
		temp = e.source.id;
		module.showSheet({
			service : 'facebook',
			message : "Hey, I've just completed another Goal! \n\nGoal Description:\n" + this_description[temp] + "\n\nNext Step: \n" + this_affirmation[temp] + "\n\n'I've been using MyGoalBook to help me achieve my Goals\n",
			urls : ['http://www.facebook.com/mygoalbook'],
			images : [this_image[temp]],
			success : function() {
				alert("Successfully Shared");
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
		backgroundImage : '/images/icon_twitter.png',
		height : 40,
		width : 40,
		right : '35.3%',
		id : i
	});

	// Listen for click events.
	twitter.addEventListener('click', function(e) {
		temp = e.source.id;
		module.showSheet({
			service : 'twitter',
			message : "Hey, I've just completed another Goal! \n\nGoal Title:\n" + this_title[temp],
			urls : ['http://www.twitter.com/mygoalbook'],
			images : [this_image[temp]],
			success : function() {
				alert("Successfully Tweeted");
			},
			cancel : function() {
				alert("tweet canceled");
			},
			error : function() {
				alert("Unable to send tweet");
			}
		});
	});

	var pinterest = Ti.UI.createButton({
		backgroundImage : '/images/Pinterest.png',
		height : 40,
		width : 40,
		right : '3%',
		id : i
	});
	pinterest.addEventListener('click', function(e) {
		temp = e.source.id;
		var des = "Hey, I've just completed another Goal! Goal Description: " + this_description[temp] + "Next Step: " + this_affirmation[temp];
		var pinterestShare = require('pinterestShare');
		pinterestShare( image = "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c14.14.173.173/s160x160/1045123_492486897501157_501197205_n.jpg", link = "http://www.azac.pl", description = des);

	});

	if (this_Social == 'yes') {
		SocialView.add(facebook);
		SocialView.add(twitter);
		SocialView.add(pinterest);
	}

	// // Create an ImageView.
	// var completeImage = Ti.UI.createImageView({
	// image : '/images/mark_sign2.png',
	// width : '70%',
	// height : '60%'
	// });
	// view[i].add(completeImage);

}

var CARD = Ti.UI.createScrollableView({
	views : view,
	//showPagingControl : true
});
if (buy) {

} else {
	viewNumber = 0;
	var swipecount = 0;
	CARD.addEventListener('scroll', function(e) {
		if (viewNumber != e.currentPage) {
			viewNumber = e.currentPage;
			swipecount++;
			// And saving for next time change notification
			if (swipecount > 4) {
				swipecount = 0;
				CARD.fireEvent('pageChanged', e);
			}
			// And I am fire my pageChanged event on scroller
		}
		//Do something here
	});

	CARD.addEventListener('pageChanged', function(e) {
		interstitial.show();
		//Do something here
	});
}
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
	secondsubselfBottom.height = '13%';
	secondsubself.add(secondsubselfcenterLandscape);
} else {
	var oriCurrent = 'portrait';
	secondsubselfBottom.height = '11%';
	secondsubself.add(secondsubselfcenter);
	if (buy) {

	} else {
		secondsubself.add(adView);
		setTimeout(function() {
			secondsubself.remove(adView);
		}, 15000);
	}
}

var viewer = [];
for (var r = 0; r < count; r++) {

	viewer[r] = Ti.UI.createView({
		height : '100%',
		id : r,
		width : '100%',
	});
	viewer[r].addEventListener('click', function(e) {
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
		id : i,
		height : '88%',
		top : '12%',
		left : '3%',
		// borderWidth : width,
		// borderColor : 'black',
	});
	GoalImage.addEventListener('click', function(e) {
		//temp = e.source.id;
	});
	viewer[r].add(GoalImage);
	// Add to the parent view.

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
	// Add to the parent view.
	viewer[r].add(Description);

	detailView = Ti.UI.createScrollView({
		top : '12%',
		//backgroundColor : 'white',
		height : '36%',
		width : '45%',
		right : '3%',
		id : r,
		scrollType : 'vertical',
		// borderWidth : width,
		// borderColor : 'black',
		layout : 'vertical'
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

	// Add to the parent view.
	detailView.add(Goal_Description);

	var AffirmationTitle = Ti.UI.createLabel({
		text : 'Congratulations:',
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
	});

	// Add to the parent view.
	viewer[r].add(AffirmationTitle);

	affirmationView = Ti.UI.createScrollView({
		top : '55%',
		//backgroundColor : 'white',
		height : '22%',
		width : '45%',
		right : '3%',
		id : r,
		scrollType : 'vertical',
		// borderWidth : width,
		// borderColor : 'black',
		layout : 'vertical'
	});
	affirmationView.addEventListener('click', function(e) {
		//temp = e.source.id;
	});
	viewer[r].add(affirmationView);

	var Affirmation = Ti.UI.createLabel({
		text : "Well done you, you rock!  You've achieved your goal!  Give yourself a slap on the back!  Share you success with your friends.",
		color : 'black',
		font : {
			fontSize : tmp2,
			fontFamily : this_font
		},
		left : 0,
		id : r
	});
	// Add to the parent view.
	affirmationView.add(Affirmation);

	dateView = Ti.UI.createView({
		top : '77%',
		height : '23%',
		width : '45%',
		right : '3%',
		id : r,
	});
	dateView.addEventListener('click', function(e) {
		//temp = e.source.id;
	});
	viewer[r].add(dateView);

	var DateCompletion = Ti.UI.createLabel({
		text : 'Goal Achieved:',
		color : 'black',
		font : {
			fontSize : tmp2,
			fontFamily : this_font
		},
		left : '0%',
		bottom : '60%',
		id : r
	});
	DateCompletion.addEventListener('click', function(e) {
		//temp = e.source.id;
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
		bottom : '30%',
		id : r
	});
	Date.addEventListener('click', function(e) {
		//temp = e.source.id;
	});
	// Add to the parent view.
	dateView.add(Date);

	// Create a Button.
	var facebook = Ti.UI.createButton({
		backgroundImage : '/images/icon_facebook.png',
		height : 35,
		width : 35,
		right : '45%',
		bottom : '0%',
		id : r
	});

	// Listen for click events.
	facebook.addEventListener('click', function(e) {
		temp = e.source.id;
		module.showSheet({
			service : 'facebook',
			message : "Hey, I've just completed another Goal! \n\nGoal Description:\n" + this_description[temp] + "\n\nNext Step: \n" + this_affirmation[temp] + "\n\n'I've been using MyGoalBook to help me achieve my Goals\n",
			urls : ['http://www.facebook.com/mygoalbook'],
			images : [this_image[temp]],
			success : function() {
				alert("Successfully Shared");
			},
			cancel : function() {
				alert("Share cancelled");
			},
			error : function() {
				alert("Unable to Share");
			}
		});
	});

	// Create a Button.
	var twitter = Ti.UI.createButton({
		backgroundImage : '/images/icon_twitter.png',
		height : 35,
		width : 35,
		right : '23.5%',
		bottom : '0%',
		id : r
	});

	// Listen for click events.
	twitter.addEventListener('click', function(e) {
		temp = e.source.id;
		module.showSheet({
			service : 'twitter',
			message : "Hey, I've just completed another Goal! \n\nGoal Title:\n" + this_title[temp],
			urls : ['http://www.twitter.com/mygoalbook'],
			images : [this_image[temp]],
			success : function() {
				alert("Successfully Tweeted");
			},
			cancel : function() {
				alert("User canceled tweet");
			},
			error : function() {
				alert("Unable to send tweet");
			}
		});
	});

	var pinterest = Ti.UI.createButton({
		backgroundImage : '/images/Pinterest.png',
		height : 35,
		width : 35,
		right : '3%',
		bottom : '0%',
		id : r
	});
	pinterest.addEventListener('click', function(e) {
		temp = e.source.id;
		var des = "Hey, I've just completed another Goal! Goal Description: " + this_description[temp] + "Next Step: " + this_affirmation[temp];
		var pinterestShare = require('pinterestShare');
		pinterestShare( image = "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c14.14.173.173/s160x160/1045123_492486897501157_501197205_n.jpg", link = "http://www.azac.pl", description = des);

	});

	if (this_Social == 'yes') {
		dateView.add(pinterest);
		dateView.add(facebook);
		dateView.add(twitter);
	}

	// var completeImage = Ti.UI.createImageView({
	// image : '/images/mark_sign2.png',
	// width : '60%',
	// id : i,
	// height : '70%',
	// });
	// viewer[r].add(completeImage);

}

var CARDs = Ti.UI.createScrollableView({
	views : viewer,
	//showPagingControl : true
});
if (buy) {

} else {
	var swipecounts = 0;
	CARD.addEventListener('scroll', function(e) {
		if (viewNumber != e.currentPage) {
			viewNumber = e.currentPage;
			swipecount++;
			// And saving for next time change notification
			if (swipecounts > 4) {
				swipecounts = 0;
				CARDs.fireEvent('pageChanged', e);
			}
			// And I am fire my pageChanged event on scroller
		}
		//Do something here
	});

	CARDs.addEventListener('pageChanged', function(e) {
		interstitial.show();
		//Do something here
	});
}

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
		borderRadius : 10
	});
	secondsubself.add(indicatorView);
	var activityIndicator = Ti.UI.createActivityIndicator({
		style : Ti.UI.iPhone.ActivityIndicatorStyle.BIG,

	});
	indicatorView.add(activityIndicator);
	activityIndicator.show();
}

	return Goalcomplete;
};

module.exports = Goalcomplete;