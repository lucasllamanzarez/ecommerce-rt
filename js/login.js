//---------------------------------------------GENERACION DE PRODUCTOS NUEVOS
//Funcion con Fetch para traer los productos desde la BD de JSON
function agregarProductos() {
    fetch('../json/BD.json')
                .then(res => res.json())
                .then(prod => {
                    //Recorro el JSON
                    for (i = 0; i < prod.length; i++) {
                        if (localStorage.getItem("productos") == null || localStorage.getItem("productos") == undefined) {
                            localStorage.setItem("productos", JSON.stringify(prod))   
                }
            } 
    });
}

agregarProductos();

//Declaro clase producto para incorporar productos nuevos
class Producto {
    constructor({ idProducto, nombreProducto, precioProducto, imgProducto }) {
        this.id = idProducto;
        this.nombre = nombreProducto;
        this.precio = precioProducto;
        this.imagen = imgProducto
    }
}

//Se Genera ID para generacion de nuevos productos correlativos
const getNextId = () => {
    let id = 1;
    for (const prd of JSON.parse(localStorage.getItem("productos"))) {
        ++id
    }
    document.getElementById("id").value = id
}

//Funcion agregar producto generado y guarda en el local storage
const botonAgregar = document.getElementById("btnCrearProducto")

botonAgregar.addEventListener("click", (e) => {
    e.preventDefault()
    guardarDatos()
})

const guardarDatos = () => {
    const producto = new Producto({
        idProducto: id.value,
        nombreProducto: document.getElementById("nombre").value,
        precioProducto: document.getElementById("precio").value,
        imgProducto: "./images/newItem.jpg"
    })
    if (document.getElementById("nombre").value != "" && document.getElementById("precio").value != "") {
        if (localStorage.getItem("productos") == null) {
            listaProductos.push(producto)
            localStorage.setItem("productos", JSON.stringify(listaProductos))
        }
        else {
            const newListaProductos = JSON.parse(localStorage.getItem("productos"))
            newListaProductos.push(producto)
            localStorage.setItem("productos", JSON.stringify(newListaProductos))
        }
        swal({
            text: "El producto se ha creado con exito!",
            icon: "success",
        });
        document.getElementById("formProductos").reset()
        getNextId()
        

    }
    else {
        swal({
            title: "Error!",
            text: "Faltan completar datos, favor de revisar dichos campos para generar el producto correctamente",
            icon: "error",
        });
        return
    }
}


//---------------------------------------------LOGIN Y USUARIO
//Login de usuario unico para carga de productos
const botonLogin = document.getElementById("btnLogin")

botonLogin.addEventListener("click", (e) => {
    e.preventDefault()
    validarUsuario()
})

//Bloqueo por intentos erroneos
let intentosLogin = 3;
document.getElementById('Productos').hidden = true

// Valida Usuario
function validarUsuario() {

    var username = document.getElementById("user").value;
    var password = document.getElementById("password").value;
    //Usuario admin // clave admin
    if (username == "admin" && password == "admin") {
        swal({
            title: "Bienvenido " + username,
            text: "Te has logueado con exito!",
            icon: "success",
        });
        document.getElementById('login').hidden = true
        document.getElementById('Productos').hidden = false
        getNextId()
    }
    //Reviso intentos
    else {
        intentosLogin--;
        swal({
            title: "Error!",
            text: `Los datos ingresados no son válidos. Intentos restantes: ` + intentosLogin,
            icon: "error",
        });
        if (intentosLogin == 0) {
            document.getElementById("user").disabled = true;
            document.getElementById("password").disabled = true;
            document.getElementById("btnLogin").disabled = true;
        }
    }
}

//Log Out
function logOut (){
 
        window.location = 'cargaprod.html'
}

//Valida tecla enter para pulsar boton Login
var inputPassword = document.getElementById("password");

inputPassword.addEventListener("keypress", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("btnLogin").click();
    }
});
