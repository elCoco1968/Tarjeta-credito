const tarjeta = document.querySelector('#tarjeta');
const btnAbrirFormulario = document.querySelector('#btn-abrir-formulario');
const formulario = document.querySelector('#formulario-tarjeta');
const numeroTarjeta = document.querySelector('#tarjeta .numero');
const nombreTarjeta = document.querySelector('#tarjeta .nombre');
const firma = document.querySelector('#tarjeta .firma');
const btnCalculo = document.querySelector('#btn-calculo');
const btnLimpiar = document.querySelector('#btn-limpiar');
const tipoPrestamo = document.querySelector("#selectTipo");
const numCuotas = document.querySelector("#selectCuotas");
const numerT = document.getElementById("inputNumero");
const nombreT = document.getElementById("inputNombre");
const diaT = document.getElementById("selectDay");
const mesT = document.getElementById("selectMes");
const añoT = document.getElementById("selectYear");
const tipoT = document.getElementById("selectTipo"); 
const cuotasT = document.getElementById("selectCuotas");
const btnCerrar = document.querySelector("#btn-cerrar");
const mensaje = document.querySelector("#contenedor__mensaje");
const valorCuota = document.querySelector("#valor__cuota");
const valorTotal = document.querySelector("#valor__total");
const mensajeError = document.querySelector("#contenedor__mensaje__error")
const btnCerrarError = document.querySelector("#btn-cerrar__error")
const nombreUser = document.querySelector("#nombre__usuario");







/*---------------BOTON CALCULO-----------------*/
btnCalculo.addEventListener('click', (e) => {
    e.preventDefault();

    if (numerT.value != "" && nombreT.value != "" && diaT.value != "Dia" && mesT.value != "Mes" && añoT.value != "Año" && tipoT.value != "Tipo" && cuotasT.value != "Cuotas") {
        //Tipo de prestamo
        let interes;
        if (tipoPrestamo.value == "estudiantil") {
            interes = 0.5 / 100;
            console.log(interes);
        } else {
            interes = 1 / 100;
            console.log(interes);
        }
        //Num Cuotas
        let cuotas;
        if (numCuotas.value == "doce") {
            cuotas = 12;
            console.log(cuotas);
        } else if (numCuotas.value == "doscuatro") {
            cuotas = 24;
            console.log(cuotas);
        } else {
            cuotas = 36;
            console.log(cuotas);
        }
        /*Valor total de la deuda con 8000 mensual adicional de cuota de manejo */
        let totaldeuda = parseInt(numerT.value) + (parseInt(numerT.value) * interes * cuotas) + (8000*cuotas);
        console.log(totaldeuda)
        /* Cuotas con manejo de 8000mil mensual incluido */
        let totalCuota = totaldeuda / cuotas;
        console.log(totalCuota)
        /*document.getElementById('totaldeuda').innerHTML = totaldeuda*/
        valorCuota.textContent = totalCuota;
        valorTotal.textContent = totaldeuda;
        nombreUser.textContent = nombreT.value;
        mensaje.classList.add("active");

    }else{
        console.log("rellene")
        mensajeError.classList.add("active")
    }
});

/*-------BOTON LIMPIAR--------------------*/
btnLimpiar.addEventListener('click', (e) => {
    e.preventDefault();
    numerT.value = "";
    nombreT.value = "";
    diaT.value = "Dia";
    mesT.value = "Mes";
    añoT.value = "Año";
    tipoT.value = "Tipo";
    cuotasT.value = "Cuotas";
    numeroTarjeta.textContent = "$#### ###"
    nombreTarjeta.textContent = "................"
});


/*-------BOTON CERRAR PESTAÑA------- */
btnCerrar.addEventListener('click', (e) =>{
    e.preventDefault();
    mensaje.classList.remove("active");
})
btnCerrarError.addEventListener('click', (e) =>{
    e.preventDefault();
    mensajeError.classList.remove("active");
})




/*--------VOLTEAR TARJETA PARA EL FRENTE------------*/
const mostrarFrente = () => {
    if (tarjeta.classList.contains('active')) {
        tarjeta.classList.remove('active');
    }
}
/*----------ROTACION TARJETA------------------ */
tarjeta.addEventListener('click', () => {
    tarjeta.classList.toggle('active');
});
/*----------FORMULARIO------------------ */
btnAbrirFormulario.addEventListener('click', () => {
    btnAbrirFormulario.classList.toggle('active');
    formulario.classList.toggle('active');
});

/*----------SELECT DEL MES------------------ */
for (let i = 1; i < 13; i++) {
    let opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectMes.appendChild(opcion);
}
/*----------SELECT DEL AÑO------------------ */
const yearActual = new Date().getFullYear();
for (let i = yearActual; i <= yearActual + 8; i++) {
    let opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectYear.appendChild(opcion);
}
/*----------SELECT DEL DIA------------------ */
for (let i = 1; i < 30; i++) {
    let opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectDay.appendChild(opcion);
}


/*-------------INPUT NOMBRE TARJETA---------------*/
formulario.inputNumero.addEventListener('keyup', (e) => {
    let valorInput = e.target.value;

    formulario.inputNumero.value = valorInput
        //Expresion regular para eliminar espacios en blanco
        .replace(/\s/g, '')
        //Eliminar las letras
        .replace(/\D/g, '')
        //podemos espacio cada 4 numeros
        .replace(/([0-9]{4})/g, '$1.')
        //elimina el ultimo espaciado
        .trim();

    numeroTarjeta.textContent = valorInput;

    if (valorInput == '') {
        numeroTarjeta.textContent = '$####.###'
    }
    //volteamos la tarjeta para que el usuario vea el frente
    mostrarFrente();
});



/*---------------INPUT NOMBRE DE TARJETA--------------*/
formulario.inputNombre.addEventListener('keyup', (e) => {
    let valorInput = e.target.value;

    formulario.inputNombre.value = valorInput.replace(/[0-9]/g, '');
    nombreTarjeta.textContent = valorInput;
    firma.textContent = valorInput;

    if (valorInput == '') {
        nombreTarjeta.textContent = '................'
    }
    mostrarFrente();
});


