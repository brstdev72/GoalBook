var Storekit = require('ti.storekit');

Storekit.receiptVerificationSandbox = (Ti.App.deployType !== 'production');

var verifyingReceipts = false;

var Buy = Ti.UI.currentWindow;

var connecting = Ti.UI.createLabel({
	text : 'Connecting App Store...',
	font : {
		fontSize : 24,
		fontFamily : 'Aaargh'
	},
	color : 'black'
});
Buy.add(connecting);
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

Buy.add(loading);

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

function requestProduct(identifier, success) {
	showLoading();
	Storekit.requestProducts([identifier], function(evt) {
		hideLoading();
		if (!evt.success) {
			alert('ERROR: We failed to talk to Apple!');
			Buy.close();
		} else if (evt.invalid) {
			alert('ERROR: We requested an invalid product!');
			Buy.close();
		} else {
			success(evt.products[0]);
		}
	});
}

/**
 * Purchases a product.
 * @param product A Ti.Storekit.Product (hint: use Storekit.requestProducts to get one of these!).
 */
Storekit.addEventListener('transactionState', function(evt) {
	hideLoading();
	switch (evt.state) {
		case Storekit.FAILED:
			if (evt.cancelled) {
				alert('Purchase cancelled');
			} else {
				alert('ERROR: Buying failed! ' + evt.message);
				Buy.close();
			}
			break;
		case Storekit.PURCHASED:
				Ti.App.Properties.setBool('buy', true);
				markProductAsPurchased(evt.productIdentifier);
				alert('Thanks for Purchase');
				Buy.close();	
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

function purchaseProduct(product) {
	showLoading();
	Storekit.purchase(product);
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
	requestProduct('DigitalSodaPop', function(product) {
		purchaseProduct(product);
	});
}
