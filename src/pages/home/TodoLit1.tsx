import { useState } from 'react'

interface Todo {
  id: number
  title: string
  completed: boolean
}

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  let idCounter = 0 // 问题：使用局部变量作为 id 计数器

  const addTodo = (): void => {
    const todo: Todo = {
      id: idCounter++, // 每次组件重新渲染时 idCounter 都会重置为 0
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
        onChange={(e) => {
          setNewTodo(e.target.value)
        }}
        placeholder="输入新的待办事项"
      />

      <button onClick={addTodo}>添加</button>
      <div>数量：{idCounter}</div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  )
}
