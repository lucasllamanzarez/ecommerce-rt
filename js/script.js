//import(productos);
//Array de Productos
var productos = [
   {
       "id": 1,
       "nombre": "Teclado Logitech",
       "precio": 10000,
       "imagen": "./images/teclado.jpg"
   },
    {
       "id": 2,
       "nombre": "Mouse Logitech",
       "precio": 5000,
       "imagen": "./images/mouse.jpg"
   }, {
       "id": 3,
       "nombre": "Gabinete Thermaltake",
       "precio": 8000,
       "imagen": "./images/gabiente.jpg"
   }, {
       "id": 4,
       "nombre": "Fuente Thermaltake",
       "precio": 12000,
       "imagen": "./images/fuente.jpg"
   }, {
       "id": 5,
       "nombre": "Placa de video Asus",
       "precio": 75000,
       "imagen": "./images/placavideo.jpg"
   }
   ];


//Recorro el array
   for (i = 0; i < productos.length; i++) {
      
    
//Escribo Productos en el DIV del HTML
 const divProducto = document.createElement("div");
        divProducto.classList = "col-6 col-md-6 d-grid gap-2 divProd";

   const nombreProducto = document.createElement("h3");
         nombreProducto.textContent = `Producto: ` + productos[i].nombre;
               divProducto.appendChild(nombreProducto);
            
   const precioProducto = document.createElement("p");
         precioProducto.textContent = `Precio: $` + productos[i].precio;
               divProducto.appendChild(precioProducto);

   const imgProducto = document.createElement("img");
                                          imgProducto.src = productos[i].imagen;
                                          imgProducto.classList = "rounded mx-auto d-block";
               divProducto.appendChild(imgProducto);
    
    const btnProducto = document.createElement("button");
                        btnProducto.innerHTML = "Agregar";
                            btnProducto.classList = "btn btn-primary";
                            btnProducto.id = "btnAgr" + i;
                            btnProducto.addEventListener('click', agregarProd);
                divProducto.appendChild(btnProducto);


document.getElementById("divProd").appendChild(divProducto);

} 


//Carrito


//Funcion Agregar Productos
function agregarProd() {
           // JSON.parse(localStorage.setItem()); 
     swal({
     title: "Producto agregado",
     text: "Item nuevo en el carrito",
     icon: "info",
   });
  // console.log(carrito);
}


