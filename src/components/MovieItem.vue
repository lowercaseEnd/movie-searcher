<template>
  <li class="movie-list__item" v-on:click="openPage">
    <img v-bind:src="image">
    <p>Release date: {{ this.date.getFullYear() }}</p>
    <h2 >{{ movie.title }}</h2>
    <!-- {{movie}} -->
    <!-- <img v-bind:src="require(this.image)" > -->
  </li>
</template>

<script>
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
        return JSON.parse(localStorage.getItem("config"));
      },
      image() {
        if (this.movie.poster_path === null) {
          return 'https://www.turfgrasssod.org/wp-content/themes/linstar/assets/images/default.jpg';
        }
        return this.config.images.secure_base_url +
          this.config.images.backdrop_sizes[0] +
          this.movie.poster_path;
      }
    }
  };
</script>

<style>
  .movie-list__item {
    margin-right: 15px;
    width: 300px;
  }
</style>
