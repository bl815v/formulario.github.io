// Función para obtener los parámetros de la URL
function getParams(url) {
    const params = {};
    const urlParams = new URLSearchParams(url.search);
    for (const [key, value] of urlParams) {
        params[key] = value;
    }
    return params;
}


function validarDatos(id, params, campo){
    const dato = document.getElementById(id);
    if(dato.value !== ""){
        dato.style.borderColor = "";
        params[campo] = dato.value;
        pasa += 1;
    }else{
        dato.style.borderColor = "red";
        dato.placeholder = "Escribe el dato...";
        dato.classList.add('placeholder-rojo');
    }
    dato.addEventListener("focus", function() {
        dato.style.borderColor = "";
        dato.placeholder = "";
    });
}

function validarNumero(id, params, campo) {
    const dato = document.getElementById(id);
    if (!isNaN(dato.value) && dato.value !== "") { 
        dato.style.borderColor = "";
        params[campo] = dato.value;
        pasa += 1;
    } else {
        dato.style.borderColor = "red";
        dato.value = "";
        dato.placeholder = "Ingrese solo numeros"; 
        dato.classList.add('placeholder-rojo');
    }
    dato.addEventListener("focus", function() {
        dato.style.borderColor = "";
        dato.placeholder = "";
    });
}

function validarCorreo(id, params, campo) {
    const dato = document.getElementById(id);
    const correo = dato.value;
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo); 

    if (correoValido) {
        dato.style.borderColor = "";
        params[campo] = correo;
        pasa += 1;
    } else {
        dato.style.borderColor = "red";
        dato.value = ""; 
        dato.placeholder = "Ingrese un correo valido";
        dato.classList.add('placeholder-rojo');
    }
    dato.addEventListener("focus", function() {
        dato.style.borderColor = "";
        dato.placeholder = "";
    });
}

function validarDatosProducto(id, params, campo, opcionesProductos) {
    const productoInput = document.getElementById(id);
    const productoSeleccionado = productoInput.value.toLowerCase();
    const productoValido = opcionesProductos.some(function(opcion) {
        return opcion.nombre.toLowerCase() === productoSeleccionado;
    });

    if (productoValido) {
        document.getElementById(campo).textContent = "";
        params[campo] = productoSeleccionado;
        const producto = opcionesProductos.find(function(opcion) {
            return opcion.nombre.toLowerCase() === productoSeleccionado;
        });
        pasa += 1;
    } else {
        const dato = document.getElementById(id);
        dato.style.borderColor = "red";
        dato.value = "";
        dato.placeholder = "Producto no valido";
        dato.classList.add('placeholder-rojo');
        document.getElementById("precio").textContent = "";
        dato.addEventListener("focus", function() {
            dato.style.borderColor = "";
            dato.placeholder = "";
        });
    }
}

function validarDatosNumber(id, params, campo){
    const dato = document.getElementById(id);
    const min = parseInt(dato.getAttribute("min")); 
    const max = parseInt(dato.getAttribute("max")); 
    let cantidad = parseInt(dato.value); 
    
    if(dato.value !== "" && cantidad>=min && cantidad<=max){
        dato.style.borderColor = "";
        params[campo] = dato.value;
        pasa += 1;
    }else{
        dato.value = "";
        dato.style.borderColor = "red";
        dato.placeholder = "Escribe el dato...";
        dato.classList.add('placeholder-rojo');
    }
    dato.addEventListener("focus", function() {
        dato.style.borderColor = "";
        dato.placeholder = "";
    });
}

function validarDatosQuery(id, params, campo){
    const radioButtons = document.querySelectorAll(id);
    let algunoSeleccionado = false;

    radioButtons.forEach(function(radioButton) {
        if (radioButton.checked) {
            algunoSeleccionado = true;
        }
        radioButton.addEventListener('change', function() {
            radioButtons.forEach(function(rb) {
                const labelID = rb.getAttribute('id');
                const label = document.querySelector(`label[for="${labelID}"]`);
                label.style.color = ""; 
            });
        });
    });

    if (algunoSeleccionado) {
        params[campo] = document.querySelector('[id]:checked').value;
        pasa += 1;
    } else {
        radioButtons.forEach(function(radioButton) {
            const labelID = radioButton.getAttribute('id');
            const label = document.querySelector(`label[for="${labelID}"]`);
            label.style.color = "red";
        });
    }
}

function calcularPrecio(){
    let precio = parseInt(document.getElementById("precio").innerText);
    let cantidad = parseInt(document.getElementById("cantidad").value);
    let multi =  precio * cantidad;
    if(isNaN(multi) || multi<=0){
        document.getElementById("totalPagar").textContent = "";    
    }else{
        document.getElementById("totalPagar").textContent = multi;
    }
}

// Guardar los datos introducidos por el usuario y pasar a la siguiente pagina
function guardarDatos(params, opcionesProductos) {
    // Guardar los datos en el objeto params
    if (document.getElementById("index") !== null) {
        pasa = 0;
        validarDatos('nombre', params, "nombre");
        validarDatos('apellido', params, "apellido");
        validarNumero('celular', params, "celular");
        validarCorreo('email', params, "email");
        validarDatos('tipoDoc', params, "tipoDoc");
        validarNumero('numDoc', params, "numDoc");
    }
    if (document.getElementById("datosCompra") !== null) {
        pasa = 0;
        validarDatosProducto("producto", params, "producto", opcionesProductos);
        validarDatosNumber('cantidad', params, "cantidad");
        validarDatosQuery('input[name="metodoPago"]', params, "metodoPago");
        params.precio = document.getElementById('totalPagar').innerText;
    }
    if (document.getElementById("datosEnvio") !== null) {
        pasa = 0;
        validarDatos('ciudad', params, "ciudad");
        validarDatos('dirEntrega', params, "direccionEntrega");
        validarDatos('descEntrega', params, "descripcionExtra");
        params.propina = document.getElementById('propina').checked;
        params.envioPrioritario = document.getElementById('prioritario').checked;
    }

    // Redireccionar a la siguiente pagina con los nuevos parametros
    if (document.getElementById("index") !== null  && pasa===6) {
        window.location.href = "datosCompra.html?" + new URLSearchParams(params);
    }
    if (document.getElementById("datosCompra") !== null && pasa===3) {
        window.location.href = "datosEnvio.html?" + new URLSearchParams(params);
    }
    if(document.getElementById("datosEnvio") !== null && pasa===3){
        window.location.href = "resumen.html?" + new URLSearchParams(params);
    }
}

function calcularTotalPrecio(precio, propina, prioritario){
    let suma =  parseInt(precio) + parseInt(propina) + parseInt(prioritario);
    if(isNaN(suma) || suma<=0){
        document.getElementById("totalGuardado").textContent = "";    
    }else{
        document.getElementById("totalGuardado").textContent = "$ " + suma;
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
        let precio = parametrosUrl.get('precio');
        let propina = 0;
        let prioritario = 0;
        if(parametrosUrl.get('propina') === "true"){
            document.getElementById("propinaGuardado").textContent = "Si";
            propina += 5000;
        }else{
            document.getElementById("propinaGuardado").textContent = "No";
        }
        if(parametrosUrl.get('envioPrioritario') === "true"){
            document.getElementById("prioridadGuardado").textContent = "Si";
            prioritario += 5000;
        }else{
            document.getElementById("prioridadGuardado").textContent = "No";
        }
        calcularTotalPrecio(precio, propina, prioritario);
    }
}


function volver(pag4){
    if(pag4){
        window.location.href = "index.html?";
    }else{
        window.history.back();
    }
}

function seleccionarProducto(opcionesProductos) {
    const inputProducto = document.getElementById("producto");
    const dataList = document.getElementById("productos");

    dataList.addEventListener("click", function(event) {
        if (event.target.tagName === "OPTION") {
            inputProducto.value = event.target.value;
            dataList.style.display = "none";
            document.getElementById("precio").textContent = opcionesProductos.find(option => option.nombre === inputProducto.value).precio;
        }
    });

    document.addEventListener("click", function(event) {
        if (event.target !== inputProducto && event.target.parentNode !== dataList) {
            dataList.style.display = "none";
        }
        if (inputProducto.value === "") {
            dataList.innerHTML = ""; 
            opcionesProductos.forEach(function(opcion) {
                const option = document.createElement("option");
                option.value = opcion.nombre;
                option.textContent = opcion.nombre;
                dataList.appendChild(option);
            });
        }
    });

    inputProducto.addEventListener("input", function() {
        dataList.innerHTML = "";

        const textoUsuario = inputProducto.value.toLowerCase();
        if (textoUsuario === "") {
            opcionesProductos.forEach(function(opcion) {
                const option = document.createElement("option");
                option.value = opcion.nombre;
                option.textContent = opcion.nombre;
                dataList.appendChild(option);
            });
        } else {
            opcionesProductos.forEach(function(opcion) {
                if (opcion.nombre.toLowerCase().includes(textoUsuario)) {
                    const option = document.createElement("option");
                    option.value = opcion.nombre;
                    option.textContent = opcion.nombre;
                    dataList.appendChild(option);
                }
            });
        }
        dataList.style.display = "block";
    });

    inputProducto.addEventListener("focus", function() {
        dataList.style.display = "block";
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const pag1 =  document.getElementById("index");
    const pag2 =  document.getElementById("datosCompra");
    const pag3 =  document.getElementById("datosEnvio") ;
    const pag4 = document.getElementById("resumen");

    const url = new URL(window.location.href);
    const params = getParams(url);

    const opcionesProductos = [
        { nombre: "Galletas Festival", precio: 1500},
        { nombre: "Almuerzo", precio: 50000},
        { nombre: "Cappuccino", precio: 7500}
    ];   
    
    if(pag1 || pag2 || pag3){
        const boton1 = document.getElementById("sig");
        boton1.addEventListener("click", function() {
            guardarDatos(params, opcionesProductos);
        });
    }

    if(pag2 || pag3 || pag4){
        const boton2 = document.getElementById("volver");
        boton2.addEventListener("click", function() {
            volver(pag4);
        });
    }

    if(document.getElementById("resumen") !== null){
        obtenerDatos(params);
    }

    if(pag2){ 
        seleccionarProducto(opcionesProductos);
        document.getElementById("producto").addEventListener("change", calcularPrecio);
        document.getElementById("cantidad").addEventListener("change", calcularPrecio);
        calcularPrecio();
    }

    if(pag3){
        const checkPropina = document.getElementById("propina");
        const checkPriori = document.getElementById("prioritario");
        const lPropina = document.querySelector('label[for="propina"]');
        const lPriori = document.querySelector('label[for="prioritario"]');
    
        function actualizarLabel(label, checkbox) {
            if (checkbox.checked) {
                label.style.color = "green"; 
                label.textContent += " + $5000"; 
            } else {
                label.style.color = ""; 
                label.textContent = label.textContent.replace(" + $5000", ""); 
            }
        }
    
        checkPropina.addEventListener("change", function() {
            actualizarLabel(lPropina, checkPropina);
        });
    
        checkPriori.addEventListener("change", function() {
            actualizarLabel(lPriori, checkPriori);
        });
    }
});

