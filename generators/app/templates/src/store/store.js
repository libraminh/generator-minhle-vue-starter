import Vue from 'vue'
import Vuex from 'vuex'

// Import Modules Store
import Todos from 'store/modules/Todos'

// Import Store
import * as actions from 'store/actions'
import * as getters from 'store/getters'
import * as mutations from 'store/mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    filter: 'all',
    todos: [
      {
        id: 3,
        title: 'Swimming',
        completed: false,
        editing: false
      },
      {
        id: 4,
        title: 'Badminton',
        completed: true,
        editing: false
      }
    ]
  },
  getters,
  mutations,
  actions,
  modules: {
    Todos
  }
})
