  function savesupervisor(id) {
	    supervisor=document.getElementById('supervisor').value;
	    tipo="supervisor"
   		$.ajax({
    			   		url: 'api/data',
    			    	type: 'POST',
    			    	 contentType: "application/json; charset=utf-8",
    			       	data: JSON.stringify({ id: id,supervisor:supervisor,tipo: tipo})
    			       	,
    			       	dataType: 'json'
    			    }).done(function(response){
                swal.fire('Modificado!', 'O supervisor foi modificado.','success');
                $("#mainf").load("config"); 
          })
   
} 

  function editasenha(id) {
Swal.fire({
  title: 'Editar senha',
  html: `<input type="password" id="password" class="swal2-input" placeholder="Senha">`,
  confirmButtonText: 'Salvar',
  focusConfirm: false,
  preConfirm: () => {
    const password = Swal.getPopup().querySelector('#password').value
    if (!password) {
      Swal.showValidationMessage(`Prencha o campo de senha`)
    }
    return { password: password }
  }
}).then((result) => {
      result=result
      tipo="editasenha"
      id="1"
      $.ajax({
                url: 'api/data',
                type: 'POST',
                 contentType: "application/json; charset=utf-8",
                  data: JSON.stringify({ id: id,password:result.value.password,tipo: tipo})
                  ,
                  dataType: 'json'
              })

    swal.fire('Modificado!', 'Senha modificada.','success');
})
   
} 













$(document).ready(function(){

$('.editsenha').click(function(){
var id = $(this).attr('id');

editasenha(id);});

$('.salvar').click(function(){  
  var id = $(this).attr('id');
    savesupervisor(id);
});




});
