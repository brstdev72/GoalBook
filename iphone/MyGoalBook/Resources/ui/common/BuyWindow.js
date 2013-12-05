function BuyWindow()
{

var Buy = Ti.UI.createWindow({
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


function requestProduct(identifier, success) {
	//showLoading();
	Storekit.requestProducts([identifier], function(evt) {
		hideLoading();
		if (!evt.success) {
			alert('ERROR: We failed to talk to Apple!');
			Buy.close({animated:false});
			
		} else if (evt.invalid) {
			alert('ERROR: We requested an invalid product!');
			Buy.close({animated:false});
			
		} else {
			success(evt.products[0]);
		}
	});
}


function purchaseProduct(product) {
	//showLoading();

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
	if (!restore) {
		requestProduct('DigitalSodaPop', function(product) {
			purchaseProduct(product);
		});
	} else {
		restorePurchases();
	}

}

function restorePurchases() {

	//showLoading();
	Storekit.restoreCompletedTransactions();
}

Ti.App.addEventListener('window_close',function(e)
{
	Buy.close({animated:false});

});

return Buy;
};
module.exports=BuyWindow;
