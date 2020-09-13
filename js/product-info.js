//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var productObj = [];
var infoObj = [];
var productos = [];
var url = window.location.search;
var decodeUrl = decodeURI(url);

function createNode(element) {

 return document.createElement(element);
};

function append(parent, el){

    return parent.appendChild(el);
};

function getQueryVariable(variable){
	var query = decodeUrl.substring(1);
	var vars = query.split("=");
	for (let i = 0; i < vars.length; i++) {
		var nombreAuto = vars[0];
		var variableAuto = vars[1];

		if (nombreAuto == variable){
			return variableAuto;
		}

	}
	return false;
}

let nombreUrl = getQueryVariable("nombre");



function productoImagen(){
	htmlContentToAppend = "";
	for(i = 0; i < infoObj.images.length; i++){
		var imagen = infoObj.images[i];
		htmlContentToAppend += `
	        <img class="border" src="`+imagen+`" style="width: 100%; padding: 5%;">
		`
	}
	document.getElementById("image-container").innerHTML = htmlContentToAppend;
}

function pintarProducto(){
	var nombreProducto = document.getElementById("nombreProducto");
	var categoriaProducto = document.getElementById("categoriaProducto");
	var descripcionProducto = document.getElementById("descripcionProducto");
	var precioProducto = document.getElementById("precioProducto");
	nombreProducto.innerHTML = nombreUrl;
	categoriaProducto.innerHTML = infoObj.category;
	descripcionProducto.innerHTML = infoObj.description;
	precioProducto.innerHTML = infoObj.cost;
	productoImagen();
	document.getElementById("image-container").innerHTML = htmlContentToAppend;
}

function pintarComentarios(){
	htmlContentToAppend = "";
	for(var i = 0; i < productObj.length; i++){
		var comment = productObj[i];
		let valoracion = comment.score;
		let comentario = comment.description;
		let container = document.getElementById("comentariosJson");
		let nombreUsuario = comment.user;
		let fechaComentario = comment.dateTime;
		htmlContentToAppend = `
		<div style="padding-bottom: 10%;">
			<div class="score_valoracion">
			  <span>Valoración: `+valoracion+`</span>
			  <span class="fa fa-star"></span>
			  <span class="fa fa-star"></span>
			  <span class="fa fa-star"></span>
			  <span class="fa fa-star"></span>
			  <span class="fa fa-star"></span>   
			</div>
			<div class="valoracion text-justify">
			  <p class="descripcion_valoracion">`+comentario+`</p>
			  <p class="usuario-valoracion">Usuario: `+nombreUsuario+`</p>
			  <small>Fecha de publicación: `+fechaComentario+`</small>
			</div>
		</div>
		`
		let elementoComentario = createNode('div');
		elementoComentario.innerHTML += htmlContentToAppend;

		var estrellas = elementoComentario.getElementsByClassName('fa-star');

		for (let i = 0; i < valoracion; i++) {
			estrellas[i].classList.add('checked');
		}
		append(container, elementoComentario);
	}
}

function nuevoComentario(event){
	event.preventDefault();
	let valoracion = document.getElementById("score").value;
	let comentario = document.getElementById("textoComentario").value;
	let container = document.getElementById("nuevoComentario");
	let nombreUsuario = localStorage.getItem('nombreUsuario');
	let today = new Date();
	let fechaActual = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	let horaActual = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	let fechaComentario = fechaActual+` `+horaActual;
	htmlContentToAppend = `
	<div style="padding-bottom: 10%;">
		<div class="score_valoracion">
		  <span>Valoración: `+valoracion+`</span>
		  <span class="fa fa-star"></span>
		  <span class="fa fa-star"></span>
		  <span class="fa fa-star"></span>
		  <span class="fa fa-star"></span>
		  <span class="fa fa-star"></span>   
		</div>
		<div class="valoracion text-justify">
		  <p class="descripcion_valoracion">`+comentario+`</p>
		  <p class="usuario-valoracion">Usuario: `+nombreUsuario+`</p>
		  <small>Fecha de publicación: `+fechaComentario+`</small>
		</div>
	</div>
	`
	let elementoComentario = createNode('div');
	elementoComentario.innerHTML += htmlContentToAppend;

	var estrellas = elementoComentario.getElementsByClassName('fa-star');

	for (var i = 0; i < valoracion; i++) {
		estrellas[i].classList.add('checked');
	}
	append(container, elementoComentario);
}

document.addEventListener("DOMContentLoaded", function(e){
	getJSONData(PRODUCT_INFO_COMMENTS_URL)
	.then(function(response){
		if (response.status = "ok"){
			productObj = response.data;
			pintarComentarios(productObj);
		}
	});
	getJSONData(PRODUCT_INFO_URL+window.location.search)
	.then(function(response){
		if (response.status = "ok"){
			infoObj = response.data;
			pintarProducto();
		}
	});

});