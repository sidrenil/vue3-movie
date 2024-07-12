<template>
  <div class="flex items-center justify-center mt-10">
    <div class="flex container m-10">
      <div
        class="col-md-6 order-md-2 d-flex align-items-center justify-content-center"
      >
        <img
          :src="movie.poster_path"
          alt="Movie Poster"
          class="img-fluid custom-img"
        />
      </div>
      <div
        class="col-md-6 order-md-1 d-flex flex-column justify-content-center ml-10"
      >
        <div>
          <h1 class="text-5xl text-yellow-300 text-center">
            {{ movie.title }}
          </h1>
          <p class="lead text-yellow-200 mt-10 text-justify">
            {{ movie.overview }}
          </p>
          <div class="mt-4">
            <p class="text-yellow-500 mt-10 text-end">
              <strong>Release Date:</strong> {{ movie.release_date }}
            </p>
            <p class="text-yellow-500 text-end mr-10">
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
import { getMovieDetails } from "../api/movies";

const route = useRoute();
const movie = ref({});

onMounted(async () => {
  try {
    const movieId = route.params.id;
    movie.value = await getMovieDetails(movieId);
  } catch (error) {
    console.error("API request error:", error);
  }
});
</script>

<style scoped>
.custom-img {
  max-width: 500px;
  height: auto;
  border-radius: 20px;
}
</style>
