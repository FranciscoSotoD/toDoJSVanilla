// Variables
const form = document.querySelector('#formulario');
const input = document.querySelector('#formulario__input');
const agregar = document.querySelector('#formulario__submit');
const toDo = document.querySelector('#toDoElementos');

let listaToDo = [];

// Eventos
addEventsListeners();
function addEventsListeners() {

    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });

    input.addEventListener('change', leerProducto );

    document.addEventListener('DOMContentLoaded', () => {
        getItems = JSON.parse( localStorage.getItem('toDo') ) || [];
        console.log( getItems );
        inyectarAlHtml();
    } );    

}

// Funciones
function leerProducto(e) {
    
    const nuevaTarea = document.createElement('p');
    nuevaTarea.textContent = e.target.value;

    const toDoObj = {
        id: Date.now(),
        texto: nuevaTarea.textContent
    }

    listaToDo = [ ...listaToDo, toDoObj ];
    // console.log( listaToDo );

    inyectarAlHtml();
    // sincronizarStorage();
    form.reset();
}

function inyectarAlHtml() {

    limpiarHtmlPrevio();

    if( listaToDo.length > 0 ) {
        listaToDo.forEach( ( Tareapendiente ) => {
            // CrearHTML
            const p = document.createElement('p');

            // Añadir el texto
            p.innerText = Tareapendiente.texto;
            
            // Inyectarlo al HTML
            toDo.appendChild(p);
        } );
    }

    sincronizarStorage();

}

function sincronizarStorage() {
    localStorage.setItem('toDo', JSON.stringify(listaToDo));
}

function limpiarHtmlPrevio() {
    while( toDo.firstChild ) {
        toDo.removeChild( toDo.firstChild );
    }
}