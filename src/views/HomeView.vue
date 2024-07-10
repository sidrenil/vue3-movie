<template>
  <div>
    <h1>Ana Sayfa</h1>
    <div class="mb-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Film ismi ara"
        class="p-2 border border-gray-300 rounded-lg w-full"
      />
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
    >
      <div
        v-for="movie in filteredMovies"
        :key="movie.id"
        class="relative p-4 bg-white shadow-md rounded-lg"
      >
        <router-link :to="{ name: 'MovieDetail', params: { id: movie.id } }">
          <img
            :src="movie.poster_path"
            alt="Movie Poster"
            class="w-full h-48 object-cover mb-4 rounded-t-lg"
          />
          <span class="absolute top-2 right-2">
            <font-awesome-icon
              :icon="['fas', movie.isFavorite ? 'heart' : 'heart']"
              :class="['cursor-pointer', { 'text-red-500': movie.isFavorite }]"
              @click.stop.prevent="toggleFavorite(movie)"
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
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const favoriteMovies = ref([]);
const searchQuery = ref("");

const filteredMovies = computed(() => {
  if (!searchQuery.value) {
    return favoriteMovies.value;
  }
  return favoriteMovies.value.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const toggleFavorite = (movie) => {
  movie.isFavorite = !movie.isFavorite;
  saveFavoritesToLocalStorage();
  if (movie.isFavorite) {
    console.log(`${movie.title} favorilere eklendi.`);
  } else {
    console.log(`${movie.title} favorilerden çıkarıldı.`);
  }
};

const saveFavoritesToLocalStorage = () => {
  const favoriteIds = favoriteMovies.value
    .filter((movie) => movie.isFavorite)
    .map((movie) => movie.id);
  localStorage.setItem("favoriteMovies", JSON.stringify(favoriteIds));
};

const loadFavoritesFromLocalStorage = () => {
  const favoriteIds = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
  favoriteMovies.value.forEach((movie) => {
    if (favoriteIds.includes(movie.id)) {
      movie.isFavorite = true;
    }
  });
};

onMounted(async () => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular",
      {
        params: {
          api_key: "0d0deb580941abbdf883bcab9be78da5",
        },
      }
    );
    favoriteMovies.value = response.data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      isFavorite: false,
      poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    }));
    loadFavoritesFromLocalStorage();
  } catch (error) {
    console.error("API request error:", error);
  }
});
</script>

<style scoped></style>
