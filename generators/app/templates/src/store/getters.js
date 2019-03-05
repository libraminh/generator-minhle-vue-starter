export const completedTodos = state => {
  return state.todos.filter(todo => todo.completed)
}