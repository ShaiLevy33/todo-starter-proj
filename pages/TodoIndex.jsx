const { useEffect } = React
const { useSelector, useDispatch } = ReactRedux
const { Link, useSearchParams } = ReactRouterDOM

import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { loadTodos, removeTodo, saveTodo } from '../store/actions/todo.actions.js'
import { SET_TODOS, SET_FILTER_BY, UPDATE_TODO, ADD_TODO } from '../store/reducers/todo.reducer.js'

export function TodoIndex() {

    // const [todos, setTodos] = useState(null)
    const todos = useSelector(storeState => {
        console.log('storeState:', storeState.todoModule.todos);
        return storeState.todoModule.todos
    })
    console.log('todos:', todos)
    const filterBy = useSelector(storeState => storeState.todoModule.filterBy)
    const isLoading = useSelector(storeState => storeState.todoModule.isLoading)

    const dispatch = useDispatch()

    // Special hook for accessing search-params:
    // const [searchParams, setSearchParams] = useSearchParams()

    // const defaultFilter = todoService.getFilterFromSearchParams(searchParams)

    // const [filterBy, setFilterBy] = useState(defaultFilter)

    useEffect(() => {
        // setSearchParams(filterBy)
        loadTodos(filterBy)
            // .then(todos => setTodos(todos))
            .catch(err => {
                console.eror('err:', err)
                showErrorMsg('Cannot load todos')
            })
    }, [filterBy])

    function onSetFilter(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }

    function onRemoveTodo(todoId) {
        removeTodo(todoId)
            .then(() => showSuccessMsg('Todo removed'))
            .catch(() => showErrorMsg('Cannot remove todo'))
    }


    function onToggleTodo(todo) {
        const todoToSave = { ...todo, isDone: !todo.isDone }
        todoService.save(todoToSave)
            .then((savedTodo) => {
                setTodos(prevTodos => prevTodos.map(currTodo => (currTodo._id !== todo._id) ? currTodo : { ...savedTodo }))
                showSuccessMsg(`Todo is ${(savedTodo.isDone) ? 'done' : 'back on your list'}`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot toggle todo ' + todoId)
            })
    }


    if (!todos) return <div>Loading...</div>
    return (
        <section className="todo-index">
            <TodoFilter filterBy={filterBy} onSetFilter={onSetFilter} />

            <div>
                <Link to="/todo/edit" className="btn" >Add Todo</Link>
            </div>

            <h2>Todos List</h2>
            {!isLoading
                ? <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo}
                />
                : <div>Loading..</div>
            }
            <hr />
            <h2>Todos Table</h2>
            <div style={{ width: '60%', margin: 'auto' }}>
                <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
            </div>
        </section >
    )
}