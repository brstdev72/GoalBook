var Setreminder = Ti.UI.currentWindow;
Setreminder.orientationModes = [Ti.UI.PORTRAIT];

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

var tmp = (Titanium.Platform.displayCaps.platformHeight * 3.8) / 100;
var tmp2 = (Titanium.Platform.displayCaps.platformHeight * 2.8) / 100;
var tmp3 = (Titanium.Platform.displayCaps.platformHeight * 2) / 100;

var Today = '';
var Tomonth = '';
var Toyear = '';
var ToHours = '';
var Tominute = '';

var Fromday = '';
var Frommonth = '';
var Fromyear = '';
var FromHours = '';
var Fromminute = '';

var reminder_View = Ti.UI.createView({
	backgroundImage : this_path,
	height : '100%',
	weight : '100%',
});
Setreminder.add(reminder_View);

var reminder_top_View = Ti.UI.createView({
	backgroundColor : 'black',
	height : '10%',
	weight : '100%',
	top : '0%'
});
reminder_View.add(reminder_top_View);

// Label
var label = Ti.UI.createLabel({
	text : 'Reminder',
	color : 'white',
	font : {
		fontWeight : 'bold',
		fontSize : tmp
	},
	shadowColor : '#eee',
	shadowOffset : {
		x : 0,
		y : 1
	}
});

reminder_top_View.add(label);

var edit_name = Titanium.UI.createTextField({
	top : '12%',
	hintText : 'Title',
	font : {
		fontSize : tmp2
	},
	width : '90%',
	height : '10%',
	left : '5%',
	keyboardType : Ti.UI.KEYBOARD_APPEARANCE_DEFAULT,
	returnKeyType : Ti.UI.RETURNKEY_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
reminder_View.add(edit_name);

// Create a Label.
var From = Ti.UI.createLabel({
	text : 'From',
	color : 'black',
	top : '22%',
	left : '5%',
	font : {
		fontSize : tmp2
	}
});

// Add to the parent view.
reminder_View.add(From);

function getDate() {
	var currentTime = new Date();
	var month = currentTime.getMonth() + 1;
	var day = currentTime.getDate();
	var year = currentTime.getFullYear();

	return month + "/" + day + "/" + year;

}

function getTime() {
	var currentTime = new Date();
	var hours = currentTime.getHours();
	var minutes = currentTime.getMinutes();

	if (hours < 10) {
		hours = "0" + hours
	};
	if (minutes < 10) {
		minutes = "0" + minutes
	};

	return hours + ":" + minutes;

}

var validDate = getDate();
var validTime = getTime();

var from_date_button = Ti.UI.createButton({
	title : validDate,
	height : '10%',
	width : '48%',
	top : '27%',
	left : '5%',
	font : {
		fontSize : tmp2
	}
});
from_date_button.addEventListener('click', function() {
	reminder_View.add(fromDateview);
});
reminder_View.add(from_date_button);

var from_time_button = Ti.UI.createButton({
	title : validTime,
	height : '10%',
	width : '38%',
	top : '27%',
	left : '57%',
	font : {
		fontSize : tmp2
	}
});
from_time_button.addEventListener('click', function() {
	reminder_View.add(fromTimeview);
});

reminder_View.add(from_time_button);

//**********************************************************From Date*************************************************************************

var fromDateview = Ti.UI.createView({
	height : Ti.UI.SIZE,
	width : Ti.UI.SIZE,
	layout : 'vertical',
	backgroundImage : '/images/topbar.png'
});

var Frompicker = Ti.UI.createPicker({
	type : Ti.UI.PICKER_TYPE_DATE,
	value : new Date()
});

Frompicker.selectionIndicator = true;

fromDateview.add(Frompicker);

var bottombuttons = Ti.UI.createView({
	layout : 'horizontal',
	height : '10%',
	width : 'auto'
});
fromDateview.add(bottombuttons);

var Set = Ti.UI.createButton({
	title : 'Set',
	height : '100%',
	width : '40%',
	left : '10%',
	font : {
		fontSize : tmp2
	}
});
Set.addEventListener('click', function() {
	var Frompickervalue = Frompicker.value;

	Fromday = Frompickervalue.getDate();
	Fromday = Fromday.toString();
	if (Fromday.length < 2) {
		Fromday = '0' + Fromday;

	}
	Frommonth = Frompickervalue.getMonth();
	Frommonth = Frommonth + 1;
	Frommonth = Frommonth.toString();

	if (Frommonth.length < 2) {
		Frommonth = '0' + Frommonth;
	}
	Fromyear = Frompickervalue.getFullYear();
	var searchDate = Frommonth + "/" + Fromday + "/" + Fromyear;

	from_date_button.title = searchDate;
	reminder_View.remove(fromDateview);
});
bottombuttons.add(Set);

var Cancel = Ti.UI.createButton({
	title : 'Cancel',
	height : '100%',
	width : '40%',
	right : '10%',
	font : {
		fontSize : tmp2
	}
});
Cancel.addEventListener('click', function() {
	reminder_View.remove(fromDateview);
})
bottombuttons.add(Cancel);

//**********************************************************From time*************************************************************************

var fromTimeview = Ti.UI.createView({
	height : Ti.UI.SIZE,
	width : Ti.UI.SIZE,
	layout : 'vertical',
	backgroundImage : '/images/topbar.png'
});

var FromTimepicker = Ti.UI.createPicker({
	type : Ti.UI.PICKER_TYPE_TIME,
	value : new Date()
});

FromTimepicker.selectionIndicator = true;

fromTimeview.add(FromTimepicker);

var bottomTimebuttons = Ti.UI.createView({
	layout : 'horizontal',
	height : '10%',
	width : 'auto'
});
fromTimeview.add(bottomTimebuttons);

var TimeSet = Ti.UI.createButton({
	title : 'Set',
	height : '100%',
	width : '40%',
	left : '10%',
	font : {
		fontSize : tmp2
	}
});
TimeSet.addEventListener('click', function() {
	var FromTimepickervalue = FromTimepicker.value;

	FromHours = FromTimepickervalue.getHours();
	FromHours = FromHours.toString();
	if (FromHours.length < 2) {
		FromHours = '0' + FromHours;

	}
	Fromminute = FromTimepickervalue.getMinutes();
	Fromminute = Fromminute.toString();
	if (Fromminute.length < 2) {
		Fromminute = '0' + Fromminute;
	}

	var searchDate = FromHours + ":" + Fromminute;

	from_time_button.title = searchDate;
	reminder_View.remove(fromTimeview);

});

bottomTimebuttons.add(TimeSet);

var TimeCancel = Ti.UI.createButton({
	title : 'Cancel',
	height : '100%',
	width : '40%',
	right : '10%',
	font : {
		fontSize : tmp2
	}
});
TimeCancel.addEventListener('click', function() {
	reminder_View.remove(fromTimeview);
});
bottomTimebuttons.add(TimeCancel);

var To = Ti.UI.createLabel({
	text : 'To',
	color : 'black',
	top : '38%',
	left : '5%',
	font : {
		fontSize : tmp2
	}
});

// Add to the parent view.
reminder_View.add(To);

var To_date_button = Ti.UI.createButton({
	title : validDate,
	height : '10%',
	width : '43%',
	top : '43%',
	left : '5%',
	font : {
		fontSize : tmp2
	}
});
To_date_button.addEventListener('click', function() {
	reminder_View.add(ToDateview);
});
reminder_View.add(To_date_button);

var To_time_button = Ti.UI.createButton({
	title : validTime,
	height : '10%',
	width : '38%',
	top : '43%',
	left : '57%',
	font : {
		fontSize : tmp2
	}
});
To_time_button.addEventListener('click', function() {
	reminder_View.add(ToTimeview);
});

reminder_View.add(To_time_button);

//**********************************************************To Date************************************************************************

var ToDateview = Ti.UI.createView({
	height : Ti.UI.SIZE,
	width : Ti.UI.SIZE,
	layout : 'vertical',
	backgroundImage : '/images/topbar.png'
});

var Topicker = Ti.UI.createPicker({
	type : Ti.UI.PICKER_TYPE_DATE,
	value : new Date()
});

Topicker.selectionIndicator = true;

ToDateview.add(Topicker);

var Tobottombuttons = Ti.UI.createView({
	layout : 'horizontal',
	height : '10%',
	width : 'auto'
});
ToDateview.add(Tobottombuttons);

var ToSet = Ti.UI.createButton({
	title : 'Set',
	height : '100%',
	width : '40%',
	left : '10%',
	font : {
		fontSize : tmp2
	}
});
ToSet.addEventListener('click', function() {
	var Topickervalue = Topicker.value;

	Today = Topickervalue.getDate();
	Today = Today.toString();
	if (Today.length < 2) {
		Today = '0' + Today;
	}

	Tomonth = Topickervalue.getMonth();
	Tomonth = Tomonth + 1;
	Tomonth = Tomonth.toString();

	if (Tomonth.length < 2) {
		Tomonth = '0' + Tomonth;
	}
	Toyear = Topickervalue.getFullYear();
	var searchDate = Tomonth + "/" + Today + "/" + Toyear;

	To_date_button.title = searchDate;
	reminder_View.remove(ToDateview);
})
Tobottombuttons.add(ToSet);

var ToCancel = Ti.UI.createButton({
	title : 'Cancel',
	height : '100%',
	width : '40%',
	right : '10%',
	font : {
		fontSize : tmp2
	}
});
ToCancel.addEventListener('click', function() {
	reminder_View.remove(ToDateview);
})
Tobottombuttons.add(ToCancel);

//**********************************************************To Time*************************************************************************

var ToTimeview = Ti.UI.createView({
	height : Ti.UI.SIZE,
	width : Ti.UI.SIZE,
	layout : 'vertical',
	backgroundImage : '/images/topbar.png'
});

var ToTimepicker = Ti.UI.createPicker({
	type : Ti.UI.PICKER_TYPE_TIME,
	value : new Date()
});

ToTimepicker.selectionIndicator = true;

ToTimeview.add(ToTimepicker);

var TobottomTimebuttons = Ti.UI.createView({
	layout : 'horizontal',
	height : '10%',
	width : 'auto'
});
ToTimeview.add(TobottomTimebuttons);

var ToTimeSet = Ti.UI.createButton({
	title : 'Set',
	height : '100%',
	width : '40%',
	left : '10%',
	font : {
		fontSize : tmp2
	}
});

ToTimeSet.addEventListener('click', function() {
	var ToTimepickervalue = ToTimepicker.value;

	ToHours = ToTimepickervalue.getHours();
	ToHours = ToHours.toString();
	if (ToHours.length < 2) {
		ToHours = '0' + ToHours;
	}

	Tominute = ToTimepickervalue.getMinutes();
	Tominute = Tominute.toString();
	if (Tominute.length < 2) {
		Tominute = '0' + Tominute;
	}

	var searchDate = ToHours + ":" + Tominute;

	To_time_button.title = searchDate;
	reminder_View.remove(ToTimeview);

});
TobottomTimebuttons.add(ToTimeSet);

var ToTimeCancel = Ti.UI.createButton({
	title : 'Cancel',
	height : '100%',
	width : '40%',
	right : '10%',
});
ToTimeCancel.addEventListener('click', function() {
	reminder_View.remove(ToTimeview);
});
TobottomTimebuttons.add(ToTimeCancel);

// Create a Switch.
var aSwitch = Ti.UI.createSwitch({
	backgroundImage : '/images/check.png',
	top : '55%',
	right : '6%',
	height : '6%',
	width : '8%',
	titleOff : '',
	title : '',
	titleOn : '',
	value : true
});

// Listen for change events.
aSwitch.addEventListener('change', function(e) {
	if (aSwitch.value == true) {
		aSwitch.backgroundImage = '/images/check.png';
	} else {
		aSwitch.backgroundImage = '/images/uncheck.png';
	}
});

// Add to the parent view.
reminder_View.add(aSwitch);

var alldays = Ti.UI.createLabel({
	text : 'All Days',
	top : '56.5%',
	right : '17%',
	color : 'black',
	font : {
		fontSize : tmp2
	}
});

// Add to the parent view.
reminder_View.add(alldays);

// Create a TextField.
var Message = Ti.UI.createTextArea({
	height : '25%',
	bottom : '12%',
	left : '5%',
	width : '90%',
	hintText : 'Enter your Alert Message',
	softKeyboardOnFocus : Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS, // Android only
	keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	returnKeyType : Ti.UI.RETURNKEY_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

// Listen for return events.
Message.addEventListener('return', function(e) {
	Message.blur();
});

// Add to the parent view.
reminder_View.add(Message);

var Save = Ti.UI.createButton({
	title : 'Save',
	height : '10%',
	width : '45%',
	left : '5%',
	bottom : '0%',
	font : {
		fontSize : tmp2
	}
});
Save.addEventListener('click', function() {

	//*********************************************************************From Date**********************************************************

	var Frompickervalue = Frompicker.value;

	Fromday = Frompickervalue.getDate();
	Fromday = Fromday.toString();
	if (Fromday.length < 2) {
		Fromday = '0' + Fromday;

	}
	Frommonth = Frompickervalue.getMonth();
	Frommonth = Frommonth + 1;
	Frommonth = Frommonth.toString();

	if (Frommonth.length < 2) {
		Frommonth = '0' + Frommonth;
	}
	Fromyear = Frompickervalue.getFullYear();
	var searchDate = Frommonth + "/" + Fromday + "/" + Fromyear;

	//*********************************************************************From time**********************************************************

	var FromTimepickervalue = FromTimepicker.value;

	FromHours = FromTimepickervalue.getHours();
	FromHours = FromHours.toString();
	if (FromHours.length < 2) {
		FromHours = '0' + FromHours;

	}
	Fromminute = FromTimepickervalue.getMinutes();
	Fromminute = Fromminute.toString();
	if (Fromminute.length < 2) {
		Fromminute = '0' + Fromminute;
	}

	var searchDate = FromHours + ":" + Fromminute;

	//*********************************************************************to Date**********************************************************
	var Topickervalue = Topicker.value;

	Today = Topickervalue.getDate();
	Today = Today.toString();
	if (Today.length < 2) {
		Today = '0' + Today;
	}

	Tomonth = Topickervalue.getMonth();
	Tomonth = Tomonth + 1;
	Tomonth = Tomonth.toString();

	if (Tomonth.length < 2) {
		Tomonth = '0' + Tomonth;
	}
	Toyear = Topickervalue.getFullYear();
	var searchDate = Tomonth + "/" + Today + "/" + Toyear;

	//*********************************************************************to Time**********************************************************

	var ToTimepickervalue = ToTimepicker.value;

	ToHours = ToTimepickervalue.getHours();
	ToHours = ToHours.toString();
	if (ToHours.length < 2) {
		ToHours = '0' + ToHours;
	}

	Tominute = ToTimepickervalue.getMinutes();
	Tominute = Tominute.toString();
	if (Tominute.length < 2) {
		Tominute = '0' + Tominute;
	}

	var searchDate = ToHours + ":" + Tominute;

	if (edit_name.value == '') {
		alert('Please Enter Goal Title');
	} else {
		indicator();
		var calendars = Ti.Android.Calendar.selectableCalendars;
		var names = [];
		for (var i = 0; i < calendars.length; i++) {
			names.push(calendars[i].name);
		}

		var calendarDialog = Titanium.UI.createOptionDialog({
			title : 'Select a Calendar',
			options : names,
			cancel : 1
		});
		calendarDialog.addEventListener('click', function(e) {
			var ci = e.index + 1;
			var calendar = Ti.Android.Calendar.getCalendarById(ci);
			Frommonth = Frommonth - 1
			//alert(Fromyear + "  / " + Frommonth + "  / " + Fromday + "  / " + FromHours + "  / " + Fromminute + "  / " + 0);
			var eventBegins = new Date(Fromyear, Frommonth, Fromday, FromHours, Fromminute, 2);
			Tomonth = Tomonth - 1
			//alert(Toyear + "  / " + Tomonth + "  / " + Today + "  / " + ToHours + "  / " + Tominute + "  / " + 0);
			var eventEnds = new Date(Toyear, Tomonth, Today, ToHours, Tominute, 2);
			var hasReminder = true;
			var details = {
				title : edit_name.value,
				description : Message.value,
				begin : eventBegins,
				end : eventEnds,
				hasAlarm : true,
				allDay : aSwitch.value
			};

			var event = calendar.createEvent(details);

			if (hasReminder) {
				var reminderDetails = {
					minutes : 10,
					method : Ti.Android.Calendar.METHOD_ALERT
				};

				event.createReminder(reminderDetails);
			}
			var Settings = Titanium.UI.createWindow({
				backgroundColor : 'white',
				url : 'Setting.js',
				navBarHidden : true,
				fullscreen : true,
			});
			Settings.open();
			//alert('Event was created!');
		});
		calendarDialog.show();

	}
});
reminder_View.add(Save);

var CancelReminder = Ti.UI.createButton({
	title : 'Cancel',
	height : '10%',
	width : '45%',
	right : '5%',
	bottom : '0%',
	font : {
		fontSize : tmp2
	}
});
CancelReminder.addEventListener('click', function() {

	indicator();

	var Settings = Titanium.UI.createWindow({
		backgroundColor : 'white',
		url : 'Setting.js',
		navBarHidden : true,
		fullscreen : true,
	});
	Settings.open();
});
reminder_View.add(CancelReminder);

function indicator() {
	var indicatorView = Ti.UI.createView({
		backgroundColor : 'black',
		height : '25%',
		width : '40%',
		opacity : 0.7,
		borderRadius : 10
	});
	reminder_View.add(indicatorView);
	var activityIndicator = Ti.UI.createActivityIndicator({
		style : Ti.UI.ActivityIndicatorStyle.BIG,

	});
	indicatorView.add(activityIndicator);
	activityIndicator.show();
}

