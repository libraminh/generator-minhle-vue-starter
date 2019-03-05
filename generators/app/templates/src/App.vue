<template>
  <div>
    <% if (includeVueRouter) { %>
    <router-link to="/home">Home</router-link>
    <router-link to="/about">About</router-link>
    <% } %>
    
    <% if (includeVuex) { %>
    <!-- Module Todos Store -->
    <h3>Module Todos Store</h3>
    <ul>
      <li v-for="item in todos">{{item.title}} - {{item.completed}}</li>
    </ul>

    <!-- Todos Store -->
    <h3>Todos Store</h3>
    <ul>
      <li v-for="todos in completedTodos">{{todos.title}} - {{todos.completed}}</li>
    </ul>
    <button
      @click="updateTitleAction({
        newTitle: 'New Title Updated',
        id: 2
      })"
    >Change Title</button>
    <% } else { %>
    <hello-world></hello-world>
    <about></about>
    <% } %>

    <% if (includeVueRouter) { %>
    <router-view/>
    <% } %>
  </div>
</template>

<script>
<% if (includeVuex) { %>
import { mapGetters } from "vuex"
import { mapActions } from "vuex"
<% } else { %>
import HelloWorld from 'components/HelloWorld'
import About from 'components/About'
<% } %>
export default {
  name: `App`,
  data() {
    return {
      show: true
    };
  },
  <% if (!includeVuex) { %>
  components: {
    'hello-world': HelloWorld,
    'about': About
  }
  <% } %>
  <% if (includeVuex) { %>
  computed: {
    ...mapGetters(["completedTodos"]),
    todos() {
      // Get state data from Todos module (store/modules/Todos)
      return this.$store.state.Todos.todos;
    }
  },
  methods: {
    ...mapActions(["updateTitleAction"])
    // Trigger an action without mapActions
    // changeTitle() {
    //   this.$store.dispatch('updateTitleAction', {
    //     newTitle: 'New Title Updated',
    //     id: 2
    //   })
    // }
  }
  <% } %>
};
</script>


<style lang="scss">
</style>
