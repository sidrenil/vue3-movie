<template>
  <div class="pt-6 mb-8 relative mr-3 ml-3 min-h-screen">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
    >
      <div
        v-if="paginatedFavorites.length === 0"
        class="col-span-full text-center text-white"
      >
        Favori filminiz bulunmamaktadır.
      </div>
      <div
        v-for="movie in paginatedFavorites"
        :key="movie.id"
        class="relative p-4 bg-slate-300 shadow-md rounded-lg flex flex-col justify-between"
      >
        <router-link :to="{ name: 'MovieDetail', params: { id: movie.id } }">
          <img
            :src="movie.poster_path"
            alt="Movie Poster"
            class="w-full h-48 object-cover mb-4 rounded-t-lg custom-img"
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
        <div class="mt-auto flex justify-center">
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
    <Pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @updatePage="updatePage"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { getMovieById } from "@/api/movies";
import Pagination from "@/components/Pagination.vue";

const favoriteMovies = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(12); // Sayfa başına gösterilecek film sayısı

const paginatedFavorites = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return favoriteMovies.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(favoriteMovies.value.length / itemsPerPage.value);
});

const updatePage = (page) => {
  currentPage.value = page;
};

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
