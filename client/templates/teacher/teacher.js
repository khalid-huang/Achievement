Template.teacher.helpers({
	homeworks: function() {
		var homeworks = [];
		Homeworks.find().forEach(function(item) {
			let startTime = new Date(item.startTime);
			let deadline = new Date(item.deadline);
			let now = new Date();
			if(startTime > now) {
				item.status = 'future';
				item.panel = 'panel-primary';
			} else if(startTime < now && deadline > now) {
				item.status = 'present';
				item.panel = 'panel-primary';
			} else if(deadline < now) {
				item.status = 'end';
				item.panel = 'panel-default';
			}
			homeworks.push(item);
		});
		console.log(homeworks);
		return homeworks;
	}
});

Template.teacher.events({
	'click #delete': function (event) {
		let homeworkId = $(event.target).attr('homeworkId');
		Homeworks.remove(homeworkId, function(error) {
			if(error) {
				alert(error);
			} else {
				Router.go('index');
			}
		})
	}
});