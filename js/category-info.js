var category = {};

function showImagesGallery(array){
    htmlContentToAppend = "";
    htmlContentToAppend2 = "";
    htmlContentToAppend3 = "";
    for(i = 0; i < array.length; i++){
        var image = array[i];
        var activeImage = array[0];
        
        htmlContentToAppend2 = `
        <img class="border w-100" src="`+image+`">
        `;
        if (i>0) {
            htmlContentToAppend3 = `
            <li data-target="#carousel-example-1z" data-slide-to="`+i+`"></li>
            `;
            htmlContentToAppend = `
            <div class="carousel-item">
              <img class="d-block w-100" src="`+image+`" alt="Second slide">
            </div>
            `;
        }else{
            htmlContentToAppend3 = `
            <li data-target="#carousel-example-1z" data-slide-to="`+i+`" class="active"></li>
            `;
            htmlContentToAppend = `
            <div class="carousel-item active">
              <img class="d-block w-100" src="`+activeImage+`" alt="Second slide">
            </div>
            `;
        }
        document.getElementById("liImages").innerHTML += htmlContentToAppend3;
        document.getElementById("slide-container").innerHTML += htmlContentToAppend;
        document.getElementById("image-container").innerHTML += htmlContentToAppend2;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CATEGORY_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            category = resultObj.data;

            let categoryNameHTML  = document.getElementById("categoryName");
            let categoryDescriptionHTML = document.getElementById("categoryDescription");
            let productCountHTML = document.getElementById("productCount");
            let productCriteriaHTML = document.getElementById("productCriteria");
        
            categoryNameHTML.innerHTML = category.name;
            categoryDescriptionHTML.innerHTML += category.description;
            productCountHTML.innerHTML += category.productCount;
            productCriteriaHTML.innerHTML += category.productCriteria;

            //Muestro las imagenes en forma de galería
            showImagesGallery(category.images);
        }
    });
});