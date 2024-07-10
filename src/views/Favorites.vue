<template>
  <div>
    <h1>Favori Filmler</h1>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
    >
      <div
        v-for="movie in favoriteMovies"
        :key="movie.id"
        class="relative p-4 bg-white shadow-md rounded-lg"
      >
        <img
          :src="movie.poster_path"
          alt="Movie Poster"
          class="w-full h-48 object-cover mb-4 rounded-t-lg"
        />
        <span class="absolute top-2 right-2">
          <font-awesome-icon
            :icon="['fas', 'heart']"
            class="text-red-500 cursor-pointer"
          />
        </span>
        <h2 class="text-lg font-semibold">{{ movie.title }}</h2>
        <p class="text-gray-600 line-clamp-3">{{ movie.overview }}</p>
        <div class="mt-2">
          <span
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
            >{{ movie.release_date }}</span
          >
          <span
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
            >{{ movie.vote_average }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  favoriteMovies: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped></style>
