<template>
  <div class="container mt-4">
    <div class="">
      <div class="col-md-6 order-md-2">
        <img :src="movie.poster_path" alt="Movie Poster" class="img-fluid" />
      </div>
      <div class="col-md-6 order-md-1">
        <div>
          <h1 class="text-5xl text-yellow-500">{{ movie.title }}</h1>
          <p class="lead text-yellow-200">{{ movie.overview }}</p>
          <div class="mt-4">
            <p class="text-yellow-500">
              <strong>Release Date:</strong> {{ movie.release_date }}
            </p>
            <p class="text-yellow-500">
              <strong>Vote Average:</strong> {{ movie.vote_average }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const movie = ref({});

onMounted(async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${route.params.id}`,
      {
        params: {
          api_key: "0d0deb580941abbdf883bcab9be78da5",
        },
      }
    );
    movie.value = {
      id: response.data.id,
      title: response.data.title,
      overview: response.data.overview,
      release_date: response.data.release_date,
      vote_average: response.data.vote_average,
      poster_path: `https://image.tmdb.org/t/p/w500${response.data.poster_path}`,
    };
  } catch (error) {
    console.error("API request error:", error);
  }
});
</script>

<style scoped>
.row {
  align-items: center;
}
</style>
