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

var logueado = sessionStorage.getItem("visitado");
if (!window.location.href.endsWith('login.html') && sessionStorage.getItem('logueado') !== 'true') {
  window.location.href = 'login.html'//redirigir a login.html
}
/*PARTE DEL CODIGO OK DE CLASE
if (logeado !=1) {
  window.location.href="login.html";
}*/
/*
var redireccionLogin = function(){
  window.location.href = "login.html";
}*/
/*var redireccionHome = function(){
  window.location.href = "index.html";
  /*let miEmail = getElementsByClassName('emailUsuario');
  localStorage.setItem('email', miEmail);*/
//}
/*function enviarFormulario(evento){
  evento.preventDefault();
  window.location.href = "index.html";
  /*let miEmail = getElementsByClassName('emailUsuario');
  localStorage.setItem('email', miEmail);*/
//}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  /*console.log(location.href);
  if (!location.href.endsWith("login.html")&&(logeado !=1)) {
    window.location.replace("login.html");
  }*/
});