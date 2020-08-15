//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
	function validacion(event) {
		event.preventDefault();
		/*nombreUsuario = document.getElementById('nombreUsuario').value;*/
		/*console.log(document.getElementById('nombreUsuario').value);*/
		nombreUsuario = document.getElementById('nombreUsuario').value;
		if (nombreUsuario != null || nombreUsuario !=0) {
			sessionStorage.setItem('logueado', true);
			window.location.replace("index.html");
			return true;
		}
	} 
	document.getElementById('miFormulario').addEventListener('submit', validacion)
});