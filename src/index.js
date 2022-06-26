import './styles.css';
import {TodoList, ToDo} from './classes'
import { crearTodoHtml } from './js/componentes';



export const toDosList = new TodoList();


toDosList.todos.forEach( todo => crearTodoHtml( todo ));