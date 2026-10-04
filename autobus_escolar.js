// ===== Autobús Escolar =====
// Clave con la que se guardan los datos en localStorage
const CLAVE = 'autobusEscolar';
// Número total de asientos del autobús
const TOTAL = 24;
// Estado de los asientos: false = libre, true = ocupado
let asientos = Array(TOTAL).fill(false);
// ===== Referencias a elementos del HTML =====
const bus = document.getElementById('bus');                // cuerpo del autobús
const botones = document.querySelectorAll('.asiento');     // los 24 asientos
const libres = document.getElementById('libres');          // contador de libres
const ocupados = document.getElementById('ocupados');      // contador de ocupados
const porcentaje = document.getElementById('porcentaje');  // porcentaje de ocupación
const mensaje = document.getElementById('mensaje');        // texto de estado
// ===== Funciones de localStorage =====
// Guarda el estado actual en el navegador (como texto JSON)
function guardar() {
    localStorage.setItem(CLAVE, JSON.stringify(asientos));
}
// Carga el estado guardado (si existe) al abrir la página
function cargar() {
    const datos = localStorage.getItem(CLAVE); // lee el texto guardado
    if (datos) {
        const lista = JSON.parse(datos); // convierte el texto a arreglo
        // Valida que sea un arreglo con los 24 asientos antes de usarlo
        if (Array.isArray(lista) && lista.length === TOTAL) asientos = lista;
    }
}
// ===== Funciones de la interfaz =====
// Dibuja en pantalla el estado de todos los asientos
function actualizar() {
    // Recorre cada asiento del HTML y le pone o quita el color de ocupado
    botones.forEach(boton => {
        boton.classList.toggle('ocupado', asientos[boton.dataset.id]);
    });
    // Cuenta cuántos asientos están ocupados y cuántos libres
    const cantidad = asientos.filter(estado => estado).length;
    libres.textContent = TOTAL - cantidad;
    ocupados.textContent = cantidad;
    porcentaje.textContent = Math.round((cantidad / TOTAL) * 100) + '%'; // % de ocupación
    // Muestra un mensaje según la situación
    if (cantidad === TOTAL) mensaje.textContent = '⛔ El autobús está lleno.';
    else if (cantidad === 0) mensaje.textContent = 'El autobús está vacío.';
    else mensaje.textContent = `Quedan ${TOTAL - cantidad} asiento(s) disponible(s).`;
}
// Pone todos los asientos en el mismo estado
function establecerTodos(valor) {
    asientos = asientos.map(() => valor);
    guardar();
    actualizar();
}
// ===== Eventos =====
// Un solo "oyente" en el autobús detecta clic en cualquier asiento
bus.addEventListener('click', (evento) => {
    const boton = evento.target.closest('.asiento'); // asiento más cercano al clic
    if (!boton) return; // si se hizo clic fuera de un asiento, no hace nada
    const id = Number(boton.dataset.id); // número de asiento guardado en data-id
    asientos[id] = !asientos[id]; // invierte el estado: libre <-> ocupado
    guardar();
    actualizar();
});
// Botón "Vaciar autobús": todos pasan a libre (false)
document.getElementById('btn-vaciar').addEventListener('click', () => establecerTodos(false));
// Botón "Llenar autobús": todos pasan a ocupado (true)
document.getElementById('btn-llenar').addEventListener('click', () => establecerTodos(true));
// ===== Inicio =====
// Al cargar la página: lee lo guardado y dibuja
cargar();
actualizar();