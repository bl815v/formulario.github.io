// Función para obtener los parámetros de la URL
function getParams(url) {
    const params = {};
    const urlParams = new URLSearchParams(url.search);
    for (const [key, value] of urlParams) {
        params[key] = value;
    }
    return params;
}

// Función para guardar los datos introducidos por el usuario y pasar a la siguiente página
function guardarDatos() {
    const url = new URL(window.location.href);
    const params = getParams(url);

    // Guardar los datos en el objeto params
    if (document.getElementById("index") !== null) {
        params.nombre = document.getElementById('nombre').value;
        params.apellido = document.getElementById('apellido').value;
        params.celular = document.getElementById('celular').value;
        params.email = document.getElementById('email').value;
        params.tipoDoc = document.getElementById('tipoDoc').value;
        params.numDoc = document.getElementById('numDoc').value;
        
    } else if (document.getElementById("datosCompra") !== null) {
        params.producto = document.getElementById('producto').value;
        params.cantidad = document.getElementById('cantidad').value;
        params.metodoPago = document.querySelector('input[name="metodoPago"]:checked').value;
    } else if (document.getElementById("datosEnvio") !== null) {
        params.ciudad = document.getElementById("ciudad").value;
        params.direccionEntrega = document.getElementById('dirEntrega').value;
        params.descripcionExtra = document.getElementById('descEntrega').value;
        params.propina = document.getElementById('propina').checked;
        params.envioPrioritario = document.getElementById('prioritario').checked;
    }

    // Redireccionar a la siguiente página con los nuevos parámetros
    if (document.getElementById("index") !== null) {
        window.location.href = "datosCompra.html?" + new URLSearchParams(params);
    } else if (document.getElementById("datosCompra") !== null) {
        window.location.href = "datosEnvio.html?" + new URLSearchParams(params);
    } else if(document.getElementById("datosEnvio") !== null){
        window.location.href = "resumen.html?" + new URLSearchParams(params);
    }
}

// Funcion para que muestre datos la pagina resumen
function obtenerDatos(){
    if (document.getElementById("resumen") !== null) {
        var parametrosUrl = new URLSearchParams(window.location.search);
        document.getElementById("nombreGuardado").textContent = parametrosUrl.get('nombre');
        document.getElementById("apellidoGuardado").textContent = parametrosUrl.get('apellido');
        document.getElementById("tipoDocGuardado").textContent = parametrosUrl.get('tipoDoc');
        document.getElementById("numDocGuardado").textContent = parametrosUrl.get('numDoc');
        document.getElementById("emailGuardado").textContent = parametrosUrl.get('email');
        document.getElementById("telGuardado").textContent = parametrosUrl.get('celular');
        document.getElementById("ciudadGuardado").textContent = parametrosUrl.get('ciudad');
        document.getElementById("productoGuardado").textContent = parametrosUrl.get('producto');
        document.getElementById("cantGuardado").textContent = parametrosUrl.get('cantidad');
        document.getElementById("pagoGuardado").textContent = parametrosUrl.get('metodoPago');
        document.getElementById("dirEntregaGuardado").textContent = parametrosUrl.get('direccionEntrega');
        document.getElementById("descripGuardado").textContent = parametrosUrl.get('descripcionExtra');
        if(parametrosUrl.get('propina') === "true"){
            document.getElementById("propinaGuardado").textContent = "Si";
        }else{
            document.getElementById("propinaGuardado").textContent = "No";
        }
        if(parametrosUrl.get('envioPrioritario') === "true"){
            document.getElementById("prioridadGuardado").textContent = "Si";
        }else{
            document.getElementById("prioridadGuardado").textContent = "No";
        }
        //document.getElementById("totalGuardado").textContent = parametrosUrl.get('');
        
    }
}

document.addEventListener('DOMContentLoaded', function(){
    if(document.getElementById("resumen") !== null){
        obtenerDatos();
    }
});

// Funcion del boton siguiente
document.addEventListener("DOMContentLoaded", function() {
    const pag1 =  document.getElementById("index") !== null;
    const pag2 =  document.getElementById("datosCompra") !== null;
    const pag3 =  document.getElementById("datosEnvio") !== null;
    if(pag1 || pag2 || pag3){
        const boton1 = document.getElementById("sig");
        boton1.addEventListener("click", guardarDatos);
    }
});