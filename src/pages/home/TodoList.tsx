import { useState, useRef } from 'react'

interface Todo {
  id: number
  title: string
  completed: boolean
}

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const idCounterRef = useRef(0)  // 使用 useRef 保持计数器在重渲染之间的值

  const addTodo = ():void=> {
    const todo: Todo = {
      id: idCounterRef.current++,
      title: newTodo,
      completed: false
    }
    
    setTodos([...todos, todo])
    setNewTodo('')
  }

  return (
    <div>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => { setNewTodo(e.target.value); }}
        placeholder="输入新的待办事项"
      />
      <button onClick={addTodo}>添加</button>
      <div>数量：{idCounterRef.current}</div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  )
}