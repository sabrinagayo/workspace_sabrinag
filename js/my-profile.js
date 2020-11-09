//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function userDataForm(event){
	event.preventDefault();
	let formDataContainter = document.getElementById("formDataContainter");
	//let userData =JSON.parse(localStorage.getItem('user'));


	formDataContainter.innerHTML = `
    <form name="userDataForm" method="GET" action="" onsubmit="saveUserData(event)">
      <div class="card">

        <!-- Card content -->
        <div class="card-body">

          <!-- Title -->
          <h4 class="card-title text-center">Datos del usuario</h4>
          <!-- Text -->

            <div class="row">
              <div class="col text-center">
                <small>Los campos marcados con (*) son obligatorios.</small>
              </div>
            </div>
            <div class="row py-4">

              <div class="col">
                <input type="text" class="form-control" placeholder="Nombre*" id="userNameData" name="userNameData" required>
              </div>

            </div>

            <div class="row pb-4">

              <div class="col">
                <input type="text" class="form-control" placeholder="Apellido/s*" id="userLastNameData" name="userLastNameData" required>
              </div>

            </div>

            <div class="row pb-4">
              <div class="col">
                <input type="text" class="form-control" placeholder="Celular*" id="userPhoneData" name="userPhoneData" pattern="(^[0]+[0-9]{8})|(^[9]+[0-9]{7})" required>
              </div>
			      </div>

            <div class="row pb-4">
              <div class="col">
                <input type="email" class="form-control" placeholder="Email*" id="userEmailData" name="userEmailData" required>
              </div>
			      </div>

			      <div class="row pb-4">
              <div class="col">
                <input type="number" class="form-control" placeholder="Edad*" id="userAgeData" name="userAgeData" maxlength="2" min="18" max="99" required>
              </div>
            </div>

            <div class="row pb-4">

              <div class="col" id="incompleteData"></div>

            </div>

            <button class="my-4 btn-block customButton" id="sendUserInfo" type="submit">Guardar</button>

        </div>

      </div>
    </form>
	`;

}


function saveUserData(event){

	let userName = document.getElementById('userNameData').value;
	let userLastName = document.getElementById('userLastNameData').value;
	let userPhoneData = document.getElementById('userPhoneData').value;
	let userEmailData = document.getElementById('userEmailData').value;
	let userAgeData = document.getElementById('userAgeData').value;

	var user = {
		'name': userName,
		'lastName': userLastName,
		'phone': userPhoneData,
		'email': userEmailData,
		'age': userAgeData
	}

	localStorage.setItem('user', JSON.stringify(user));
}

function paintUserData(){
  let userData =JSON.parse(localStorage.getItem('user'));
  let nameContainer = document.getElementById('nameContainer');
  let lastNameContainer = document.getElementById('lastNameContainer');
  let phoneContainer = document.getElementById('phoneContainer');
  let emailContainer = document.getElementById('emailContainer');
  let ageContainer = document.getElementById('ageContainer');

  nameContainer.innerHTML = userData.name;
  lastNameContainer.innerHTML = userData.lastName;
  phoneContainer.innerHTML = userData.phone;
  emailContainer.innerHTML = userData.email;
  ageContainer.innerHTML = userData.age;
}

document.querySelector("#profilePicture").addEventListener("change", function () {
  
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        localStorage.setItem("recent-image", reader.result);
    });
    reader.readAsDataURL(this.files[0]);
    window.location.reload();

});

document.addEventListener("DOMContentLoaded", function (e) {
  
  const recentImageDataURL = localStorage.getItem("recent-image");
  if (recentImageDataURL) {
      document.querySelector("#defaultImage").setAttribute("src", recentImageDataURL);
  }

  paintUserData();

});