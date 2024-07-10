<template>
  <div>
    <h1>Favorite Movies</h1>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
    >
      <div
        v-for="movie in favoriteMovies"
        :key="movie.id"
        class="relative p-4 bg-white shadow-md rounded-lg"
      >
        <router-link :to="{ name: 'MovieDetail', params: { id: movie.id } }">
          <img
            :src="movie.poster_path"
            alt="Movie Poster"
            class="w-full h-48 object-cover mb-4 rounded-t-lg"
          />
        </router-link>
        <span class="absolute top-2 right-2">
          <font-awesome-icon
            :icon="['fas', 'heart']"
            :class="['cursor-pointer', { 'text-red-500': movie.isFavorite }]"
            @click="toggleFavorite(movie)"
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
import { ref, onMounted } from "vue";
import axios from "axios";

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
        favoriteIds.map((id) =>
          axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
            params: {
              api_key: "0d0deb580941abbdf883bcab9be78da5",
            },
          })
        )
      );
      favoriteMovies.value = responses.map((response) => ({
        id: response.data.id,
        title: response.data.title,
        overview: response.data.overview,
        release_date: response.data.release_date,
        vote_average: response.data.vote_average,
        isFavorite: true,
        poster_path: `https://image.tmdb.org/t/p/w500${response.data.poster_path}`,
      }));
    } catch (error) {
      console.error("API request error:", error);
    }
  } else {
    favoriteMovies.value = [];
  }
};

onMounted(loadFavoritesFromLocalStorage);
</script>

<style scoped></style>
