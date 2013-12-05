function Restore() {
	var Restore = Ti.UI.createWindow({
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

	var Storekit = require('ti.storekit');

	Storekit.receiptVerificationSandbox = (Ti.App.deployType !== 'production');

	var verifyingReceipts = false;

	//var Buy = Ti.UI.currentWindow;

	var restore = Ti.App.properties.getBool('restore');

	var connecting = Ti.UI.createLabel({
		text : 'Connecting App Store...',
		font : {
			fontSize : 24,
			fontFamily : 'Aaargh'
		},
		color : 'black'
	});
	Restore.add(connecting);
	/*
	 We want to show the user when we're communicating with the server, so let's define two simple
	 functions that interact with an activity indicator.
	 */
	var loading = Ti.UI.createActivityIndicator({
		bottom : 10,
		height : 50,
		width : 50,
		backgroundColor : 'black',
		borderRadius : 10,
		style : Ti.UI.iPhone.ActivityIndicatorStyle.BIG
	});
	var loadingCount = 0;
	function showLoading() {
		loadingCount += 1;
		if (loadingCount == 1) {
			loading.show();
		}
	}

	function hideLoading() {
		if (loadingCount > 0) {
			loadingCount -= 1;
			if (loadingCount == 0) {
				loading.hide();
			}
		}
	}


	Restore.add(loading);

	/*
	 Now let's define a couple utility functions. We'll use these throughout the app.
	 */
	var tempPurchasedStore = {};

	function markProductAsPurchased(identifier) {
		Ti.API.info('Marking as purchased: ' + identifier);
		// Store it in an object for immediate retrieval.
		tempPurchasedStore[identifier] = true;
		// And in to Ti.App.Properties for persistent storage.
		Ti.App.Properties.setBool('Purchased-' + identifier, true);
	}

	function checkIfProductPurchased(identifier) {
		Ti.API.info('Checking if purchased: ' + identifier);
		if (tempPurchasedStore[identifier] === undefined)
			tempPurchasedStore[identifier] = Ti.App.Properties.getBool('Purchased-' + identifier, false);
		return tempPurchasedStore[identifier];
	}

	/*
	 1) Can the user make payments? Their device may be locked down, or this may be a simulator.
	 */
	if (!Storekit.canMakePayments)
		alert('This device cannot make purchases!');
	else {
		/*
		 3) Buying a single item.
		 */
		restorePurchases();

	}

	function restorePurchases() {
		showLoading();
		Storekit.restoreCompletedTransactions();
	}


	Storekit.addEventListener('restoredCompletedTransactions', function(evt) {
		hideLoading();
		if (evt.error) {
			alert(evt.error);
			var newWindowClass = require('/ui/common/showGoal');
			var newWindow = new newWindowClass();
			var currentWin = Restore;
			newWindow.containingTab = currentWin.containingTab;
			//currentWin.close();
			currentWin.containingTab.open(newWindow, {
				animated : false
			});
		} else if (evt.transactions == null || evt.transactions.length == 0) {
			alert('There were no purchases to restore!');
			var newWindowClass = require('/ui/common/showGoal');
			var newWindow = new newWindowClass();
			var currentWin = Restore;
			newWindow.containingTab = currentWin.containingTab;
			//currentWin.close();
			currentWin.containingTab.open(newWindow, {
				animated : false
			});
		} else {
			for (var i = 0; i < evt.transactions.length; i++) {
				markProductAsPurchased(evt.transactions[i].productIdentifier);
			}
			alert('Restored ' + evt.transactions.length + ' purchases!');
			Restore.close();
		}
	});

	return Restore;
};
module.exports = Restore;
