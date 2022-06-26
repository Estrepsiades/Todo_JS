//Referencias en el el HTML

import { ToDo, TodoList } from "../classes";

import { toDosList } from '../index.js'

const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const classFilters = document.querySelector('.filters');
const anchorFiltros =  document.querySelectorAll('.selected filtro')

export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'check' : '' }>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );

    return div.firstElementChild;
}

// Eventos

txtInput.addEventListener('keyup', (event) => {
    if(event.keyCode === 13 && txtInput.value.length > 0){

        const nuevoTodo = new ToDo(txtInput.value);
        toDosList.nuevoTodo( nuevoTodo );
        crearTodoHtml( nuevoTodo );
        txtInput.value = '';
    }
})

divTodoList.addEventListener('click', (event) => {

    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;
    const todoID = todoElemento.getAttribute('data-id')

    if( nombreElemento.includes('input') ){
        toDosList.marcarcCompletado( todoID );
        todoElemento.classList.toggle('completed');
    } else if( nombreElemento.includes('button') ) {
        toDosList.eliminarTodo( todoID );
        divTodoList.removeChild( todoElemento );
    }

    console.log(toDosList);
})

btnBorrar.addEventListener('click', () => {
    toDosList.eliminarCompletados();

    for(let i =divTodoList.children.length-1; i>=0; i--){

        const elemento = divTodoList.children[i];

        if( elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }

});

classFilters.addEventListener('click', event => {

    const filtro = event.target.text;

    if(!filtro) { return; }

    anchorFiltros.forEach( elem => elem.classList.remove('selected'))
    event.target.classList.add('selected');

    for (const elemento of divTodoList.children ){
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch( filtro ){
            case 'Pendientes':
                if( completado ){
                    elemento.classList.add('hidden');
                }
            break;

            case 'Completados':
                if( !completado ){
                    elemento.classList.add('hidden');
                }
            break;
            

        }
    }
});