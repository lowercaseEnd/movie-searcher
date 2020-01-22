import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import Movie from "@/views/Movie";
import NotFound from "@/components/NotFound";
import Favourites from "@/views/Favourites";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "@/views/About.vue")
  },
  {
    path: "/title/:id",
    name: "description page",
    component: Movie
  },
  {
    path: "/favourites",
    name: "favourites",
    component: Favourites
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
