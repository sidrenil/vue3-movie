<template>
  <nav class="mt-3 flex items-center justify-between px-4">
    <button
      v-if="showBackButton"
      @click="goBack"
      class="bg-gray-500 text-white py-2 px-4 rounded-full"
    >
      <font-awesome-icon :icon="['fas', 'arrow-left']" />
    </button>
    <div class="flex-grow text-center">
      <router-link
        to="/"
        class="nav-link text-gray-500 no-underline p-2 transition-color duration-300"
        :class="{ 'active-link': $route.path === '/' }"
        >| Home Page |
      </router-link>
      <router-link
        to="/favorites"
        class="nav-link text-gray-500 no-underline p-2 transition-color duration-300"
        :class="{ 'active-link': $route.path === '/favorites' }"
      >
        | Favorites |
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const goBack = () => {
  router.back();
};

const showBackButton = computed(() => {
  const hiddenRoutes = ["/"];
  return !hiddenRoutes.includes(route.path);
});
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

.nav-link:hover {
  color: lightgray;
}

.active-link {
  font-weight: bold;
  color: white;
}
</style>
