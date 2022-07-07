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


//Carga evento finalizar compra
window.addEventListener('DOMContentLoaded', (event) => {
    
    const btnFinalizarCompra = document.querySelector('.btn-success')
    btnFinalizarCompra.addEventListener("click", finalizarCompra)
});



//Recorro el array
   for (i = 0; i < productos.length; i++) {
      
    
//Escribo Productos en el DIV del HTML
 const divProducto = document.createElement("div");
        divProducto.classList = "col-6 col-md-6 d-grid gap-2 divProd itemProd";

   const nombreProducto = document.createElement("h3");
        nombreProducto.textContent = `Producto: ` + productos[i].nombre;
        nombreProducto.className = "prodTitle";
                divProducto.appendChild(nombreProducto);
            
   const precioProducto = document.createElement("p");
            precioProducto.textContent = `Precio: $`
            precioProducto.className = "prodPrice"
                divProducto.appendChild(precioProducto);
    
const precioProducto2 = document.createElement("p");
                precioProducto2.textContent = productos[i].precio;
                precioProducto2.className = "prodPrice2"
                    divProducto.appendChild(precioProducto2);

   const imgProducto = document.createElement("img");
                        imgProducto.src = productos[i].imagen;
                        imgProducto.classList = "rounded mx-auto d-block";
                divProducto.appendChild(imgProducto);
    
    const cantProducto = document.createElement("input");
                            cantProducto.classList = "prodCant";
                            cantProducto.type = "number";
                            cantProducto.min = "1";
                divProducto.appendChild(cantProducto);
    
    const btnProducto = document.createElement("button");
                                btnProducto.innerHTML = "Agregar";
                                btnProducto.classList = "btn btn-primary";
                                btnProducto.id = "btnAgr" + i;
                                btnProducto.addEventListener('click', agregarProd);
                divProducto.appendChild(btnProducto);


document.getElementById("divProd").appendChild(divProducto);

} 

//Carrito
let carrito = []
const bodyCarrito = document.querySelector('.tbodyCarrito')


//Funcion Agregar Productos
function agregarProd(e) {
        const button = e.target
        const item = button.closest('.itemProd')
        const nombreProductoCarrito = item.querySelector('.prodTitle').textContent;
        const precioProductoCarrito = item.querySelector('.prodPrice2').textContent;
        const cantidadProductoCarrito = item.querySelector('.prodCant').value;
        const newProducto = {
            nombre: nombreProductoCarrito,
            precio: precioProductoCarrito,
            cantidad: cantidadProductoCarrito,
            precioFinal: parseInt(precioProductoCarrito) * cantidadProductoCarrito
        }

         console.log(precioProductoCarrito);
    agregarAlCarrito(newProducto);
           
     swal({
     title: "Producto agregado",
     text: "Item nuevo en el carrito",
     icon: "info",
   });
};

//Funcion Agrega Nuevo Producto al carrito
function agregarAlCarrito(newProducto) {

    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].nombre.trim() === newProducto.nombre.trim()) {
            calculaTotalCarrito()
            return null;
        }
    }

    carrito.push(newProducto);
    addLocalStorage()
    renderCarrito()
}


//Renderizado de carrito
function renderCarrito() {

    bodyCarrito.innerHTML = '';
    carrito.map(item => {
        const tr = document.createElement('tr')
        tr.classList.add("productoCarrito")

        const Content = `    
        
        
        <td class="table__productos">
          <p class="title">${item.nombre}</p>
        </td>
        <td class="table__price"><p>${item.precio}</p></td>
        <td class="table__cantidad"><p>${item.cantidad}</p></td>
        <td class="table__price"><p>${item.precioFinal}</p></td>
`

        tr.innerHTML = Content;
        bodyCarrito.append(tr)
        bodyCarrito.focus()

        calculaTotalCarrito()

    })

}


// Funcino Calcula Total Carrito
function calculaTotalCarrito() {
    let Total = 0;
    const itemCartTotal = document.querySelector('.itemCartTotal')
    carrito.forEach((item) => {
        const precio = item.precioFinal
        Total = Total + precio
    })

    itemCartTotal.innerHTML = `Total $${Total}`
    
    document.getElementById('listaCarrito').scrollIntoView();
}

function addLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

 window.onload = function () {
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if (storage) {
        carrito = storage;
        renderCarrito()
    }
} 


//Funcion Finaliza Compra
function finalizarCompra ( ){
    swal({
        title: "Exito",
        text: "Muchas gracias por tu compra!",
        icon: "success",
    }); 

    localStorage.removeItem("carrito")
    let botonesCantidad = document.querySelectorAll('#cantidad')
    botonesCantidad.forEach(btns => {
        btns.value = ""

    })
    carrito = []
    renderCarrito()
    calculaTotalCarrito()
}
