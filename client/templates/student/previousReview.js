Template.previousReview.helpers({
	otherReviews: function() {
		let reviews = Reviews.findOne({reviewee: Meteor.user().username, homeworkID: this.homework._id});
		return reviews.otherReviewList;
	}
});