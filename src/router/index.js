import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import Movie from "@/views/Movie";
import NotFound from "@/components/NotFound";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/title/:id",
    name: "description page",
    component: Movie
  },
  {
    path: "/favourites",
    name: "favourites",
    component: Home
  },
  {
    path: "*",
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
