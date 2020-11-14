//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let selectedProducts = [];
let shippingTax = 1.15;
let USD = 40;

function getCartItems(){
	let subTotal = 0;
	let productCartContainer = document.getElementById("cartInfo");
	for (let i = 0; i < cartData.length; i++) {
		let productCart = cartData[i];

		productCartImage = productCart.src;
		productCartName = productCart.name;
		productCartCount = productCart.count;
		productCartCost = productCart.unitCost;
		productCartCurrency = productCart.currency;
		productCartQuantityCost = productCart.count*productCart.unitCost;

		if (productCartCurrency === "USD") {
			productCartQuantityCostUSD = productCartQuantityCost*USD;
		}else{
			productCartQuantityCostUSD = productCart.count*productCart.unitCost;
		}

		subTotal += productCartQuantityCostUSD;
		subTotalFormat = new Intl.NumberFormat("de-DE").format(subTotal);
		total = subTotal*shippingTax;
		totalFormat = new Intl.NumberFormat("de-DE").format(total);

		productCartContainer.innerHTML += `
	    <tr id="productcard`+i+`">
	      <td class="align-middle">
	        <img id="productImage`+i+`" src="`+productCartImage+`" class="cartImage">
	        <span name="purchasedProduct" id="productName`+i+`">`+productCartName+`</span>
	      </td>
	      <td class="align-middle">
	      	<input type="number" name="quantityPurchasedProduct" class="form-control" value="`+productCartCount+`" id="productCount`+i+`" onchange="selectedItems(event)"></input>
	      </td>
	      <td class="align-middle">
	        <span id="productCost`+i+`">`+productCartCost+` </span>
	        <span id="productCurrency`+i+`">`+productCartCurrency+`</span>
	      </td>
	      <td class="align-middle">
	        <span id="productCartQuantityCost`+i+`">`+productCartQuantityCost+` </span>
	        <span id="productQuantityCurrency`+i+`">`+productCartCurrency+`</span>
	      </td>
	      <td>
			<button type="button" class="close" aria-label="Close" id="deleteButton`+i+`">
			  <span aria-hidden="true">×</span>
			</button>
	      </td>
	    </tr>
		`;
		document.getElementById("subtotal").innerHTML = `Subtotal: $ `+subTotalFormat;
		document.getElementById("total").innerHTML = `Precio Total: $ `+totalFormat;	
	}

	for (let i = 0; i < cartData.length; i++) {

		let deleteButton = document.getElementById('deleteButton'+i);
		deleteButton.addEventListener('click', function(){
			cartData.splice(i, 1);
		

			if (cartData[0].currency === "USD") {
				productCartQuantityCostUSD = cartData[0].count*cartData[0].unitCost*USD;
			}else{
				productCartQuantityCostUSD = cartData[0].count*cartData[0].unitCost;
			}

			subTotal = productCartQuantityCostUSD;
			subTotalFormat = new Intl.NumberFormat("de-DE").format(subTotal);
			total = subTotal*shippingTax;
			totalFormat = new Intl.NumberFormat("de-DE").format(total);

			productCartContainer.innerHTML = `
	        <tr id="productcard`+i+`">
	          <td class="align-middle">
	            <img id="productImage`+i+`" src="`+cartData[0].src+`" class="cartImage">
	            <span name="purchasedProduct" id="productName`+i+`">`+cartData[0].name+`</span>
	          </td>
	          <td class="align-middle">
	          	<input type="number" name="quantityPurchasedProduct" class="form-control" value="`+cartData[0].count+`" id="productCount`+i+`" onchange="selectedItems(event)"></input>
	          </td>
	          <td class="align-middle">
	            <span id="productCost`+i+`">`+cartData[0].unitCost+` </span>
	            <span id="productCurrency`+i+`">`+cartData[0].currency+`</span>
	          </td>
	          <td class="align-middle">
	            <span id="productCartQuantityCost`+i+`">`+cartData[0].count*cartData[0].unitCost+` </span>
	            <span id="productQuantityCurrency`+i+`">`+cartData[0].currency+`</span>
	          </td>
	          <td>
				<button type="button" class="close" aria-label="Close" id="deleteButton`+i+`">
				  <span aria-hidden="true">×</span>
				</button>
	          </td>
	        </tr>
			`;
			document.getElementById("subtotal").innerHTML = `Subtotal: $ `+subTotalFormat;
			document.getElementById("total").innerHTML = `Precio Total: $ `+totalFormat;
		});
	}
}

function selectedItems(event){
    var productCartQuantityCostUSD1 = 0
    var productCartQuantityCostUSD2 = 0
    for (let i = 0; i < cartData.length; i++) {
        let selectedArticles = cartData[i];
        
        var selectedArticle = document.getElementById("productCount" + i).value;
			let productCartQuantityCost = selectedArticle*selectedArticles.unitCost;
        for (let i = 0; i < cartData.length; i++) {
            let article = cartData[i];
            
            if (article.currency === "USD") {
                productCartQuantityCostUSD1 = article.unitCost * document.getElementById("productCount" + i).value * 40;
            } else {
                productCartQuantityCostUSD2 = article.unitCost * document.getElementById("productCount" + i).value;
            }
            subTotal = productCartQuantityCostUSD1 + productCartQuantityCostUSD2;
        }
        subTotalFormat = new Intl.NumberFormat("de-DE").format(subTotal);
        total = subTotal*shippingTax;
        totalFormat = new Intl.NumberFormat("de-DE").format(total);
		document.getElementById("subtotal").innerHTML = `Subtotal: $ `+subTotalFormat;
		document.getElementById("total").innerHTML = `Precio Total: $ `+totalFormat;
		document.getElementById("productCartQuantityCost"+i).innerHTML = productCartQuantityCost;
    }
}

function premiumTax(event){
	event.preventDefault();
	shippingTax = 1.15;
	selectedItems(event);
}

function expressTax(event){
	event.preventDefault();
	shippingTax = 1.07;
	selectedItems(event);
}

function standardTax(event){
	event.preventDefault();
	shippingTax = 1.05;
	selectedItems(event);
}

function creditCardPayment(event){
	event.preventDefault();
	let creditCardContainer = document.getElementById("creditCardContainer");
	let htmlContentToAppend = "";
	htmlContentToAppend = `
    <div class="row">
      
      <div class="col">
        <span>Número de tarjeta:</span>
      </div>
    </div>
    <div class="row pb-4">
      <div class="col">
        <input type="text" class="form-control" form="shippingForm" placeholder="0000 0000 0000 0000" name="userCard" id="userCard" pattern="5[1-5][0-9]{14}$" required>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <span>Caducidad:</span>
      </div>
    </div>
    <div class="row pb-4">
      <div class="col">
        <input type="text" class="form-control" form="shippingForm" placeholder="mm" name="userCardMonth" id="userCardMonth" pattern="^(?:0?[0-9]|1[0-2])" required>
      </div>
      <div class="col">
        <input type="text" class="form-control" form="shippingForm" placeholder="aaaa" name="userCardYear" id="userCardYear" pattern="^[20]+[0-9]{2}" required>
      </div>
    </div>
    <div class="row">
      
      <div class="col">
        <span>Código de seguridad:</span>
      </div>
    </div>
    <div class="row pb-4">
      
      <div class="col">
        <input type="text" class="form-control" form="shippingForm" placeholder="000" name="userCardCode" id="userCardCode" pattern="^[0-9]{3}" required>
      </div>
    </div>
    <div class="row pb-4">
      
      <div class="col">
        <button class="my-4 btn-block customButton" form="shippingForm" type="submit" id="creditButton">Continuar</button>
      </div>
    </div>
	`;
	creditCardContainer.innerHTML = htmlContentToAppend;
}

function transferPayment(event){
	event.preventDefault();
	let transferContainer = document.getElementById("transferContainer");
	let htmlContentToAppend = "";
	htmlContentToAppend = `
    <div class="row">
      
      <div class="col">
        <span>Nombre o razón social:</span>
      </div>
    </div>
    <div class="row pb-4">
      <div class="col">
        <input type="text" class="form-control" placeholder="Ej: María Gómez" form="shippingForm" name="userBusinessName" id="userBusinessName" required>
      </div>
    </div>
    <div class="row">
      
      <div class="col">
        <span>Cuenta de origen:</span>
      </div>
    </div>
    <div class="row pb-4">
      <div class="col">
        <input type="text" class="form-control" placeholder="0000 0000 0000 0000 0000" form="shippingForm" pattern="(^[A-Z a-z]{2}|[0-9]{2})+[0-9]{22}" name="userSourceAccount" id="userSourceAccount" required>
      </div>
    </div>
    <div class="row pb-4">
      
      <div class="col">
        <button class="my-4 btn-block customButton" form="shippingForm" type="submit" id="transferButton">Continuar</button>
      </div>
    </div>
	`;
	transferContainer.innerHTML = htmlContentToAppend;
}

function formModalValidation(event){
	event.preventDefault();
	var message = document.getElementById("incompleteData");

	var creditButton = document.getElementById("creditButton");
	sessionStorage.setItem('complete', 'true');
}

function formBuyValidation(event){
	event.preventDefault();
	var sendButton = document.getElementById('sendShippingInfo');
	var message = document.getElementById("incompleteData");

	var buySession = sessionStorage.getItem('complete');

	if (buySession === 'true') {
		sessionStorage.setItem('complete', 'false');
		return true;
	}else{
		message.innerHTML = `Por favor, complete todos los campos correctamente`;
		return false;
	}

}

document.addEventListener("DOMContentLoaded", function(e){
	getJSONData('https://japdevdep.github.io/ecommerce-api/cart/654.json')
	.then(function(response){
		if (response.status = "ok"){
			cartData = response.data.articles;
			
			getCartItems();
		}
	});
});
