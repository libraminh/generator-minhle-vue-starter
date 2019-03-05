import Vue from 'vue'
import App from 'App'
<% if (includeVueRouter) { %>
import router from 'router'
<% } %>
<% if (includeVuex) { %>
import store from 'store/store'
<% } %>

// export const bus = new Vue()
<% if (includeFontAwesome) { %>
// import font-awesome library
import 'font-awesome/css/font-awesome.css'
<% } %>
<% if (includeVue2Animate) { %>
// import animate.css library
import 'vue2-animate/dist/vue2-animate.min.css'
<% } %>

new Vue({
  <% if (includeVueRouter) { %>
  router,
  <% } %>
  <% if (includeVuex) { %>
  store,
  <% } %>
  render: h => h(App),
}).$mount(`#app`);
