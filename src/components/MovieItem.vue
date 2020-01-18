<template>
  <li class="movie-list__item" v-on:click="openPage">
    <img class="movie-list__poster" v-bind:src="image">
    <p>Release date: {{ this.date.getFullYear() }}</p>
    <h2 >{{ movie.title }}</h2>
    <!-- {{movie}} -->
    <!-- <img v-bind:src="require(this.image)" > -->
  </li>
</template>

<script>
import {mapGetters} from "vuex";

  export default {
    props: {
      movie: {
        type: Object,
        required: true
      },
    },
    data() {
      return {
        date: new Date(this.movie.release_date)
      };
    },
    methods: {
      ...mapGetters(["getConfig"]),
      openPage() {
        this.$router.push({
          name: "description page",
          params: {
            id: this.movie.id
          }
        });
      },
    },
    computed: {
      config() {
        // return JSON.parse(localStorage.getItem("config"));
        return this.getConfig();
      },
      image() {
        if (this.movie.poster_path === null) {
          return 'https://www.turfgrasssod.org/wp-content/themes/linstar/assets/images/default.jpg';
        }
        return this.config.secure_base_url +
          this.config.backdrop_sizes[0] +
          this.movie.poster_path;
      }
    }
  };
</script>

<style>
  .movie-list__item {
    /* margin-right: 15px; */
    /* width: 300px; */
  }
  .movie-list__poster {
    width: 300px;
    height: 400px;
  }
</style>
