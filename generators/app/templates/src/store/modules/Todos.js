const state = {
  todos: [
    {
      id: 1,
      title: 'Finish Vue Screencast',
      completed: false,
      editing: false
    },
    {
      id: 2,
      title: 'Take over world',
      completed: true,
      editing: false
    }
  ]
}

const getters = {
  todosCompleted: state => {
    return state.todos.filter(todo => todo.completed)
  }
}

const mutations = {
  updateTitle: (state, payload) => {
    const { id, newTitle } = payload

    return state.todos.map(todo => todo.id === id ? todo.title = newTitle : todo)
  }
}

const actions = {
  // Update Title after 2s
  updateTitleAction: ({commit}, payload) => {
    setTimeout(() => {
      commit('updateTitle', payload)
    }, 2000)
  }
}

export default {
  state, getters, mutations, actions
}