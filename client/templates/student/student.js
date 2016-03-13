Template.student.helpers({
	homeworks: function() {
		let homeworkfile = HomeworkFile.find();
		let homeworks = [];
		Homeworks.find().forEach(function (homework, i) {
			homework.index = i + 1;
			let now = new Date();
			if(new Date(homework.deadline) < now) {
				homework.isEnd = true;
				let review = Reviews.findOne({reviewee: Meteor.user().username, homeworkID:homework._id});
				// let homeworkfile = HomeworkFile.findOne({username: Meteor.user().username, homework: homework.title});
				if(review) {
					homework.score = review.score;
					homework.randInClass = review.randInClass;
					homework.randInGroup = review.randInGroup;
				} else {
					homework.score = homework.randInGrade = homework.randInGroup = 0;
				}
			} else if(new Date(homework.startTime) > now) {
				homework.isFuture = true;
			} else {
				if(HomeworkFile.find({homeworkID: homework._id, username: Meteor.user().username}).count() != 0) {
					homework.isImprove = true;
					//....
				} else {
					homework.isPresent = true;
					//...
				}
			}
			homeworks.push(homework);
		});
		return homeworks;
	}
});

Template.student.events({
	'click #submitHomework': function(e) {
		var r = confirm("Sure to submit");
		if(r === true) {
			HomeworkFile.insert({
				username: Meteor.user().username,
				group: Meteor.user().profile.group,				
				homeworkID: this._id
			}, function(error) {
				if(error) {
					alert(error.reason)
				} else {
					alert('Submit successfully');
/*					Router.go('student');*/
				}
			})
		} else {
		}
	},
	'click #updateHomework': function(e) {
		var r = confirm("Sure to update");
		if(r === true) {
			HomeworkFile.update({
				username: Meteor.user().username,
				homeworkID: this._id
			}, {
				username: Meteor.user().username,
				group: Meteor.user().profile.group,
				homeworkID: this._id,
				update: true
			},function(error) {
				if(error) {
					alert(error.reason)
				} else {
					alert('Submit successfully');
/*					Router.go('student');*/
				}
			})
		} else {
		}
	}
});