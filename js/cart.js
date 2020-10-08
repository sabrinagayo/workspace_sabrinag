//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let selectedProducts = [];
let tipoEnvio = 1.15;
let USD = 40;

function getCartItems(data){
	htmlContentToAppend = "";
	var subTotal = 0;
	let productCartContainer = document.getElementById("cartInfo");
	for (var i = 0; i < data.length; i++) {
		let productCart = data[i];
		productCartImage = productCart.src;
		productCartName = productCart.name;
		productCartCount = productCart.count;
		productCartCost = productCart.unitCost;
		productCartCurrency = productCart.currency;
		productCartQuantityCost = productCart.count*productCart.unitCost;

		if (productCartCurrency === "USD") {
			productCartQuantityCostUSD = productCart.count*productCart.unitCost*USD;
		}else{
			productCartQuantityCostUSD = productCart.count*productCart.unitCost;
		}
		subTotal += productCartQuantityCostUSD;
		total = subTotal*tipoEnvio;
		document.getElementById("subtotal").innerHTML = `Subtotal de la compra: `+subTotal+` UYU`;
		document.getElementById("total").innerHTML = `Precio total de la compra: `+total.toFixed(0)+` UYU`;
		htmlContentToAppend += `
	    <div class="row border p-4" id="productOne">
	      <div class="col-3">
	        <img class="w-100" src="`+productCartImage+`">
	      </div>
	      <div class="col-9">
	        <h1 id="productName">`+productCartName+`</h1>
	        <small>Cantidad:</small>
	        <input type="number" value="`+productCartCount+`" id="productCount`+i+`" onchange="selector(event)"></input>
	        <br>
	        <span id="productCost">Precio unitario: `+productCartCost+` </span>
	        <span id="productCurrency">`+productCartCurrency+`</span>
	        <br>
	        <span id="productCartQuantityCost`+i+`">Precio de `+productCartCount+` articulo/s: `+productCartQuantityCost+` </span>
	        <span id="productQuantityCurrency">`+productCartCurrency+`</span>
	      </div>
	    </div>
		`;

	}
	productCartContainer.innerHTML = htmlContentToAppend;

}
function selector(event){
	event.preventDefault();
	var subTotal = 0;
	for (var i = 0; i < cartData.length; i++) {
		productCart = cartData[i];
		selectedProducts[i] = document.getElementById("productCount"+i).value;
		productCartQuantityCost = selectedProducts[i]*productCart.unitCost;
		productCartCurrency = productCart.currency;
		if (productCartCurrency === "USD") {
			productCartQuantityCostUSD = selectedProducts[i]*productCart.unitCost*USD;
		}else{
			productCartQuantityCostUSD = selectedProducts[i]*productCart.unitCost;
		}
		subTotal += productCartQuantityCostUSD;
		total = subTotal*tipoEnvio;
		document.getElementById("subtotal").innerHTML = `Subtotal de la compra: `+subTotal+` UYU`;
		document.getElementById("total").innerHTML = `Precio total de la compra: `+total.toFixed(0)+` UYU`;
		document.getElementById("productCartQuantityCost"+i).innerHTML = `Precio de `+selectedProducts[i]+` articulo/s: `+productCartQuantityCost;
	}
	
}

document.addEventListener("DOMContentLoaded", function(e){
	getJSONData('https://japdevdep.github.io/ecommerce-api/cart/654.json')
	.then(function(response){
		if (response.status = "ok"){
			cartData = response.data.articles;
			getCartItems(cartData);

			document.getElementById("premiumradio").addEventListener("change", function(){
			    tipoEnvio = 1.15;
			    getCartItems(cartData);
			    selector();
			});
			document.getElementById("expressradio").addEventListener("change", function(){
			    tipoEnvio = 1.07;
			    getCartItems(cartData);
			    selector();
			});
			document.getElementById("standardradio").addEventListener("change", function(){
			    tipoEnvio = 1.05;
			    getCartItems(cartData);
			    selector();
			});

		}
	});
});