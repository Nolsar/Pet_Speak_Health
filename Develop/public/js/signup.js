$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var fname = $("#firstname");
  var lname = $("#lastname");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      first_name: fname.val().trim(),
      last_name: lname.val().trim(),
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    // 
    signUpUser();
    
  });

  function signUpUser() {
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      first_name: fname.val().trim(),
      last_name: lname.val().trim()
    };
  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  $.post("/api/signup", userData)
      .then(function(data) {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});

