const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_SOLD_COUNT = "Relevancia";
const ORDER_ASC_BY_PROD_COST = "Precio.Asc";
const ORDER_DESC_BY_PROD_COST = "Precio.Desc";
const search = document.querySelector('#search');//Constantes para el search
const resultadoBusqueda = document.getElementById("products-container");//Constantes para el search
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;
var minCount = undefined;
var maxCount = undefined;
/*No trabaja con el DOM hasta que la ejecuto así que la puedo poner afuera
del add event listener pq no la estoy llamando antes de que cargue el DOM*/
var sortProducts = function(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_SOLD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_ASC_BY_PROD_COST){
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if ( aCost < bCost ){ return -1; }
            if ( aCost > bCost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PROD_COST){
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if ( aCost > bCost ){ return -1; }
            if ( aCost < bCost ){ return 1; }
            return 0;
        });
    }

    return result;
}

var showProductsList = function(){
    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))){

        htmlContentToAppend += `
            <div class="row list-group-item-action mt-4 border-light rounded">
                <div class="col-3 pl-0">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-fluid rounded">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between pt-2">
                        <h4 class="mb-1">`+ product.name +`</h4>
                        <small class="text-muted">` + product.cost + ` USD</small>
                    </div>
                    <div>`+ product.description +`</div>
                </div>
            </div>
        `
        }
        document.getElementById("products-container").innerHTML = htmlContentToAppend;
    }
}

var sortAndShowProducts = function(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductsList();
}

/*SEARCH*/


var searchProducts = function(){

    var textoBusqueda = search.value.toLowerCase();
    resultadoBusqueda.innerHTML = '';

    for(let product of currentProductsArray){
        let name = product.name.toLowerCase();
        let description = product.description.toLowerCase();
        if(name.indexOf(textoBusqueda)!== -1 || description.indexOf(textoBusqueda) !== -1){
            
            resultadoBusqueda.innerHTML += `
            <div class="row list-group-item-action mt-4 border-light rounded">
                <div class="col-3 pl-0">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-fluid rounded">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between pt-2">
                        <h4 class="mb-1">`+ product.name +`</h4>
                        <small class="text-muted">` + product.cost + ` USD</small>
                    </div>
                    <div>`+ product.description +`</div>
                </div>
            </div>
        `
        }
    }
}
/*SEARCH*/


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortByRelevance").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_SOLD_COUNT);
    });

    document.getElementById("sortByCostAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PROD_COST);
    });

    document.getElementById("sortByCostDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PROD_COST);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCost").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }

        showProductsList();
    });
    //addEventListener del Search
    search.addEventListener('keyup',searchProducts);
});
