

$(document).ready(function() {
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });
  // Getting references to our form and input
  var searchForm = $("form.search");
  var search1form = $("form.sndsearch");
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");

  var fname = $("#firstname");
  var lname = $("#lastname");
  var add = $("#address");
  var cty = $("#city");
  var zcode = $("#zipcode");
  var st = $("#state");
  var cphone = $("#cell-phone");
  var wphone = $("#work-phone");
  var hphone = $("#house-phone");

  var searchName = $("#search-name");
  var searchfirstname = $("#search-fname");

  function showClientList(clientArray){
    var clientList = "<div>";
    console.log(clientArray);
    for(var i = 0; i<clientArray.length; i++){
      console.log(i);
      clientList = clientList + '<div class="card" style="width: 18rem;"><div class="card-body"><h5 class="card-title">'+clientArray[i].first_name+' '+clientArray[i].last_name+'</h5> <p class="card-text">'+clientArray[i].email+' '+clientArray[i].cell_phone+'</p><span class="btn btn-primary add-pet" data-id="'+clientArray[i].id+'">Add Pet</span><span class="btn btn-primary view-pet" data-id="'+clientArray[i].id+'">View Pets</span></div> </div>'
    }
    clientList = clientList + "</div>";
    $("#searchresult").html(clientList)
  }

  $(document).on("click", ".view-pet", function(event){
    var id = $(this).data("id");
    var route = "/api/pet_data/"+ id;
    console.log(route);
    $.get(route)
    .then(function(data){
      console.log(data);
    })
  })

  console.log("here");
  search1form.on("submit", function(event){
    event.preventDefault();
    var route = "/api/search-firstname/client/" + searchfirstname.val().trim();
    $.get(route)
      .then(function(data) {
        console.log(data);
        showClientList(data);
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  })

  searchForm.on("submit", function(event){
    event.preventDefault();
    var route = "/api/search-lastname/client/" + searchName.val().trim();
    $.get(route)
      .then(function(data) {
        console.log(data);
        showClientList(data);
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  })
  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      first_name: fname.val().trim(),
      last_name: lname.val().trim(),
      address: add.val().trim(),
      city: cty.val().trim(),
      state: st.val().trim(),
      zipcode: zcode.val().trim(),
      cell_phone: cphone.val().trim(),
      work_phone: wphone.val().trim(),
      house_phone: hphone.val().trim(),
    };

    if (!userData.email) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser();
    // emailInput.val("");
    // passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser() {
    var userData = {
      email: emailInput.val().trim(),
      first_name: fname.val().trim(),
      last_name: lname.val().trim(),
      address: add.val().trim(),
      city: cty.val().trim(),
      state: st.val().trim(),
      zipcode: zcode.val().trim(),
      cell_phone: cphone.val().trim(),
      work_phone: wphone.val().trim(),
      house_phone: hphone.val().trim(),
    };
    $.post("/api/new_members", userData)
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