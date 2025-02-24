import { todoService } from "../../services/todo.service.js";
import { ADD_TODO, REMOVE_TODO, SET_IS_LOADING, SET_TODOS, UNDO_TODOS, UPDATE_TODO } from "../reducers/todo.reducer.js";
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
// export function removeCarOptimistic(carId) {

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