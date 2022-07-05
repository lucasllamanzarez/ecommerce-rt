//Llamo archivo JSON para cargar los productos en el localStorage
fetch("json/productos.json")
.then(response => {
   return response.json();
})
.then(jsonData => localStorage.setItem('producto', JSON.stringify(jsonData)));


//Muestro lo productos cargados previamente en el LocalStorage
const listaProd = localStorage.getItem('producto');
//console.log('listaProductos: ', JSON.parse(listaProd));



//Escribo Productos en el DIV
const divProducto = document.createElement("div");

const nombreProducto = document.createElement("h3");
         nombreProducto.textContent = `Nombre producto: ` + listaProd;
            divProducto.appendChild(nombreProducto);
            

const precioProducto = document.createElement("p");
         precioProducto.textContent = `Precio producto: $` + listaProd;
            divProducto.appendChild(precioProducto);

document.getElementById("divProd").appendChild(divProducto);




