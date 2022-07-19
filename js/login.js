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

//Valida tecla enter para pulsar boton Login
var inputPassword = document.getElementById("password");

inputPassword.addEventListener("keypress", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("btnLogin").click();
    }
});
