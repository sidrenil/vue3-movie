<template>
  <div class="mt-10">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
    >
      <div
        v-for="movie in favoriteMovies"
        :key="movie.id"
        class="relative p-4 bg-slate-300 shadow-md rounded-lg"
      >
        <router-link :to="{ name: 'MovieDetail', params: { id: movie.id } }">
          <img
            :src="movie.poster_path"
            alt="Movie Poster"
            class="w-full h-48 o0,bject-cover mb-4 rounded-t-lg custom-img"
          />
        </router-link>
        <span class="absolute top-2 right-2">
          <font-awesome-icon
            :icon="['fas', 'heart']"
            :class="['cursor-pointer', { 'text-red-500': movie.isFavorite }]"
            style="font-size: 30px"
            @click="toggleFavorite(movie)"
          />
        </span>
        <h2 class="text-lg font-semibold">{{ movie.title }}</h2>
        <p class="text-gray-600 line-clamp-3">{{ movie.overview }}</p>
        <div class="mt-auto">
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
    <footer
      class="bottom-0 left-0 w-full pt-8 text-gray-400 text-sm text-center pb-3 bg-transparent"
    >
      Developed by DENGE
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { getMovieById } from "@/api/movies";

const favoriteMovies = ref([]);

const toggleFavorite = (movie) => {
  movie.isFavorite = !movie.isFavorite;
  if (movie.isFavorite) {
    console.log(`${movie.title} favorilere eklendi.`);
  } else {
    console.log(`${movie.title} favorilerden çıkarıldı.`);
  }
  saveFavoritesToLocalStorage();
  loadFavoritesFromLocalStorage();
};

const saveFavoritesToLocalStorage = () => {
  const favoriteIds = favoriteMovies.value
    .filter((movie) => movie.isFavorite)
    .map((movie) => movie.id);
  localStorage.setItem("favoriteMovies", JSON.stringify(favoriteIds));
};

const loadFavoritesFromLocalStorage = async () => {
  const favoriteIds = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
  if (favoriteIds.length > 0) {
    try {
      const responses = await Promise.all(
        favoriteIds.map((id) => getMovieById(id))
      );

      favoriteMovies.value = responses;
    } catch (error) {
      console.error("API request error:", error);
    }
  } else {
    favoriteMovies.value = [];
  }
};

onMounted(loadFavoritesFromLocalStorage);
</script>

<style scoped>
.custom-img {
  border-radius: 10px;
}
</style>
