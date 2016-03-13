Meteor.publish('users', function() {
	return Users.find();
})
Meteor.publish('homeworks', function() {
	return Homeworks.find();
});
Meteor.publish('reviews', function() {
	return Reviews.find();
});
Meteor.publish('myHwReviews', function(homeworkID) {
	return Reviews.find({homeworkID: homeworkID});
})
Meteor.publish('homeworkFile', function() {
	return HomeworkFile.find();
});
Meteor.publish('relationship', function() {
	return Relationship.find();
});
Meteor.publish('hwReviews', function(homeworkID) {
	return Reviews.find({homeworkID: homeworkID});
});