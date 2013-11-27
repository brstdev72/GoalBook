function pinterestShare(image,link,description) {

	var win = Ti.UI.createWindow({
	    barColor: '#000'
		});
		
			var activityIndicator = Ti.UI.createActivityIndicator({
			backgroundColor : 'black',
			color : 'white',
			style : Ti.UI.ActivityIndicatorStyle.DARK,
			font : {
				fontFamily : 'Helvetica Neue',
				fontSize : 26,
				fontWeight : 'bold'
			},
			indicatorDiameter : 60,
			message : 'Loading...',
			height : '20%',
			width : '60%'
		});
		win.add(activityIndicator);
		activityIndicator.show();
		
		setTimeout(function() {
			activityIndicator.hide();
		}, 2000);

	var textToShare = encodeURIComponent(description);
	
	var urlToShare = encodeURIComponent(link);
	
	var imgToShare = encodeURIComponent(image);

	var webView = Ti.UI.createWebView({
	    url: 'http://pinterest.com/pin/create/button/?url='+urlToShare+'&media='+imgToShare+"&description="+textToShare        
		});

	win.add(webView);
	
	var close = Ti.UI.createButton({
	    title: 'Close'
		});

	close.addEventListener('click', function () {
	    win.close();
		});

	win.open({modal: true});

	// following evalJS changes pinterest website to make it readable on mobile screen
	// note that this will only work when user is already logged to pinterest (not on first run)
				 
	webView.addEventListener('load', function (e) {
   		var content = webView.evalJS("document.head.innerHTML = document.head.innerHTML.replace('{width: 550px; margin: 40px auto;}','{width: 320px; margin: 40px auto;} .PinForm {padding-left:10px;margin-top:20px;width:300px;margin-left: 0px;float: left;} ImagePicker .Images {width:280px} .BoardList {width:300px}');"); 
        // win.showNavBar();
        // win.setLeftNavButton(close);				   
		});
		
	webView.addEventListener('error', function (e) {
	    win.close();
		});
	
}

module.exports = pinterestShare;
