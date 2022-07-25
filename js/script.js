//---------------------------------------------CARGA DE PRODUCTOS
//Fetch para traer los productos desde la BD de JSON
    fetch('json/BD.json')
                .then(res => res.json())
                .then(prod => {
                    //Recorro el JSON
                    for (i = 0; i < prod.length; i++) {
                                
    //Escribo Productos en el DIV del HTML
                    const divProducto = document.createElement("div");
                         divProducto.classList = "col-6 col-md-6 d-grid gap-2 divProd itemProd";

                    const idProducto = document.createElement("p");
                            idProducto.textContent = prod[i].id;
                            idProducto.classList = "disable";
                            divProducto.appendChild(idProducto);

                 
                    const nombreProducto = document.createElement("h3");
                         nombreProducto.textContent = prod[i].nombre;
                         nombreProducto.className = "prodTitle card-title";
                                 divProducto.appendChild(nombreProducto);
                             
                    const precioProducto = document.createElement("p");
                             precioProducto.textContent = `Precio: $`
                             precioProducto.className = "prodPrice card-text"
                                 divProducto.appendChild(precioProducto);
                     
                    const precioProducto2 = document.createElement("p");
                                 precioProducto2.textContent = prod[i].precio;
                                 precioProducto2.className = "prodPrice2"
                                     divProducto.appendChild(precioProducto2);
                 
                    const imgProducto = document.createElement("img");
                                         imgProducto.src = prod[i].imagen;
                                         imgProducto.classList = "rounded mx-auto d-block";
                                 divProducto.appendChild(imgProducto);
                     
                    const cantProducto = document.createElement("input");
                                             cantProducto.classList = "form-control prodCant card-text";
                                             cantProducto.type = "number";
                                             cantProducto.value = "1";
                                             cantProducto.id = "cantidad"
                                 divProducto.appendChild(cantProducto);
                     
                    const btnProducto = document.createElement("button");
                                                 btnProducto.innerHTML = "Agregar";
                                                 btnProducto.classList = "btn btn-primary btnAgre";
                                                 btnProducto.id = "btnAgr" + i;
                                                 btnProducto.addEventListener('click', agregarProd);
                                 divProducto.appendChild(btnProducto);
                 
                 
                document.getElementById("divProd").appendChild(divProducto);
                 
            } 

    });

//---------------------------------------------BARRA DE NAVEGACION
//Se agrega evento para fijar barra
window.onscroll = function(){
    AddOrRemove()
};

//Variables para obtener la barra
let Nav = document.getElementById("barranav");
let NavPosition = Nav.offsetTop;

//Funcion para agregar y quitar clase a la barra
function AddOrRemove(){
    if( NavPosition >= window.pageYOffset){
         Nav.classList.remove("fijar");
    }
    else{
        Nav.classList.add("fijar");
    }
}

//---------------------------------------------CARRO DE COMPRAS 
//Carrito
    let carrito = [];
        const bodyCarrito = document.querySelector('.tbodyCarrito');


//Funcion Agregar Productos
function agregarProd(e) {
        const button = e.target
        const item = button.closest('.itemProd')
        const idProductoCarrito = item.querySelector('.disable').textContent;
        const nombreProductoCarrito = item.querySelector('.prodTitle').textContent;
        const precioProductoCarrito = item.querySelector('.prodPrice2').textContent;
        const cantidadProductoCarrito = item.querySelector('.prodCant').value;
        const newProducto = {
                                id: idProductoCarrito,
                            nombre: nombreProductoCarrito,
                        precio: precioProductoCarrito,
                    cantidad: cantidadProductoCarrito,
                precioFinal: parseInt(precioProductoCarrito) * cantidadProductoCarrito
        }

            agregarAlCarrito(newProducto);
           
    swal({
        title: "Producto agregado",
        text: "Item nuevo en el carrito",
        icon: "info",
    });
};


//Funcion para verificar si el producto ya existe y agregar otra unidad
function agregarAlCarrito(newProducto) {

    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].nombre.trim() === newProducto.nombre.trim()) {

                    calculaTotalCarrito()
                renderCarrito()
        }
    }

//Agrega nuevo produco al localstorage
    carrito.push(newProducto);
        addLocalStorage()
    renderCarrito()
}

//Funcion Vaciar Carrito
function borrarCarrito () {
    localStorage.removeItem("carrito")
            let botonesCantidad = document.querySelectorAll('#cantidad')
                botonesCantidad.forEach(btns => {
            btns.value = "1"

        })
}

//Renderizado de carrito
function renderCarrito() {

    bodyCarrito.innerHTML = '';
        carrito.map(item => {
            const tr = document.createElement('tr')
                tr.classList.add("productoCarrito")

        const Content = `           
        <td class="table__productos"><p class="title">${item.nombre}</p></td>
        <td class="table__price"><p>${item.precio}</p></td>
        <td class="table__cantidad"><p id="cantCarr">${item.cantidad}</p></td>
        <td class="table__price"><p>${item.precioFinal}</p></td>
        <td class="table__delete"><button type="button" onclick="borrarItem(${item.id})" class="btn btn-danger">X</button></td>
        `
            tr.innerHTML = Content;
                bodyCarrito.append(tr)
                    bodyCarrito.focus()

        calculaTotalCarrito()

    })

}

// Funcion Calcular Total Carrito
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

//Se carga carrito en localstorage
function addLocalStorage() {
        localStorage.setItem('carrito', JSON.stringify(carrito))
}

//Renderizado al cargar items en carrito
window.onload = function () {
        const storage = JSON.parse(localStorage.getItem('carrito'));
            if (storage) {
                carrito = storage;
        renderCarrito()
    }
} 

//Funcion Finalizar Compra
function finalizarCompra (){
        swal({
            title: "Exito",
            text: "Muchas gracias por tu compra!",
            icon: "success",
        }); 

    //Se borra carrito localstorage
    borrarCarrito ()
            carrito = []
        renderCarrito()
    calculaTotalCarrito()
}

//Carga evento finalizar compra
window.addEventListener('DOMContentLoaded', (event) => {
    
    const btnFinalizarCompra = document.querySelector('.btn-success');
             btnFinalizarCompra.addEventListener("click", finalizarCompra);

});

//Borrar Items
function borrarItem (id) {
  
        for (i = 0; i < carrito.length; i++) {
                        if (id == carrito[i].id){
                    carrito.splice(i,1);
                calculaTotalCarrito()               
            }
        } 

    addLocalStorage();
         renderCarrito();
}

//---------------------------------------------FORM DE CONTACTO
//Enviar del Form
let inputName = document.getElementById ('inputName').value;
let inputSurname = document.getElementById ('inputSurname').value;
let inputState = document.getElementById ('inputState').value;
let inputEmail = document.getElementById ('inputEmail4').value;
let inputMessage = document.getElementById ('inputMessage').value;
let btnSend = document.querySelector("#send");

btnSend.addEventListener('click', checkSend );

//Funcion para chequear campos vacios
function checkSend() {
            
            if (inputName == "" || inputSurname == "" || inputState == "" || inputEmail == "" 
            || inputMessage == "" ) {
                swal({
                    title: "Faltan Completar Datos",
                    text: "Verifique los campos obligatorios",
                    icon: "warning",
                });

            } else {
                window.location = '../pages/msg.html';     
            }
        }

//---------------------------------------------CARGA DE PRODUCTOS NUEVOS DESDE CARGAPROD
//Muestro productos nuevos
function mostrarProductos () {
        
    if (localStorage.getItem("productos") != null) {
        let productos = JSON.parse(localStorage.getItem("productos"));

        //Cargo productos nuevos desde el array obtenido en el localStorage
                for(i = 5; i < productos.length; i++){

                        const divProducto = document.createElement("div");
                        divProducto.classList = "col-6 col-md-6 d-grid gap-2 divProd itemProd";

                   const idProducto = document.createElement("p");
                           idProducto.textContent = productos[i].id;
                           idProducto.classList = "disable";
                           divProducto.appendChild(idProducto);

                
                   const nombreProducto = document.createElement("h3");
                        nombreProducto.textContent = productos[i].nombre;
                        nombreProducto.className = "prodTitle card-title";
                                divProducto.appendChild(nombreProducto);
                            
                   const precioProducto = document.createElement("p");
                            precioProducto.textContent = `Precio: $`
                            precioProducto.className = "prodPrice card-text"
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
                                            cantProducto.classList = "form-control prodCant card-text";
                                            cantProducto.type = "number";
                                            cantProducto.value = "1";
                                            cantProducto.id = "cantidad"
                                divProducto.appendChild(cantProducto);
                    
                   const btnProducto = document.createElement("button");
                                                btnProducto.innerHTML = "Agregar";
                                                btnProducto.classList = "btn btn-primary btnAgre";
                                                btnProducto.id = "btnAgr" + productos.id;
                                                btnProducto.addEventListener('click', agregarProd);
                                divProducto.appendChild(btnProducto);
                
                
            document.getElementById("divProd").appendChild(divProducto);

        }              
    }
}

mostrarProductos();

//Verificar si localStorage esta vacio para borrado -- Solo Pruebas --
    function borrarLocal() {
            localStorage.clear('productos');
    location.reload();
}
