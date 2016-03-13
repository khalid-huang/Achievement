function num2date(num) {
  if(num < 10) {
    return '0'+num.toString();
  } else {
    return num.toString();
  }
}
Template.editHomework.helpers({
  start: function() {
    let startTime = new Date(this.startTime);
    let start = num2date(startTime.getFullYear()) + '-' + num2date(startTime.getMonth() + 1) + '-' + num2date(startTime.getDate());
    return start;
  },
  end: function() {
    let deadline = new Date(this.deadline);
    let end = num2date(deadline.getFullYear()) + '-' + num2date(deadline.getMonth() + 1) + '-' + num2date(deadline.getDate());
    return end;
  }
});
Template.editHomework.events({
  'submit form': function(e) {
    e.preventDefault();
    let title = $(e.target).find('[name=title]').val();
    let url = $(e.target).find('[name=url]').val();
    let startTime = $(e.target).find('[name=startTime]').val();
    let deadline = $(e.target).find('[name=deadline]').val();

    var editInfo = {
      title: title,
      url: url,
      startTime: (new Date(startTime)).toDateString(),
      deadline: (new Date(deadline)).toDateString()
    };
    var currentId = this._id;
    Homeworks.update(currentId, {
      $set: editInfo
    }, function(err) {
      if(err) {
        alert(err.reason);
      } else {
        Router.go('index');
      }
    })
  }
})
