function Create_Goal() {
	var Create_Goal = Ti.UI.createWindow({
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

	Create_Goal.addEventListener('focus', function() {
		var close = Ti.App.properties.getBool('close', false);
		buy = Ti.App.properties.getBool('buy', false);
		if (close) {
			//Create_Goal.close();
			Ti.App.properties.removeProperty('close');
		}
	});
	var show = Ti.App.Properties.getBool('show');

	Create_Goal.orientationModes = [Ti.UI.PORTRAIT];
	var tmp = (Titanium.Platform.displayCaps.platformHeight * 2.8) / 100;
	var tmp2 = (Titanium.Platform.displayCaps.platformHeight * 2) / 100;
	var tmp3 = (Titanium.Platform.displayCaps.platformHeight * 1) / 100;
	var corner = Math.round(Ti.Platform.displayCaps.platformWidth * 0.025);
	var width = Math.round(Ti.Platform.displayCaps.platformWidth * 0.005);
	var corner1 = Math.round(Ti.Platform.displayCaps.platformWidth * 0.01);
	var title = '';
	var description = '';
	var affirmation = '';
	var imagepath = '';
	var date = '';
	var achieved = '';
	var check = false;

	check = Ti.App.Properties.getBool('check');
	var viewdata = Ti.App.Properties.getString('data');

	var myDatabase = Ti.Database.install('/myDatabase.sqlite', 'myDatabase.sqlite');

	var settingResultSet = myDatabase.execute('SELECT * FROM Background_images WHERE selected_view=?', '1');
	var this_path = '';
	var this_name = '';
	var this_selected_view = '';

	while (settingResultSet.isValidRow()) {
		this_path = settingResultSet.fieldByName('path');
		this_name = settingResultSet.fieldByName('name');
		this_selected_view = settingResultSet.fieldByName('selected_view');
		//   Ti.API.info(this_username + ' ' + this_user_name + ' ' + this_user_email  + ' ' + this_user_password);
		settingResultSet.next();
	}
	settingResultSet.close();

	var create_goalResultSet = myDatabase.execute('SELECT * FROM create_goal where rowid=?', viewdata);
	var this_title = '';
	var this_description = '';
	var this_affirmation = '';
	var this_image = '';
	var this_date = '';
	var this_achieved = '';
	while (create_goalResultSet.isValidRow()) {
		this_title = create_goalResultSet.fieldByName('title');
		this_description = create_goalResultSet.fieldByName('description');
		this_affirmation = create_goalResultSet.fieldByName('affirmation');
		this_image = create_goalResultSet.fieldByName('image');
		this_date = create_goalResultSet.fieldByName('date');
		this_achieved = create_goalResultSet.fieldByName('achieved');

		//   Ti.API.info(this_username + ' ' + this_user_name + ' ' + this_user_email  + ' ' + this_user_password);
		create_goalResultSet.next();
	}
	create_goalResultSet.close();

	//*****************************************************Test version***************************************************

	var create_goalResultSet = myDatabase.execute('SELECT * FROM create_goal');
	var this_titles = [];
	while (create_goalResultSet.isValidRow()) {
		this_titles.push(create_goalResultSet.fieldByName('title'));
		//   Ti.API.info(this_username + ' ' + this_user_name + ' ' + this_user_email  + ' ' + this_user_password);
		create_goalResultSet.next();
	}
	create_goalResultSet.close();

	var creates_goalResultSet = myDatabase.execute('SELECT * FROM complete_goal');
	var thats_title = [];
	while (creates_goalResultSet.isValidRow()) {
		thats_title.push(creates_goalResultSet.fieldByName('title'));
		//   Ti.API.info(this_username + ' ' + this_user_name + ' ' + this_user_email  + ' ' + this_user_password);
		creates_goalResultSet.next();
		// alert(this_account_no+'      '+this_bank_name);
	}
	var count = this_titles.length + thats_title.length;
	creates_goalResultSet.close();

	//****************************************************************************Fonts***************************************************

	var fontsResultSet = myDatabase.execute('SELECT * FROM fonts WHERE selected=?', '1');
	var this_font = '';
	while (fontsResultSet.isValidRow()) {
		this_font = fontsResultSet.fieldByName('name');
		//   Ti.API.info(this_username + ' ' + this_user_name + ' ' + this_user_email  + ' ' + this_user_password);
		fontsResultSet.next();
	}
	fontsResultSet.close();

	var image;
	var filePath = '';
	var myDatabase;
	var scrollView = Titanium.UI.createView({
		backgroundColor : 'black',
		width : 'auto',
		height : 'auto',
	});

	var subself = Titanium.UI.createView({
		backgroundColor : 'white',
		width : '96%',
		height : '96%',
		backgroundImage : this_path,
	});
	scrollView.add(subself);

	var moveableview = Titanium.UI.createScrollView({
		width : '100%',
		height : '89%',
		Top : '2%',
		layout : 'vertical'
	});
	subself.add(moveableview);

	var new_goal = Ti.UI.createLabel({
		text : 'Set new Goal :',
		color : 'black',
		font : {
			fontSize : tmp,
			fontFamily : this_font
		},
		//top : '8%',
		left : '3%'
	});
	moveableview.add(new_goal);

	var aLabel_name = Ti.UI.createLabel({
		text : 'Goal Title :',
		color : 'black',
		font : {
			fontSize : tmp2,
			fontFamily : this_font
		},

		//top : '14%',
		left : '3%',
		top : '2%'
	});
	moveableview.add(aLabel_name);

	var edit_name = Titanium.UI.createTextField({
		backgroundColor : 'white',
		font : {
			fontSize : tmp2,
			fontFamily : this_font
		},
		width : '90%',
		height : '9%',
		borderColor : '#000',
		borderWidth : width,
		borderRadius : corner,
		keyboardType : Ti.UI.KEYBOARD_APPEARANCE_DEFAULT,
		returnKeyType : Ti.UI.RETURNKEY_DEFAULT,
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	moveableview.add(edit_name);

	var aLabel_description = Ti.UI.createLabel({
		text : 'Goal Description :',
		color : 'black',
		font : {
			fontSize : tmp2,
			fontFamily : this_font
		},
		//top : '24%',
		left : '3%',
		top : '2%'
	});
	moveableview.add(aLabel_description);

	var edit_description = Titanium.UI.createTextArea({
		backgroundcolor : 'white',
		//top : '28%',
		width : '90%',
		font : {
			fontSize : tmp2,
			fontFamily : this_font
		},
		borderColor : '#000',
		borderWidth : width,
		borderRadius : corner,
		height : '22%',
		//softKeyboardOnFocus : Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS, // Android only
		keyboardType : Ti.UI.KEYBOARD_APPEARANCE_DEFAULT,
		returnKeyType : Ti.UI.RETURNKEY_DEFAULT,
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	moveableview.add(edit_description);

	var aLabel_affirmation = Ti.UI.createLabel({
		text : 'Next Step :',
		color : 'black',
		font : {
			fontSize : tmp2,
			fontFamily : this_font
		},
		//top : '41%',
		left : '3%',
		top : '2%'
	});
	moveableview.add(aLabel_affirmation);

	var edit_affirmation = Titanium.UI.createTextArea({
		backgroundColor : 'white',
		width : '90%',
		font : {
			fontSize : tmp2,
			fontFamily : this_font
		},
		borderColor : '#000',
		borderWidth : width,
		borderRadius : corner,
		height : '16%',
		keyboardType : Ti.UI.KEYBOARD_APPEARANCE_DEFAULT,
		returnKeyType : Ti.UI.RETURNKEY_DEFAULT,
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	moveableview.add(edit_affirmation);

	var labelView = Ti.UI.createView({
		height : '6%',
		width : '100%',
		top : '2%'
	});
	moveableview.add(labelView);
	var aLabel_photograph = Ti.UI.createLabel({
		text : 'Upload Photo :',
		color : 'black',
		font : {
			fontSize : tmp2,
			fontFamily : this_font
		},
		height : 'auto',
		width : 'auto',
		//top : '75%',
		left : '3%',

	});
	labelView.add(aLabel_photograph);

	var aLabel_Date = Ti.UI.createLabel({
		text : 'Date to be achieved :',
		color : 'black',
		font : {
			fontSize : tmp2,
			fontFamily : this_font
		},
		height : 'auto',
		width : 'auto',
		//top : '75%',
		left : '50%'

	});
	labelView.add(aLabel_Date);

	var editView = Ti.UI.createView({
		height : '11%',
		width : '100%'
	});
	moveableview.add(editView);

	var edit_uploadImage = Titanium.UI.createButton({
		backgroundColor : 'white',
		width : '40%',
		font : {
			fontSize : tmp2,
			fontFamily : this_font
		},
		height : '100%',
		title : 'Choose Image',
		borderWidth : width,
		borderRadius : corner,
		borderColor : 'black',
		left : '5%'
	});
	edit_uploadImage.addEventListener('click', function() {
		var alertDialog = Titanium.UI.createAlertDialog({
			title : 'Upload Image',
			message : 'Choose Image From ?',
			buttonNames : ['Gallery', 'Camera', 'Cancel'],
			cancel : 1
		});

		alertDialog.addEventListener('click', function(theEvent) {
			if (theEvent.index !== theEvent.cancel) {
				//alert('hello');
			}
			switch (theEvent.index) {
				case 0:
					//obtain an image from the gallery
					Titanium.Media.openPhotoGallery({
						success : function(event) {
							image = event.media;
							filePath = image;
							edit_uploadImage.title = 'Image Selected';

						},
						cancel : function() {

						}
					});

					break;
				//This will never be reached, if you specified cancel for index 1
				case 1:
					Titanium.Media.showCamera({
						success : function(event) {
							image = event.media;
							filePath = image;
							edit_uploadImage.title = 'Image Selected';
						},
						cancel : function() {
							//getting image from camera was cancelled
						},
						error : function(error) {
							//create alert
							var a = Titanium.UI.createAlertDialog({
								title : 'Camera'
							});
							// set message
							if (error.code == Titanium.Media.NO_CAMERA) {
								a.setMessage('Device does not have image recording capabilities');
							} else {
								a.setMessage('Unexpected error: ' + error.code);
							}
							// show alert
							a.show();
						},
						allowImageEditing : true,
						saveToPhotoGallery : false
					});
					break;
				default:
					break;
			}
		});
		alertDialog.show();
	});

	editView.add(edit_uploadImage);

	var edit_date = Titanium.UI.createButton({
		backgroundColor : 'white',
		width : '40%',
		font : {
			fontSize : tmp2,
			fontFamily : this_font
		},
		height : '100%',
		title : 'Include Calender',
		borderWidth : width,
		borderRadius : corner,
		borderColor : 'black',
		left : '55%'
	});
	edit_date.addEventListener('click', function() {

		var alldateview = Ti.UI.createView({
			bottom : '0%',
			height : '52%',
			width : 'auto',
			layout : 'vertical'
		});
		Create_Goal.add(alldateview);

		var buttondateview = Ti.UI.createView({
			height : '20%',
			width : 'auto',
		});
		alldateview.add(buttondateview);

		// Create a Button.
		var set = Ti.UI.createButton({
			title : 'set',
			height : '80%',
			width : '20%',
			top : '10%',
			right : '5%',
			font : {
				fontSize : tmp2
			}
		});
		// Listen for click events.
		set.addEventListener('click', function() {
			var pickerdate = picker.value;
			var day = pickerdate.getDate();
			var months = pickerdate.getMonth();
			var month = months + parseInt('1');
			var year = pickerdate.getFullYear();
			newdate = day + "/" + month + "/" + year;
			date = newdate;
			edit_date.title = date;
			Create_Goal.remove(alldateview);
		});

		// Add to the parent view.
		buttondateview.add(set);

		var CancelPicker = Ti.UI.createButton({
			title : 'Cancel',
			height : '80%',
			width : '25%',
			font : {
				fontSize : tmp2
			},
			top : '10%',
			left : '5%'
		});
		// Listen for click events.
		CancelPicker.addEventListener('click', function() {
			Create_Goal.remove(alldateview);
		});

		// Add to the parent view.
		buttondateview.add(CancelPicker);

		var minDate = new Date();
		minDate.setFullYear(2000);
		minDate.setMonth(0);
		minDate.setDate(1);

		var maxDate = new Date();
		maxDate.setFullYear(2050);
		maxDate.setMonth(11);
		maxDate.setDate(31);

		var value = new Date();
		value.getFullYear();
		value.getMonth();
		value.getDay();

		var picker = Ti.UI.createPicker({
			//top:'43%',
			width : '100%',
			type : Ti.UI.PICKER_TYPE_DATE,
			minDate : minDate,
			maxDate : maxDate,
			value : value
		});
		var newdate = '';
		picker.addEventListener('change', function(e) {
			var pickerdate = e.value;
			var day = pickerdate.getDate();
			var months = pickerdate.getMonth();
			var month = months + parseInt('1');
			var year = pickerdate.getFullYear();
			newdate = day + "/" + month + "/" + year;
		});

		alldateview.add(picker);

	});

	editView.add(edit_date);

	var secondsubselfBottom = Titanium.UI.createView({
		width : '100%',
		height : '11%',
		bottom : '0%',
		backgroundImage : '/images/topbar.png'
	});
	subself.add(secondsubselfBottom);
	// Create a Button.
	var Cancel = Ti.UI.createView({
		height : '100%',
		width : 60,
		left : '2%',
	});

	// Listen for click events.
	Cancel.addEventListener('click', function() {
		Cancel_image.image = '/images/cancel1.png';

		Create_Goal.close({
			animated : false
		});
	});

	var Cancel_image = Ti.UI.createImageView({
		image : '/images/cancel.png',
		height : 75,
		width : 60,
	});
	Cancel.add(Cancel_image);

	// Add to the parent view.
	secondsubselfBottom.add(Cancel);

	if (check) {
		edit_name.value = this_title;
		edit_description.value = this_description;
		edit_affirmation.value = this_affirmation;
		filePath = this_image;
		date = this_date;
		if (this_image != '') {
			edit_uploadImage.title = 'Image Selected';
		}
		if (this_date != '') {
			edit_date.title = this_date;
		}

	} else {
		edit_name.setvalue = '';
		edit_description.setvalue = '';
		edit_affirmation.setvalue = '';
		imagepath = '';
		date = '';
	}

	// Create a Button.
	var Save = Ti.UI.createView({
		height : '100%',
		width : 60,
		right : '2%'
	});

	// Listen for click events.
	Save.addEventListener('click', function() {
		title = edit_name.value;
		description = edit_description.value;
		affirmation = edit_affirmation.value;
		imagepath = filePath;
		if (title == '' || date == '') {
			alert('Please Enter Goal Title and Date');
		} else {
			if (count >= 2 && (!buy)) {
				//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
				var myDatabase = Ti.Database.install('/myDatabase.sqlite', 'myDatabase.sqlite');
				if (check) {
					Save_image.image = '/images/save1.png';
					indicator();
					myDatabase.execute('UPDATE create_goal SET title=?,description=?,affirmation=?,image=?,date=? WHERE rowid=?', title, description, affirmation, imagepath, date, viewdata);

					var newWindowClass = require('/ui/common/showGoal');
					var newWindow = new newWindowClass();

					var currentWin = Create_Goal;
					newWindow.containingTab = currentWin.containingTab;
					//currentWin.close();
					currentWin.containingTab.open(newWindow, {
						animated : false
					});
				} else {
					var alertDialog = Titanium.UI.createAlertDialog({
						title : 'Buy Full Version',
						message : 'You need full version to create more Goals',
						buttonNames : ['Cancel', 'Buy'],
						cancel : 1
					});

					alertDialog.addEventListener('click', function(theEvent) {
						if (theEvent.index !== theEvent.cancel) {
							//alert('hello');
						}
						switch (theEvent.index) {
							case 1:
								var newWindowClass = Ti.UI.createWindow({
									url : 'ui/common/Buy.js',
									backgroundColor : 'white'
								});
								newWindowClass.open();
								break;
							//This will never be reached, if you specified cancel for index 1
							default:
								break;
						}
					});
					alertDialog.show();
				}
				//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

			} else {
				Save_image.image = '/images/save1.png', indicator();
				var myDatabase = Ti.Database.install('/myDatabase.sqlite', 'myDatabase.sqlite');
				if (check) {
					myDatabase.execute('UPDATE create_goal SET title=?,description=?,affirmation=?,image=?,date=? WHERE rowid=?', title, description, affirmation, imagepath, date, viewdata);
					var newWindowClass = require('/ui/common/showGoal');
					var newWindow = new newWindowClass();

					var currentWin = Create_Goal;
					newWindow.containingTab = currentWin.containingTab;
					//currentWin.close();
					currentWin.containingTab.open(newWindow, {
						animated : false
					});
				} else {
					var myDatabase = Ti.Database.install('/myDatabase.sqlite', 'myDatabase.sqlite');
					myDatabase.execute('INSERT INTO TempImage (imagepath) VALUES(?)', imagepath);
					myDatabase.close();
					Ti.App.Properties.setString('titl', title);
					Ti.App.Properties.setString('descriptio', description);
					Ti.App.Properties.setString('affirmatio', affirmation);
					Ti.App.Properties.setString('dat', date);
					if (!show) {
						var newWindowClass = require('/ui/common/firstShare');
						var newWindow = new newWindowClass();

						var currentWin = Create_Goal;
						newWindow.containingTab = currentWin.containingTab;
						//currentWin.close();
						currentWin.containingTab.open(newWindow, {
							animated : false
						});
					} else {
						var newWindowClass = require('ui/common/firstShare');
						var newWindow = new newWindowClass();
						newWindow.open();
					}
				}
				myDatabase.close();
				//alert('Name' + ': ' + title + ',' + 'Description' + ': ' + description + ',' + 'Affirmation' + ': ' + affirmation + 'imagepath' + ': ' + imagepath + ',' + 'date' + ': ' + date + ',' + 'achieved' + ': ' + achieved);

				var come = Ti.App.Properties.setBool('come', false);
			}
		}
	});

	// Add to the parent view.
	secondsubselfBottom.add(Save);

	var Save_image = Ti.UI.createImageView({
		image : '/images/save.png',
		height : 75,
		width : 60,
	});
	Save.add(Save_image);
	Create_Goal.add(scrollView);

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
			style : Ti.UI.iPhone.ActivityIndicatorStyle.BIG,
		});
		indicatorView.add(activityIndicator);
		activityIndicator.show();
	}

	return Create_Goal;
};
module.exports = Create_Goal;
