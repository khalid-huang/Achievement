Template.addHomework.events({
  'submit form': function(e) {
    e.preventDefault();
    let title = $(e.target).find('[name=title]').val();
    let url = $(e.target).find('[name=url]').val();
    let startTime = $(e.target).find('[name=startTime]').val();
    let deadline = $(e.target).find('[name=deadline]').val();
    if(new Date(deadline) - new Date(startTime) < 0) {
      alert('日期设置有误');
    } else {
      Homeworks.insert({
        title: title,
        url: url,
        startTime: (new Date(startTime)).toDateString(),
        deadline: (new Date(deadline)).toDateString(),
      }, function(err) {
        if (err) {
          alert(err);
        } else {
          Router.go('index');
        }
      });
    }
  }
})
