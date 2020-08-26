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

var pintarNombreUsuario = function(){
  var nombreUsuario = localStorage.getItem('nombreUsuario');
  console.log(nombreUsuario);
  document.getElementById("navegador").innerHTML += 
  `
  <button class="btn dropdown-toggle btn-outline-secondary mr-4 text-white" type="button" data-toggle="dropdown"
    aria-haspopup="true" aria-expanded="false" >` + nombreUsuario + `</button>

  <div class="dropdown-menu">
    <a class="dropdown-item" href="my-profile.html">Mi perfil</a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" href="#">Cerrar Sesión</a>
  </div>
  `;
}

var logueado = sessionStorage.getItem('logueado');//si el usuario no está logeado redirigir a login.html
if (!window.location.href.endsWith('login.html') && sessionStorage.getItem('logueado') !== 'true') {//Si no está en el login y no se ha logeado
  window.location.href = 'login.html'//redirigir a login.html
}else{//si está logueado llama al nombre del usuario y lo pinta en el NAV
  pintarNombreUsuario();  
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});