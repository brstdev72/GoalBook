var myDatabase = Ti.Database.install('/myDatabase.sqlite', 'myDatabase.sqlite');
var create_goalResultSet = myDatabase.execute('SELECT * FROM create_goal');
var this_title = [];
var Storekit = require('ti.storekit');

Storekit.receiptVerificationSandbox = (Ti.App.deployType !== 'production');

/**
 * Purchases a product.
 * @param product A Ti.Storekit.Product (hint: use Storekit.requestProducts to get one of these!).
 */
Storekit.addEventListener('transactionState', function(evt) {
	//hideLoading();
	switch (evt.state) {
		case Storekit.FAILED:
			if (evt.cancelled) {
				alert('Purchase cancelled');
				Ti.App.fireEvent('window_close');

			} else {
				alert('ERROR: Buying failed! ' + evt.message);
				Ti.App.fireEvent('window_close');

			}
			break;
		case Storekit.PURCHASED:

			alert('Thanks For Purchasing!');
			markProductAsPurchased(evt.productIdentifier);
			Ti.App.Properties.setBool('buy', true);
			Ti.App.fireEvent('window_close');

			break;
		case Storekit.PURCHASING:
			Ti.API.info("Purchasing " + evt.productIdentifier);
			break;
		case Storekit.RESTORED:
			// The complete list of restored products is sent with the `restoredCompletedTransactions` event
			Ti.API.info("Restored " + evt.productIdentifier);
			break;
	}
});

Storekit.addEventListener('restoredCompletedTransactions', function(evt) {
	//hideLoading();
	if (evt.error) {
		alert(evt.error);
		Ti.App.fireEvent('window_close');

	} else if (evt.transactions == null || evt.transactions.length == 0) {
		alert('There were no purchases to restore!');
		Ti.App.fireEvent('window_close');

	} else {
		for (var i = 0; i < evt.transactions.length; i++) {

			markProductAsPurchased(evt.transactions[i].productIdentifier);

		}
		alert('Restored ' + evt.transactions.length + ' purchases!');
		Ti.App.Properties.setBool('buy', true);
		Ti.App.fireEvent('window_close');

	}

});
var tempPurchasedStore = {};

function checkIfProductPurchased(identifier) {
	Ti.API.info('Checking if purchased: ' + identifier);
	if (tempPurchasedStore[identifier] === undefined)
		tempPurchasedStore[identifier] = Ti.App.Properties.getBool('Purchased-' + identifier, false);
	return tempPurchasedStore[identifier];
}

function markProductAsPurchased(identifier) {
	Ti.API.info('Marking as purchased: ' + identifier);
	// Store it in an object for immediate retrieval.
	tempPurchasedStore[identifier] = true;
	// And in to Ti.App.Properties for persistent storage.
	Ti.App.Properties.setBool('Purchased-' + identifier, true);
}

while (create_goalResultSet.isValidRow()) {
	this_title.push(create_goalResultSet.fieldByName('title'));
	create_goalResultSet.next();
}
create_goalResultSet.close();

var settingResultSet = myDatabase.execute('SELECT * FROM Background_images WHERE selected_view=?', '1');
var this_path = '';
var this_color = '';

while (settingResultSet.isValidRow()) {
	this_path = settingResultSet.fieldByName('path');
	this_color = settingResultSet.fieldByName('color_view');
	//   Ti.API.info(this_username + ' ' + this_user_name + ' ' + this_user_email  + ' ' + this_user_password);
	settingResultSet.next();
}

/*
 If you decide to perform receipt verification then you need to indicate if the receipts should be verified
 against the "Sandbox" or "Live" server. If you are verifying auto-renewable subscriptions then you need
 to set the shared secret for the application from your iTunes Connect account.
 */

settingResultSet.close();

var tmp1 = 16;
var tmp = (Titanium.Platform.displayCaps.platformHeight * 3.8) / 100;
var corner = Math.round(Ti.Platform.displayCaps.platformWidth * 0.025);
var width = Math.round(Ti.Platform.displayCaps.platformWidth * 0.005);

var instial = Ti.App.Properties.getInt('start', this_title.length);

if (instial > 0) {
	Ti.App.Properties.setBool('show', false);
	var Show_Goal = require('ui/common/Goal_Tab');
	new Show_Goal('showGoal').open();
	instial = 1;
} else {
	var app = Ti.UI.createWindow({
		backgroundColor : 'black',
		navBarHidden : true,
		exitOnClose : true
	});

	var AllView = Ti.UI.createView({
		backgroundColor : 'white',
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
		right : '7%'
	});

	// Add to the parent view.
	AllView.add(aLabel);

	// Create a Button.
	var Ok = Ti.UI.createImageView({
		image : '/images/first.png',
		height : '20%',
		width : '85%',
		bottom : '20%'
	});

	// Listen for click events.
	Ok.addEventListener('click', function(e) {
		Ti.App.Properties.setBool('show', true);
		var newWindowClass = require('ui/common/Create_Goal');
		var newWindow = new newWindowClass();
		newWindow.open();
	});
	AllView.add(Ok);
	setTimeout(function() {
		app.open();
	}, 1000);
}

