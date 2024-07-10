import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import Favorites from "../views/Favorites.vue";
import MovieDetail from "../views/MovieDetail.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: Favorites,
  },
  {
    path: "/movie/:id",
    name: "MovieDetail",
    component: MovieDetail,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
