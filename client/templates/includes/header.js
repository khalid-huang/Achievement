Template.header.helpers({
	user: function() {
		let user = Meteor.user();
/*		alert(user.username);*/
		if(user.profile.root === "student") {
			user.isStudent = true;
		} else {
			user.isStudent = false;
		}
		return user;
	}
});