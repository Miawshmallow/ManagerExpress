
const navItems = document.querySelectorAll('nav .nav-item');
navItems.forEach(navItem => {
    navItem.addEventListener('click', () => {
        navItems.forEach(navItem => {
            navItem.classList.remove('active');
        });
        navItem.classList.add('active');
    });
});





function apagar(id) {
	var tipo="delete"
    		swal.fire({
    		  	title: 'Voce tem certeza ?',
    		  	text: "Apos confirmar nao sera possivel reverter isso!",
    		  	icon: 'warning',
    		  	showCancelButton: true,
    		  	confirmButtonColor: '#3085d6',
    		  	cancelButtonColor: '#d33',
    		  	confirmButtonText: 'Sim, apagar!',
    		}).then((result) => {
    		  	if (result.value){
    		  		$.ajax({
    			   		url: 'api/data',
    			    	type: 'POST',
    			    	 contentType: "application/json; charset=utf-8",
    			       	data: JSON.stringify({ id: id, tipo: tipo})
    			       	,
    			       	dataType: 'json'
    			    })
    			    .done(function(response){
    			    	swal.fire('Apagado!', response.message, response.status);
    			    	$("#mainf").load("dash"); 
    			})
    			    .fail(function(){swal.fire('Oops...', 'Something went wrong with ajax !', 'error'); });
    		  	}
     
    		});
    } 


function napagar(id) {
	var tipo="ndelete"
    		swal.fire({
    		  	title: 'Voce tem certeza ?',
    		  	text: "Apos confirmar nao sera possivel reverter isso!",
    		  	icon: 'warning',
    		  	showCancelButton: true,
    		  	confirmButtonColor: '#3085d6',
    		  	cancelButtonColor: '#d33',
    		  	confirmButtonText: 'Sim, apagar!',
    		}).then((result) => {
    		  	if (result.value){
    		  		$.ajax({
    			   		url: 'api/data',
    			    	type: 'POST',
    			    	 contentType: "application/json; charset=utf-8",
    			       	data: JSON.stringify({ id: id, tipo: tipo})
    			       	,
    			       	dataType: 'json'
    			    })
    			    .done(function(response){
    			    	swal.fire('Apagado!', response.message, response.status);
    			    	$("#mainf").load("namelist"); 
    			})
    			    .fail(function(){swal.fire('Oops...', 'Something went wrong with ajax !', 'error'); });
    		  	}
     
    		});
    } 

function editar(id) {
	$.ajax({
		url: 'getuser/'+id,
		type: 'GET',
    	success: function(data){

    		Swal.fire({
  title: 'Editar',
  html: data,
  confirmButtonText: 'Salvar',
  focusConfirm: false,
  preConfirm: () => {
    const nome= Swal.getPopup().querySelector('#nome').value
    const equipamento = Swal.getPopup().querySelector('#equipamento').value
    const local = Swal.getPopup().querySelector('#local').value
    const observacao = Swal.getPopup().querySelector('#observacao').value
    const status = Swal.getPopup().querySelector('#status').value

    if (!nome || !equipamento|| !local|| !observacao|| !status) {
      Swal.showValidationMessage(`Por favor prencha todos os campos`)
    }
    return { nome: nome, equipamento: equipamento,local:local,observacao:observacao,status:status }
  }
}).then((result) => {
	    result=result
	    tipo="update"
   		$.ajax({
    			   		url: 'api/data',
    			    	type: 'POST',
    			    	 contentType: "application/json; charset=utf-8",
    			       	data: JSON.stringify({ id: id,nome:result.value.nome,
    			       	nome:result.value.nome,	equipamento:result.value.equipamento,local:result.value.local,observacao:result.value.observacao,status:result.value.status,
    			       	 tipo: tipo})
    			       	,
    			       	dataType: 'json'
    			    })
   		$("#mainf").load("dash");
   		$("#mainf").load("dash");
   
}) }})} 


    function neditar(id) {
	$.ajax({
		url: 'getname/'+id,
		type: 'GET',
    	success: function(data){

    		Swal.fire({
  title: 'Editar Nome',
  html: data,
  confirmButtonText: 'Salvar',
  focusConfirm: false,
  preConfirm: () => {
    const nome= Swal.getPopup().querySelector('#nome').value
    if (!nome) {
      Swal.showValidationMessage(`Por favor prencha todos os campos`)
    }
    return { nome: nome }
  }
}).then((result) => {
	    result=result
	    tipo="nupdate"
   		$.ajax({
    			   		url: 'api/data',
    			    	type: 'POST',
    			    	 contentType: "application/json; charset=utf-8",
    			       	data: JSON.stringify({ id: id,nome:result.value.nome,tipo: tipo})
    			       	,
    			       	dataType: 'json'
    			    })
   		$("#mainf").load("namelist");
 
   
}) }})} 



function criar() {
  Swal.fire({
  title: 'Novo',
  html:'<input type="text" class="swal2-input" name="nome" placeholder="Nome" id="nome" value=""><input type="text" class="swal2-input" name="equipamento" id="equipamento" placeholder="Equipamento" value=""><input type="text" class="swal2-input" name="local" placeholder="Local" id="local" value=""><input type="text" class="swal2-input" name="observacao" placeholder="Observacao" id="observacao" value=""><input type="text" class="swal2-input" name="status" id="status" placeholder="Status" value="">',
  confirmButtonText: 'Salvar',
  focusConfirm: false,
  preConfirm: () => {
    const nome= Swal.getPopup().querySelector('#nome').value
    const equipamento = Swal.getPopup().querySelector('#equipamento').value
    const local = Swal.getPopup().querySelector('#local').value
    const observacao = Swal.getPopup().querySelector('#observacao').value
    const status = Swal.getPopup().querySelector('#status').value

    if (!nome || !equipamento|| !local|| !observacao|| !status) {
      Swal.showValidationMessage(`Por favor prencha todos os campos`)
    }
    return { nome: nome, equipamento: equipamento,local:local,observacao:observacao,status:status }
  }
}).then((result) => {
	    result=result
	    tipo="criar"
	    id="0"
   		$.ajax({url: 'api/data',
   			type: 'POST',
   			contentType: "application/json; charset=utf-8",
   			data: JSON.stringify({id:id,tipo:tipo,nome:result.value.nome,equipamento:result.value.equipamento,local:result.value.local,observacao:result.value.observacao,status:result.value.status})
    			       	,
    			       	dataType: 'json'
    			    })
   		$("#mainf").load("dash");
   		$("#mainf").load("dash");
   
}) }


function novousuario() {
  Swal.fire({
  title: 'Inserir nome no Autocomplete',
  html:'<input type="text" class="swal2-input" name="nome" placeholder="Nome" id="nome" value="">',
  confirmButtonText: 'Salvar',
  focusConfirm: false,
  preConfirm: () => {
    const nome= Swal.getPopup().querySelector('#nome').value
    if (!nome) {
      Swal.showValidationMessage(`Por favor prencha todos os campos`)
    }
    return { nome: nome }
  }
}).then((result) => {
	    result=result
	    tipo="newuser"
	    id="0"
   		$.ajax({url: 'api/data',
   			type: 'POST',
   			contentType: "application/json; charset=utf-8",
   			data: JSON.stringify({id:id,tipo:tipo,nome:result.value.nome})
    			       	,
    			       	dataType: 'json'
    			    })
   		$("#mainf").load("namelist");
   		$("#mainf").load("namelist");
   
}) }


$(document).ready(function(){
$("#mainf").load("dash");
$("#dashboard").on("click", function(){  $("#mainf").load("dash");   });
$("#funcionarios").on("click", function(){  $("#mainf").load("namelist");   });
$("#logout").on("click", function(){  window.location = 'logout'; });
$("#Inserir").on("click", function(){ novousuario(); });
$("#Adicionar").on("click", function(){ criar();  });



 $("#config").on("click", function(){  $("#mainf").load("config");   });
$('.apagar').click(function(){
    var id = $(this).attr('id');
    apagar(id);
});
$('.editar').click(function(){
    var id = $(this).attr('id');
    editar(id);
});
$('.napagar').click(function(){
    var id = $(this).attr('id');
    napagar(id);
});
$('.neditar').click(function(){
    var id = $(this).attr('id');
    neditar(id);
});




});