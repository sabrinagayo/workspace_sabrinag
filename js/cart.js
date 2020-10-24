//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let selectedProducts = [];
let shippingTax = 1.15;
let USD = 40;

function getCartItems(data){
	htmlContentToAppend = "";
	let subTotal = 0;
	let productCartContainer = document.getElementById("cartInfo");
	for (let i = 0; i < data.length; i++) {
		let productCart = data[i];

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

		htmlContentToAppend += `
        <tr id="productcard`+i+`">
          <td class="align-middle">
            <img id="productImage`+i+`" src="`+productCartImage+`" style="width: 20%;">
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
			<button type="button" class="close" aria-label="Close" id="deleteButton`+i+`" onclick="deleteProduct(event);">
			  <span aria-hidden="true">×</span>
			</button>
          </td>
        </tr>
		`;
		document.getElementById("subtotal").innerHTML = `Subtotal: $ `+subTotalFormat;
		document.getElementById("total").innerHTML = `Precio Total: $ `+totalFormat;
	}
	productCartContainer.innerHTML = htmlContentToAppend;

}
function selectedItems(event){
	event.preventDefault();
	let subTotal = 0;
	for (let i = 0; i < cartData.length; i++) {
		let productCart = cartData[i];
		
		selectedProducts[i] = document.getElementById("productCount"+i).value;
		productCartQuantityCost = selectedProducts[i]*productCart.unitCost;
		productCartCurrency = productCart.currency;

		if (productCartCurrency === "USD") {
			productCartQuantityCostUSD = productCartQuantityCost*USD;
		}else{
			productCartQuantityCostUSD = productCartQuantityCost;
		}

		subTotal += productCartQuantityCostUSD;
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

function deleteProduct(event){
	htmlContentToAppend = "";
	let subTotal = 0;
	let productCartContainer = document.getElementById("cartInfo");

	for (let i = 0; i < cartData.length; i++) {
		

		let selectedDelete = document.getElementById("deleteButton"+i);
		
	
		cartData.splice(i, 1);
		productCartQuantityCost = cartData[i].count*cartData[i].unitCost;

		if (productCartCurrency === "USD") {
			productCartQuantityCostUSD = cartData[i].unitCost*cartData[i].count*USD;
		}else{
			productCartQuantityCostUSD = cartData[i].unitCost*cartData[i].count;
		}
		subTotal += productCartQuantityCostUSD;
		subTotalFormat = new Intl.NumberFormat("de-DE").format(subTotal);
		total = subTotal*shippingTax;
		totalFormat = new Intl.NumberFormat("de-DE").format(total);

		htmlContentToAppend += `
        <tr id="productcard`+i+`">
          <td class="align-middle">
            <img id="productImage`+i+`" src="`+cartData[i].src+`" style="width: 20%;">
            <span name="purchasedProduct" id="productName`+i+`">`+cartData[i].name+`</span>
          </td>
          <td class="align-middle">
          	<input type="number" name="quantityPurchasedProduct" class="form-control" value="`+productCartCount+`" id="productCount`+i+`" onchange="selectedItems(event)"></input>
          </td>
          <td class="align-middle">
            <span id="productCost`+i+`">`+cartData[i].unitCost+` </span>
            <span id="productCurrency`+i+`">`+cartData[i].currency+`</span>
          </td>
          <td class="align-middle">
            <span id="productCartQuantityCost`+i+`">`+productCartQuantityCost+` </span>
            <span id="productQuantityCurrency`+i+`">`+cartData[i].currency+`</span>
          </td>
          <td>
			<button type="button" class="close" aria-label="Close" id="deleteButton`+i+`" onclick="deleteProduct(event);">
			  <span aria-hidden="true">×</span>
			</button>
          </td>
        </tr>
		`;
		document.getElementById("subtotal").innerHTML = `Subtotal: $ `+subTotalFormat;
		document.getElementById("total").innerHTML = `Precio Total: $ `+totalFormat;
	}
	productCartContainer.innerHTML = htmlContentToAppend;


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

    <div class="col" id="incompleteData""></div>

    </div>

    <div class="row pb-4">
      
      <div class="col">
        <button class="my-4 btn-block buyButton" form="shippingForm" type="submit" id="creditButton">Continuar</button>
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
        <button class="my-4 btn-block buyButton" form="shippingForm" type="submit" id="transferButton">Continuar</button>
      </div>

    </div>
	`;
	transferContainer.innerHTML = htmlContentToAppend;
}


document.addEventListener("DOMContentLoaded", function(e){
	getJSONData('https://japdevdep.github.io/ecommerce-api/cart/654.json')
	.then(function(response){
		if (response.status = "ok"){
			cartData = response.data.articles;
			getCartItems(cartData);
		}
	});
});