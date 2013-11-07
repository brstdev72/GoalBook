function Goal_Tab(window) {
	//create module instance
	
	var self = Ti.UI.createTabGroup();



	//create app tabs
	var showGoalClass = require('ui/common/'+window);
	var showGoalWindow = new showGoalClass();
	var tab1 = Ti.UI.createTab({
		
		window : showGoalWindow
	});
	showGoalWindow.containingTab = tab1;

	self.addTab(tab1);
	return self;
};

module.exports = Goal_Tab;
