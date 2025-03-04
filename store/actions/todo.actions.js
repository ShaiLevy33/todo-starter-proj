import { todoService } from "../../services/todo.service.js";
import { REMOVE_TODO, SET_IS_LOADING, SET_TODOS,  UNDO_TODOS,  UPDATE_TODO } from "../reducers/todo.reducer.js";
import { store } from "../store.js";

export function loadTodos() {
    const filterBy = store.getState().todoModule.filterBy
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return todoService.query(filterBy)
        .then(todos => {
            store.dispatch({ type: SET_TODOS, todos })
        })
        .catch(err => {
            console.log('Had issues loading todos', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}
export function removeTodoOptimistic(todoId) {
    store.dispatch({ type: REMOVE_TODO, todoId })
    return todoService.remove(todoId)
        .catch(err => {
            store.dispatch({ type: UNDO_TODOS })
            console.log('todo action -> Cannot remove todor', err)
            throw err
        })
}

export function removeTodo(todoId) {
    return todoService.remove(todoId)
        .then(() => {
            store.dispatch({ type: REMOVE_TODO, todoId })
        })
        .catch(err => {
            console.log('Had issues removing todo', err)
            throw err
        })
}

export function saveTodo(todo) {
    return todoService.save(todo)
        .then(savedTodo => {
            store.dispatch({ type: UPDATE_TODO, todo: savedTodo })
            return savedTodo
        })
        .catch(err => {
            console.log('Had issues saving todo', err)
            throw err
        })
}