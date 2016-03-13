Template.admin.events({
  'submit #addUser': function(e) {
    e.preventDefault();
    let username = $(e.target).find('[name=username]').val();
    let name = $(e.target).find('[name=name]').val();
    let password = $(e.target).find('[name=password]').val();
    let email = $(e.target).find('[name=email]').val();
    let root = $('#rote option:selected').text();
    Accounts.createUser({
      username: username,
      password: password,
      email: email,
      profile: {
        name: name,
        root: root,
        group: 1
      }
    }, function(error) {
      if (error) {
        alert(error.reason);
      } else {
        alert("Create user successfully");
        Meteor.logout(function() {
          Meteor.loginWithPassword('admin', '123456', function() {
          	Router.go('admin');
          });
        });
      }
    });
  }
});
