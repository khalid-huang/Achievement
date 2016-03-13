var requireLogin = function() {
  if (!Meteor.user()) {
    Router.go('signin');
  } else {
    this.next();
  }
}

var loginDefault = function() {
  if (Meteor.user()) {
    let root = Meteor.user().profile.root;
    if (root === 'admin') {
      Router.go('admin');
    } else if (root === 'teacher' || root === 'assistant') {
      Router.go('teacher');
    } else if (root === 'student') {
      Router.go('student');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction(requireLogin, { except: 'signin' });
Router.onBeforeAction(loginDefault, { only: 'index' });
Router.configure({
  waitOn: function() {
    return Meteor.subscribe('homeworks');
  }
})

Router.route('/', {
  name: 'index',
  action: function() {
    if (this.ready()) {
      loginDefault();
    }
  }
});

Router.route('/signin', {
  name: 'signin'
});

Router.route('/admin', {
  layoutTemplate: "layout",
  name: "admin",
  waitOn: function() {
    return Meteor.subscribe('users');
  },
  onBeforeAction: function() {
    if(Meteor.user().profile.root === "admin") {
      this.next();
    } else {
      this.render('accessDeny');
    }
  } 
})

Router.route('/teacher', {
  layoutTemplate: 'layout',
  name: 'teacher',
  waitOn: function() {
    return Meteor.subscribe('homeworks')
  },
  onBeforeAction: function() {
    if (Meteor.user().profile.root === 'teacher' || Meteor.user().profile.root === 'assistant') {
      this.next();
    } else {
      this.render('accessDeny');
    }
  }
});

Router.route('/addHomework', {
  layoutTemplate: 'layout',
  name: 'addHomework',
  onBeforeAction: function() {
    if (Meteor.user().profile.root === 'teacher' || Meteor.user().profile.root === 'assistant') {
      this.next();
    } else {
      this.render('accessDeny');
    }
  }
});

Router.route('/editHomework/:_id', {
  layoutTemplate: 'layout',
  name: 'editHomework',
  data: function() {
    return Homeworks.findOne(this.params._id);
  },
  onBeforeAction: function() {
    if (Meteor.user().profile.root === 'teacher' || Meteor.user().profile.root === 'assistant') {
      this.next();
    } else {
      this.render('accessDeny');
    }
  }
});

Router.route('/deleteHomework/:_id', {
  layoutTemplate: 'layout',
  name: 'deleteHomework',
  onBeforeAction: function() {
    if (Meteor.user().profile.root === 'teacher' || Meteor.user().profile.root === 'assistant') {
      this.next();
    } else {
      this.render('accessDeny');
    }
  }
});

Router.route('/student', {
  layoutTemplate: 'layout',
  name: 'student',
  waitOn: function() {
    return [
      Meteor.subscribe("homeworks"),
      Meteor.subscribe("homeworkFile"),
      Meteor.subscribe("reviews")
    ]
  },
  onBeforeAction: function() {
    if(Meteor.user().profile.root === 'student') {
      this.next();
    } else {
      this.render('accessDeny');
    }
  }
});

Router.route('/previousReview/:_id', {
  name: "previousReview",
  layoutTemplate: "layout",
  data: function() {
    return {
      homework: Homeworks.findOne(this.params._id)
    };
  },
  waitOn: function() {
    return [
//      Meteor.subscribe("singleHomework", this.parmas)
      Meteor.subscribe("myHwReviews", this.params._id)
    ];
  },
  onBeforeAction: function() {
    if(Meteor.user().profile.root === 'student') {
      this.next();
    } else {
      this.render('accessDeny');
    }
  }
});

Router.route('/studentReview/:_id', {
  name: "studentReview",
  layoutTemplate: "layout",
  data: function() {
    return Homeworks.findOne(this.params._id);
  },
  waitOn: function() {
    return [
      Meteor.subscribe("homeworks"),
      Meteor.subscribe("homeworkFile"),
      Meteor.subscribe("relationship"),
      Meteor.subscribe("reviews")
    ];
  },

});

Router.route('/otherReview/:_id', {
  name: "otherReview",
  layoutTemplate: "layout",
  data: function() {
    return {
      homework: Homeworks.findOne(this.params._id)
    }
  },
  waitOn: function() {
    return [
      Meteor.subscribe("homeworks"),
/*      Meteor.subscribe("hwHomeworkFiles", this.params_id),*/
      Meteor.subscribe("relationship"),
      Meteor.subscribe("hwReviews", this.params._id)
    ];    
  }
})  