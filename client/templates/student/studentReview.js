Template.studentReview.helpers({
  revieweeGroup: function() {
    let revieweeGroup = Relationship.findOne({ 'reviewer': Meteor.user().profile.group }).reviewee;
    return revieweeGroup;
  },
  MyReviews: function() {
    let revieweeGroup = Relationship.findOne({ 'reviewer': Meteor.user().profile.group }).reviewee;
    let MyReviews = [];
    HomeworkFile.find({ "group": revieweeGroup }).forEach(function(homeworkFile) {
      let review = Reviews.findOne({ "reviewee": homeworkFile.username, homeworkID: homeworkFile.homeworkID });
      if (review) {
        review.otherReviewList.forEach(function(post) {
          console.log(post.reviewer);
          if (post.reviewer === Meteor.user().username) {
            homeworkFile.comment = post.comment;
            homeworkFile.score = post.score;
            homeworkFile.isTA = post.isTa;
          }
        });
      } else {
        homeworkFile.comment = ' ';
        homeworkFile.score = ' ';
        homeworkFile.isTA = false;
      }
      MyReviews.push(homeworkFile);
    });
    return MyReviews;
  }
});

Template.studentReview.events({
  'blur #comment': function(e) {
    let comment = $(e.target).text();
    if (!comment) {
      return;
    }
    if (Reviews.findOne({ homeworkID: this.homeworkID, reviewee: this.username })) {
      let otherReviewList = Reviews.findOne({ homeworkID: this.homeworkID, reviewee: this.username }).otherReviewList;
      let currentID = Reviews.findOne({ homeworkID: this.homeworkID, reviewee: this.username })._id;
      for (let i = 0; i < otherReviewList.length; i++) {
        if (otherReviewList[i].reviewer === Meteor.user().username) {
          otherReviewList[i].comment = comment;
        }
      }
      Reviews.update(currentID, {
          $set: { otherReviewList: otherReviewList }
        },
        function(error) {
          if (error) {
            alert(error.reason);
          } else {}
        })
    } else {
      Reviews.insert({
        homeworkID: this.homeworkID,
        reviewee: this.username,
        score: 0,
        randInClass: 0,
        randInGroup: 0,
        otherReviewList: [{
          isTa: false,
          reviewer: Meteor.user().username,
          comment: comment,
          score: ' '
        }]
      })
    }
  },
  'blur #score': function(e) {
    let score = $(e.target).text();
    if (!score) {
      return;
    }
    if (Reviews.findOne({ homeworkID: this.homeworkID, reviewee: this.username })) {
      let otherReviewList = Reviews.findOne({ homeworkID: this.homeworkID, reviewee: this.username }).otherReviewList;
      let currentID = Reviews.findOne({ homeworkID: this.homeworkID, reviewee: this.username })._id
      for (let i = 0; i < otherReviewList.length; i++) {
        if (otherReviewList[i].reviewer === Meteor.user().username) {
          otherReviewList[i].score = score;
        }
      }
      Reviews.update(currentID, {
          $set: { otherReviewList: otherReviewList }
        },
        function(error) {
          if (error) {
            alert(error.reason);
          } else {}
        })
    } else {
      Reviews.insert({
        homeworkID: this.homeworkID,
        reviewee: this.username,
        score: 0,
        randInClass: 0,
        randInGroup: 0,
        otherReviewList: [{
          isTa: false,
          reviewer: Meteor.user().username,
          comment: ' ',
          score: score
        }]
      })
    }
  }
});
