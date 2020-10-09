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
			productCartQuantityCostUSD = productCart.count*productCart.unitCost*USD;
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
            <span id="productName`+i+`">`+productCartName+`</span>
          </td>
          <td class="align-middle">
          	<input type="number" class="form-control" value="`+productCartCount+`" id="productCount`+i+`" onchange="selectedItems(event)" ></input>
          </td>
          <td class="align-middle">
            <span id="productCost`+i+`">`+productCartCost+` </span>
            <span id="productCurrency`+i+`">`+productCartCurrency+`</span>
          </td>
          <td class="align-middle">
            <span id="productCartQuantityCost`+i+`">`+productCartQuantityCost+` </span>
            <span id="productQuantityCurrency`+i+`">`+productCartCurrency+`</span>
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
			productCartQuantityCostUSD = selectedProducts[i]*productCart.unitCost*USD;
		}else{
			productCartQuantityCostUSD = selectedProducts[i]*productCart.unitCost;
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

document.addEventListener("DOMContentLoaded", function(e){
	getJSONData('https://japdevdep.github.io/ecommerce-api/cart/654.json')
	.then(function(response){
		if (response.status = "ok"){
			cartData = response.data.articles;
			getCartItems(cartData);

			document.getElementById("premiumradio").addEventListener("change", function(){
			    shippingTax = 1.15;
			    getCartItems(cartData);
			    selectedItems();
			});
			document.getElementById("expressradio").addEventListener("change", function(){
			    shippingTax = 1.07;
			    getCartItems(cartData);
			    selectedItems();
			});
			document.getElementById("standardradio").addEventListener("change", function(){
			    shippingTax = 1.05;
			    getCartItems(cartData);
			    selectedItems();
			});

		}
	});
});