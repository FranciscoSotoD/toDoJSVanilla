// Variables
const form = document.querySelector('#formulario');
const input = document.querySelector('#formulario__input');
const agregar = document.querySelector('#formulario__submit');
const toDo = document.querySelector('#toDoElementos');

let listaToDo = [];

const c = document.querySelectorAll('#toDoSeparacion');
console.log( typeof c );
console.log( c );

// Eventos
addEventsListeners();
function addEventsListeners() {

    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });

    input.addEventListener('change', leerProducto );

    document.addEventListener('DOMContentLoaded', () => {
        listaToDo = JSON.parse( localStorage.getItem('toDo') ) || [];
        // console.log( listaToDo );
        
        

        listaToDo.forEach( (i) => {
            // console.log( i.completado );
            if( i.completado ) {
                // console.log( i ,'true' );
            } else {
                // console.log( i, 'false' );
            }
        } )
        
        
        inyectarAlHtml();
    } );    

}

// Funciones
function leerProducto(e) {
    
    const nuevaTarea = document.createElement('li');
    nuevaTarea.textContent = e.target.value;

    const toDoObj = {
        id: Date.now(),
        texto: nuevaTarea.textContent,
        completado: false
    }

    listaToDo = [ ...listaToDo, toDoObj ];
    console.log( listaToDo );

    inyectarAlHtml();
    // sincronizarStorage();
    form.reset();
}

function inyectarAlHtml() {

    limpiarHtmlPrevio();

    if( listaToDo.length > 0 ) {
        listaToDo.forEach( ( tareaPendiente ) => {

            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('eliminar');
            btnEliminar.textContent = 'X';

            btnEliminar.onclick = () => {
                borrarToDo(tareaPendiente.id);
            }

            // CrearHTML
            const p = document.createElement('li');

            // Añadir el texto y botón de eliminar
            p.innerText = tareaPendiente.texto;
            p.classList.add('toDoSeparacion');
            p.setAttribute('id', 'toDoSeparacion');

            p.appendChild(btnEliminar);
            
            // Inyectarlo al HTML
            toDo.appendChild(p);

            // Poner el toDo como completado
            p.addEventListener('click', () => {
                toDoCompletado( tareaPendiente.id, p );
            } );
            
        } );
    }

    sincronizarStorage();

}

function sincronizarStorage() {
    localStorage.setItem('toDo', JSON.stringify(listaToDo));
    // console.log('sincronizando');
}
function borrarToDo(idToDo) {
    listaToDo = listaToDo.filter( (i) => {
        return i.id !== idToDo;
    } )
    // console.log( listaToDo );
    inyectarAlHtml();
}
function toDoCompletado( id, p ) {

    listaToDo = JSON.parse( localStorage.getItem('toDo') );
    listaToDo.forEach( (i) => {
        if( id === i.id ) {
            switch( i.completado ) {
                case false: 
                    i.completado = true;
                    p.classList.add('toDoCompletado');
                    sincronizarStorage();
                    break;
                case true:
                    i.completado = false;
                    p.classList.remove('toDoCompletado');
                    sincronizarStorage();
                    break;
                default: 
                    console.log( 'no entró en ninguno');
                    break;
            }
        }
    } );

}

function limpiarHtmlPrevio() {
    while( toDo.firstChild ) {
        toDo.removeChild( toDo.firstChild );
    }
}