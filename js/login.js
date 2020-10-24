//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
	function validation(event) {
		event.preventDefault();//Evita que se haga la petición al servidor enviando los datos
		userName = document.getElementById('userName').value;
		if (userName != null || userName !=0) {
			sessionStorage.setItem('logged', 'true');//cambia el estado del usuario a logged
			sessionStorage.setItem('userName', userName);//guarda en un local storage el nombre del usuario
			window.location.replace("index.html");//redirije al index.html
			return true;//hace que al final la información se envíe al servidor
		}
	} 
	document.getElementById('miFormulario').addEventListener('submit', validation);
});