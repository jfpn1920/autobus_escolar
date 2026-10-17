//-----------------------------------//
//--|funcionalidad_autobus_escolar|--//
//-----------------------------------//
const CLAVE = 'autobusEscolar';
const TOTAL = 24;
let asientos = Array(TOTAL).fill(false);
const bus = document.getElementById('bus');
const botones = document.querySelectorAll('.asiento');
const libres = document.getElementById('libres');
const ocupados = document.getElementById('ocupados');
const porcentaje = document.getElementById('porcentaje');
const mensaje = document.getElementById('mensaje');
//--------------------------------//
//--|guardar_estado_de_asientos|--//
//--------------------------------//
function guardar() {
    localStorage.setItem(CLAVE, JSON.stringify(asientos));
}
function cargar() {
    const datos = localStorage.getItem(CLAVE);
    if (datos) {
        const guardados = JSON.parse(datos);
        if (Array.isArray(guardados) && guardados.length === TOTAL) {
            asientos = guardados;
        }
    }
}
//--------------------------------------//
//--|actualizar_asientos_y_contadores|--//
//--------------------------------------//
function actualizar() {
    botones.forEach(function(boton) {
        const id = Number(boton.dataset.id);
        boton.classList.toggle('ocupado', asientos[id]);
    });
    const cantidadOcupados = asientos.filter(Boolean).length;
    const cantidadLibres = TOTAL - cantidadOcupados;
    const ocupacion = Math.round((cantidadOcupados / TOTAL) * 100);
    libres.textContent = cantidadLibres;
    ocupados.textContent = cantidadOcupados;
    porcentaje.textContent = ocupacion + '%';
    if (cantidadLibres === 0) {
        mensaje.textContent = 'El autobús está lleno.';
    } else if (cantidadOcupados === 0) {
        mensaje.textContent = 'Todos los asientos están libres.';
    } else {
        mensaje.textContent = 'Quedan ' + cantidadLibres + ' asientos libres.';
    }
}
//-----------------------------------//
//--|establecer_todos_los_asientos|--//
//-----------------------------------//
function establecerTodos(valor) {
    asientos = Array(TOTAL).fill(valor);
    guardar();
    actualizar();
}
bus.addEventListener('click', function(evento) {
    const boton = evento.target.closest('.asiento');
    if (!boton) {
        return;
    }
    const id = Number(boton.dataset.id);
    asientos[id] = !asientos[id];
    guardar();
    actualizar();
});
//--------------------------------//
//--|vaciar_y_llenar_el_autobus|--//
//--------------------------------//
document.getElementById('btn-vaciar').addEventListener('click', function() {
    establecerTodos(false);
});
document.getElementById('btn-llenar').addEventListener('click', function() {
    establecerTodos(true);
});
//------------------------//
//--|iniciar_aplicacion|--//
//------------------------//
cargar();
actualizar();