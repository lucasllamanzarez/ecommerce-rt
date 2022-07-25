// Msj de consulta recibida y redireccion al sitio principal
function redirect(){
    document.getElementById('msgMail').innerHTML = 'Recibimos tu mensaje, nos contactaremos a la brevedad. Seras redireccionado a la pagina principal en <span id="conteo">5</span> segundos...';
    var count = 5;
    setInterval(function(){
        count--;
        document.getElementById('conteo').innerHTML = count;
        if (count == 0) {
            window.location = '../index.html'; 
        }
    },1000);
}