Template.signin.events({
  'submit form': function(e) {
    e.preventDefault();

    let username = $(e.target).find('[name=username]').val();
    let password = $(e.target).find('[name=password]').val();

    Meteor.loginWithPassword(username, password, function(error) {
        if(error) {
            alert(error)
        } else {
            Router.go('index')
        }
    });
  }
})
