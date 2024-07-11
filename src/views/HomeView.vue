<template>
  <div>
    <div class="pt-4 mb-8 relative mr-3 ml-3">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search Movie Name"
        class="p-2 border bg-slate-300 border-gray-300 rounded-lg w-full"
      />
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-5"
      >
        <div
          v-for="movie in filteredMovies"
          :key="movie.id"
          class="relative p-4 bg-slate-300 shadow-md rounded-lg"
        >
          <router-link
            :to="{ name: 'MovieDetail', params: { id: movie.id } }"
            class="flex flex-col h-full"
          >
            <img
              :src="movie.poster_path"
              alt="Movie Poster"
              class="w-full h-48 object-fill mb-4 rounded-t-lg custom-img"
            />
            <span class="absolute top-2 right-2">
              <font-awesome-icon
                :icon="['fas', movie.isFavorite ? 'heart' : 'heart']"
                :class="[
                  'cursor-pointer',
                  { 'text-red-500': movie.isFavorite },
                ]"
                style="font-size: 30px"
                @click.stop.prevent="toggleFavorite(movie)"
              />
            </span>
            <div class="flex-1 flex flex-col justify-between">
              <div>
                <h2 class="text-lg font-semibold">{{ movie.title }}</h2>
                <p class="text-gray-600 line-clamp-3">{{ movie.overview }}</p>
              </div>
              <div class="mt-auto">
                <span
                  class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                >
                  {{ movie.release_date }}
                </span>
                <span
                  class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
                >
                  {{ movie.vote_average }}
                </span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <h5 class="pt-8 text-gray-400 text-sm">Developed by DENGE</h5>
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

<style scoped>
.custom-img {
  border-radius: 10px;
  image-rendering: auto;
}
</style>
