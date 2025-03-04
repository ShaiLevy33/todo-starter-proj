import { TodoPreview } from "./TodoPreview.jsx"
const { Link } = ReactRouterDOM

export function TodoList({ todos, onRemoveTodo, onToggleTodo }) {

    const isShowMessage = todos.length === 0
    if (isShowMessage) return <h2 style={{ color: 'red' }} >No Todos To Show</h2>

    return (
        <ul className="todo-list">
            {todos.map(todo =>
                <li key={todo._id} style={{ backgroundColor: todo.backGroundColor }}>
                    <TodoPreview todo={todo} onToggleTodo={() => onToggleTodo(todo)} />
                    <section>
                        <button onClick={() => { if (window.confirm('Delete the item?')) onRemoveTodo(todo._id) }}>Remove</button>
                        <button><Link to={`/todo/${todo._id}`}>Details</Link></button>
                        <button><Link to={`/todo/edit/${todo._id}`}>Edit</Link></button>
                    </section>
                </li>
            )}
            <div>
                {isShowMessage} 
            </div>
        </ul>

    )
}