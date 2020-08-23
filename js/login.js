//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
	function validacion(event) {
		event.preventDefault();//Evita que se haga la petición al servidor enviando los datos
		nombreUsuario = document.getElementById('nombreUsuario').value;
		if (nombreUsuario != null || nombreUsuario !=0) {
			sessionStorage.setItem('logueado', 'true');//cambia el estado del usuario a logueado
			localStorage.setItem('nombreUsuario', nombreUsuario);//guarda en un local storage el nombre del usuario
			window.location.replace("index.html");//redirije al index.html
			return true;//hace que al final la información se envíe al servidor
		}
	} 
	document.getElementById('miFormulario').addEventListener('submit', validacion)
});