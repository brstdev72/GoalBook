var myDatabase = Ti.Database.install('/myDatabase.sqlite', 'myDatabase.sqlite');
var create_goalResultSet = myDatabase.execute('SELECT * FROM create_goal');
var this_title = [];
while (create_goalResultSet.isValidRow()) {
	this_title.push(create_goalResultSet.fieldByName('title'));
	create_goalResultSet.next();
}
var count = this_title.length;
create_goalResultSet.close();

var tmp1 = (Titanium.Platform.displayCaps.platformHeight * 3.8) / 100;

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

var tmp = (Titanium.Platform.displayCaps.platformHeight * 3.8) / 100;
var corner = Math.round(Ti.Platform.displayCaps.platformWidth * 0.025);
var width = Math.round(Ti.Platform.displayCaps.platformWidth * 0.005);

var instial = Ti.App.Properties.getInt('start', this_title.length);

if (instial > 0) {
	Ti.App.Properties.setBool('show', false);
	var app = Ti.UI.createWindow({
		backgroundColor : 'black',
		url : 'ui/common/showGoal.js',
		navBarHidden : true,
		fullscreen : true,
		exitOnClose : true
	});
	app.open();
	instial = 1;
} else {
	var app = Ti.UI.createWindow({
		backgroundColor : 'black',
		navBarHidden : true,
		fullscreen : true,
		exitOnClose : true
	});

	var AllView = Ti.UI.createView({
		backgroundColor:'white',
		backgroundImage : this_path,
		width : '96%',
		height : '96%'
	});

	app.add(AllView);

	// Create a Label.
	var aLabel = Ti.UI.createLabel({
		text : "Congratulations! You've taken the first step to achieving your dreams. Let's get started straight away - Click on the link below",
		color : 'black',
		font : {
			fontSize : tmp1,
			fontFamily : 'Aaargh'
		},
		top : '20%',
		left : '7%',
		right:'7%'
	});

	// Add to the parent view.
	AllView.add(aLabel);

	// Create a Button.
	var Ok = Ti.UI.createButton({
		backgroundImage : '/images/first.png',
		height : '20%',
		width : '85%',
		bottom :'20%'
	});

	// Listen for click events.
	Ok.addEventListener('click', function(e) {
		Ti.App.Properties.setBool('show', true);
		var Create_Goal = Titanium.UI.createWindow({
			backgroundColor : 'white',
			url : 'ui/common/Create_Goal.js',
			navBarHidden : true,
			fullscreen : true,
			exitOnClose : true
		});
		Create_Goal.open();
	});
	AllView.add(Ok);

	app.open();
}
