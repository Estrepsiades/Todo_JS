

export class ToDo {

    static fromJson({id, tarea, completado, creado}){
        const tempTodo = new ToDo(tarea);
        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;

        return tempTodo;
    }

    constructor(tarea){

        this.tarea = tarea;

        this.id = new Date().getTime();
        this.completado = false;
        this.creado = new Date();

    }
}