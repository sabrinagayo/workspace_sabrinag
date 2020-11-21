const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

var getUserName = function(){
  var userName = sessionStorage.getItem('userName');
  document.getElementById("navegador").innerHTML += 
  `
  <button class="btn dropdown-toggle navButton p-0 px-2 btn-outline-secondary text-white" type="button" data-toggle="dropdown"
    aria-haspopup="true" aria-expanded="false" >` + userName + `</button>

  <div class="dropdown-menu">
    <a class="dropdown-item" href="cart.html">Mi carrito</a>
    <a class="dropdown-item" href="my-profile.html">Mi perfil</a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" href="#" onclick="logOut(event)">Cerrar Sesión</a>
  </div>
  `;
}
function logOut(event){
  event.preventDefault();
  sessionStorage.removeItem('logged');
  sessionStorage.removeItem('userName');
  window.location.href = 'login.html';
}

var logged = sessionStorage.getItem('logged');//si el usuario no está logeado redirigir a login.html
if (!window.location.href.endsWith('login.html') && sessionStorage.getItem('logged') !== 'true') {//Si no está en el login y no se ha logeado
  window.location.href = 'login.html'//redirigir a login.html
}else{//si está logged llama al nombre del usuario y lo pinta en el NAV
  getUserName();  
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});