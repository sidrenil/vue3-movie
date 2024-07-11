<template>
  <nav class="mt-3">
    <router-link
      to="/"
      class="nav-link"
      :class="{ 'active-link': $route.path === '/' }"
      >| Home Page |
    </router-link>
    <router-link
      to="/favorites"
      class="nav-link"
      :class="{ 'active-link': $route.path === '/favorites' }"
    >
      | Favorites |</router-link
    >
  </nav>
</template>

<script setup></script>

<style scoped>
body {
  @apply bg-sky-950;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.nav-link {
  color: gray;
  text-decoration: none;
  padding: 10px;
  transition: color 0.3s;
}

.nav-link:hover {
  color: lightgray;
}

.active-link {
  font-weight: bold;
  color: white;
}
</style>
