//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var productObj = [];
var infoObj = [];
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
	var nombreAuto = vars[0];
	var variableAuto = vars[1];

	if (nombreAuto == variable){
		return variableAuto;
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
/*
function imagenCarrusel(){
	htmlContentToAppend = "";
	for(i = 0; i < infoObj.images.length; i++){
		var imagen = infoObj.images[i];
		htmlContentToAppend += `
        <div id="carousel-example-1z" class="carousel slide carousel-fade" data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#carousel-example-1z" data-slide-to="0" class="active"></li>
            <li data-target="#carousel-example-1z" data-slide-to="1"></li>
            <li data-target="#carousel-example-1z" data-slide-to="2"></li>
            <li data-target="#carousel-example-1z" data-slide-to="3"></li>
            <li data-target="#carousel-example-1z" data-slide-to="4"></li>
          </ol>
          <div class="carousel-inner" role="listbox">
            <div class="carousel-item active">
              <img class="d-block w-100" src="`+imagen+`" alt="First slide">
            </div>
            <div class="carousel-item">
              <img class="d-block w-100" src="img/prod1_1.jpg" alt="First slide">
            </div>
            <div class="carousel-item">
              <img class="d-block w-100" src="img/prod1_2.jpg" alt="First slide">
            </div>
            <div class="carousel-item">
              <img class="d-block w-100" src="img/prod1_3.jpg" alt="First slide">
            </div>
            <div class="carousel-item">
              <img class="d-block w-100" src="img/prod1_4.jpg" alt="First slide">
            </div>
          </div>
          <a class="carousel-control-prev" href="#carousel-example-1z" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carousel-example-1z" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
		`;
	}
	document.getElementById("slide-container").innerHTML = htmlContentToAppend;
}
*/
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
	//imagenCarrusel();
}

function pintarProductosRelacionados(array, productosRelacionados){
	let htmlContentToAppend = ""
	for (let i = 0; i < productosRelacionados.length; i++) {
		let productoRel = array[productosRelacionados[i]];
		htmlContentToAppend += `
		<div class="col-lg-6 card">
	        <a href="product-info.html?nombre=` + productoRel.name + `" style="color: black; text-decoration: none;">
	          	<div class="view overlay">
	            	<img class="card-img-top" src="`+productoRel.imgSrc+`"
	              alt="` + productoRel.description + `">
	          	</div>
	          	<div class="card-body">
	            	<h4 class="card-title">`+productoRel.name+`</h4>
	            	<p class="card-text">`+productoRel.description+`</p>
	            	<small class="text-muted">` + productoRel.cost + ` USD</small>
	            	<a href="product-info.html?nombre=` + productoRel.name + `" class="btn btn-info btn-block">Ver producto</a>
	          	</div>
	        </div>
        </div>
		`;
	}
	document.getElementById('container-productosRelacionados').innerHTML = htmlContentToAppend;
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
	let nombreUsuario = sessionStorage.getItem('nombreUsuario');
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
	getJSONData(PRODUCT_INFO_URL)
	.then(function(response){
		if (response.status = "ok"){
			infoObj = response.data;
			pintarProducto();
//la funcion recibe 2 param showRelated(arrayRelated, )
//showRelated(arrayRelated, productosRelacionados)
			getJSONData(PRODUCTS_URL).then(function(response){
				if (response.status = "ok") {
					relatedData = response.data;
					pintarProductosRelacionados(relatedData, infoObj.relatedProducts);
				}
			});
		}
	});

});