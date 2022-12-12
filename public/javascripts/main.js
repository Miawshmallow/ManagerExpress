$( document ).ready(function() {
  function login(){
    var data = {};
    data.username = $('#username').val();
    data.password = $('#password').val();
    $.ajax({
      url: 'auth',
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      dataType: 'json'}

    )
    .done(function(response){
               if(response=="ok"){
                window.location.href = "/dashboard";
               }
                else{
                $("#result").empty().append(response); 
              }
          });
    }
    $('.submitlogin').click(function(){login();});
});