import axios from "axios";

const API_KEY = "0d0deb580941abbdf883bcab9be78da5";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      isFavorite: false,
    }));
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};

export const getMovieById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
      },
    });
    return {
      id: response.data.id,
      title: response.data.title,
      overview: response.data.overview,
      release_date: response.data.release_date,
      vote_average: response.data.vote_average,
      poster_path: `https://image.tmdb.org/t/p/w500${response.data.poster_path}`,
      isFavorite: true,
    };
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};
