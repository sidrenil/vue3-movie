<template>
  <nav class="mt-3 flex items-center justify-between px-4">
    <button
      @click="goBack"
      class="bg-gray-500 text-white py-2 px-4 rounded-full"
    >
      <font-awesome-icon :icon="['fas', 'arrow-left']" />
    </button>
    <div class="flex-grow text-center">
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
        | Favorites |
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const goBack = () => {
  router.back();
};
</script>

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
