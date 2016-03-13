//set the accounts
if (Users.find().count() === 0) {
  Accounts.createUser({
    username: 'admin',
    password: '123456',
    email: 'joe@schmoe.com',
    profile: {
      name: 'Joe Schmoe',
      root: 'admin'
    }
  });
  Accounts.createUser({
    username: 'studentA',
    password: '123456',
    email: 'studentA@qq.com',
    profile: {
      name: 'Kinthon',
      root: 'student',
      group: 1
    }
  });
  Accounts.createUser({
    username: 'studentB',
    password: '123456',
    email: 'studentB@qq.com',
    profile: {
      name: 'Mike',
      root: 'student',
      group: 1
    }
  });
  Accounts.createUser({
    username: 'studentC',
    password: '123456',
    email: 'studentC@qq.com',
    profile: {
      name: 'John',
      root: 'student',
      group: 2
    }
  });
  Accounts.createUser({
    username: 'studentD',
    password: '123456',
    email: 'studentD@qq.com',
    profile: {
      name: 'John2',
      root: 'student',
      group: 2
    }
  });
  Accounts.createUser({
    username: 'teacher',
    password: '123456',
    email: 'teacher@qq.com',
    profile: {
      name: 'Bob',
      root: 'teacher',
    }
  });
  Accounts.createUser({
    username: 'ta',
    password: '123456',
    email: 'ta@qq.com',
    profile: {
      name: 'Jake',
      root: 'assistant',
      groupMin: 1,
      groupMax: 2
    }
  });
}

if (Homeworks.find().count() === 0) {
  Homeworks.insert({
    title: 'Homework 1 - Recipe',
    url: 'http://my.ss.sysu.edu.cn/wiki/display/WEB/Homework+1+-+Recipe',
    startTime: (new Date("10 9, 2015")).toDateString(),
    deadline: (new Date("10 16, 2015")).toDateString(),
  });
  Homeworks.insert({
    title: 'Movie Review',
    url: 'http://my.ss.sysu.edu.cn/wiki/display/WEB/Homework+2+-+Movie+Review',
    startTime: (new Date("10 16, 2015")).toDateString(),
    deadline: (new Date("10 22, 2015")).toDateString(),
  });
  Homeworks.insert({
    title: 'Homework 3 - hahaha',
    url: 'http://my.ss.sysu.edu.cn/wiki/display/WEB/Homework+2+-+Movie+Review',
    startTime: (new Date("2 24, 2016")).toDateString(),
    deadline: (new Date("2 28, 2016")).toDateString(),
  });
  Homeworks.insert({
    title: 'Homework 4 - test now',
    url: 'http://my.ss.sysu.edu.cn/wiki/display/WEB/Homework+2+-+Movie+Review',
    startTime: (new Date("2 22, 2016")).toDateString(),
    deadline: (new Date("2 28, 2016")).toDateString(),
  });
}
if (Reviews.find().count() === 0) {
  Reviews.insert({
    homeworkID: Homeworks.findOne({ title: "Homework 1 - Recipe" })._id,
    reviewee: "studentA",
    score: 90,
    randInClass: 1,
    randInGroup: 3,
    otherReviewList: [{
      isTa: false,
      reviewer: "studentB",
      comment: "I'am studentB",
      score: 90
    }, {
      isTa: false,
      reviewer: "studentC",
      comment: "I'am studentC",
      score: 80,
    }, {
      isTa: true,
      reviewer: "ta",
      comment: "I'am ta",
      score: 90
    }]
  });
  Reviews.insert({
    homeworkID: Homeworks.findOne({ title: "Movie Review" })._id,
    reviewee: "studentA",
    score: 90,
    randInClass: 1,
    randInGroup: 3,
    otherReviewList: [{
      isTa: false,
      reviewer: "studentB",
      comment: "homework2: I'am studentB",
      score: 90
    }, {
      isTa: false,
      reviewer: "studentC",
      comment: "homework2: I'am studentC",
      score: 80
    }, {
      isTa: true,
      reviewer: "ta",
      comment: "homework2: I'am ta",
      score: 90
    }]
  })
}
if (Relationship.find().count() === 0) {
  Relationship.insert({
    reviewee: 1,
    reviewer: 2
  });
  Relationship.insert({
    reviewee: 2,
    reviewer: 1
  })
}
