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
	var carName = vars[0];
	var carVar = vars[1];

	if (carName == variable){
		return carVar;
	}

	return false;
}

let urlName = getQueryVariable("nombre");


function carouselImage(array){
	htmlContentToAppend = "";
	htmlContentToAppend2 = "";
	htmlContentToAppend3 = "";
	for(i = 0; i < array.length; i++){
		var image = array[i];
		var activeImage = array[0];
		htmlContentToAppend2 = `
		<img class="border w-100" src="`+image+`">
		`;
		if (i>0) {
			htmlContentToAppend3 = `
			<li data-target="#carousel-example-1z" data-slide-to="`+i+`"></li>
			`;
			htmlContentToAppend = `
	        <div class="carousel-item">
	          <img class="d-block w-100" src="`+image+`" alt="Second slide">
	        </div>
			`;
		}else{
			htmlContentToAppend3 = `
			<li data-target="#carousel-example-1z" data-slide-to="`+i+`" class="active"></li>
			`;
			htmlContentToAppend = `
	        <div class="carousel-item active">
	          <img class="d-block w-100" src="`+activeImage+`" alt="Second slide">
	        </div>
			`;
		}
		document.getElementById("liImages").innerHTML += htmlContentToAppend3;
		document.getElementById("slide-container").innerHTML += htmlContentToAppend;
		document.getElementById("image-container").innerHTML += htmlContentToAppend2;
	}
}

function getProduct(){
	var productName = document.getElementById("nombreProducto");
	var productCategory = document.getElementById("categoriaProducto");
	var productDescription = document.getElementById("descripcionProducto");
	var productPrice = document.getElementById("precioProducto");
	productName.innerHTML = urlName;
	productCategory.innerHTML = infoObj.category;
	productDescription.innerHTML = infoObj.description;
	productPrice.innerHTML = infoObj.cost;
	carouselImage(infoObj.images);
}

function getRelatedProducts(array, relatedProducts){
	let htmlContentToAppend = ""
	for (let i = 0; i < relatedProducts.length; i++) {
		let relatedProduct = array[relatedProducts[i]];
		htmlContentToAppend += `
		<div class="col-lg-6 card">
	        <a href="product-info.html?nombre=` + relatedProduct.name + `" class="text-dark productInfoLink">
	          	<div class="view overlay">
	            	<img class="card-img-top" src="`+relatedProduct.imgSrc+`"
	              alt="` + relatedProduct.description + `">
	          	</div>
	          	<div class="card-body">
	            	<h4 class="card-title">`+relatedProduct.name+`</h4>
	            	<p class="card-text">`+relatedProduct.description+`</p>
	            	<small class="text-muted">` + relatedProduct.cost + ` USD</small>
	            	<a href="product-info.html?nombre=` + relatedProduct.name + `" class="btn customButton my-3 btn-block">Ver producto</a>
	          	</div>
	        </div>
        </div>
		`;
	}
	document.getElementById('container-productosRelacionados').innerHTML = htmlContentToAppend;
}

function getComments(){
	htmlContentToAppend = "";
	for(var i = 0; i < productObj.length; i++){
		var comment = productObj[i];
		let score = comment.score;
		let commentDescription = comment.description;
		let container = document.getElementById("comentariosJson");
		let userName = comment.user;
		let commentDate = comment.dateTime;
		htmlContentToAppend = `
		<div class="pb-5">
			<div class="score_valoracion">
			  <span>Valoración: `+score+`</span>
			  <span class="fa fa-star"></span>
			  <span class="fa fa-star"></span>
			  <span class="fa fa-star"></span>
			  <span class="fa fa-star"></span>
			  <span class="fa fa-star"></span>   
			</div>
			<div class="valoracion text-justify">
			  <p class="descripcion_valoracion">`+commentDescription+`</p>
			  <p class="usuario-valoracion">Usuario: `+userName+`</p>
			  <small>Fecha de publicación: `+commentDate+`</small>
			</div>
		</div>
		`
		let commentElement = createNode('div');
		commentElement.innerHTML += htmlContentToAppend;

		var stars = commentElement.getElementsByClassName('fa-star');

		for (let i = 0; i < score; i++) {
			stars[i].classList.add('checked');
		}
		append(container, commentElement);
	}
}

function newComment(event){
	event.preventDefault();
	let score = document.getElementById("score").value;
	let comment = document.getElementById("commentText").value;
	let container = document.getElementById("newComment");
	let userName = sessionStorage.getItem('userName');
	let today = new Date();
	let currentDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	let currentTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	let commentDate = currentDate+` `+currentTime;
	htmlContentToAppend = `
	<div class="pb-5">
		<div class="score_valoracion">
		  <span>Valoración: `+score+`</span>
		  <span class="fa fa-star"></span>
		  <span class="fa fa-star"></span>
		  <span class="fa fa-star"></span>
		  <span class="fa fa-star"></span>
		  <span class="fa fa-star"></span>   
		</div>
		<div class="valoracion text-justify">
		  <p class="descripcion_valoracion">`+comment+`</p>
		  <p class="usuario-valoracion">Usuario: `+userName+`</p>
		  <small>Fecha de publicación: `+commentDate+`</small>
		</div>
	</div>
	`
	let commentElement = createNode('div');
	commentElement.innerHTML += htmlContentToAppend;

	var stars = commentElement.getElementsByClassName('fa-star');

	for (var i = 0; i < score; i++) {
		stars[i].classList.add('checked');
	}
	append(container, commentElement);
}

document.addEventListener("DOMContentLoaded", function(e){
	getJSONData(PRODUCT_INFO_COMMENTS_URL)
	.then(function(response){
		if (response.status = "ok"){
			productObj = response.data;
			getComments(productObj);
		}
	});
	getJSONData(PRODUCT_INFO_URL)
	.then(function(response){
		if (response.status = "ok"){
			infoObj = response.data;
			getProduct();
			getJSONData(PRODUCTS_URL).then(function(response){
				if (response.status = "ok") {
					relatedData = response.data;
					getRelatedProducts(relatedData, infoObj.relatedProducts);
				}
			});
		}
	});

});