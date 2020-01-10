<template>
  <li class="movie-list__item" v-on:click="openPage">
    <h2 >{{ movie.title }}</h2>
    <p>Release date: {{ this.date.getFullYear() }}</p>
    <img v-bind:src="image">
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
      config: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        image:
          this.config.images.secure_base_url +
          this.config.images.backdrop_sizes[0] +
          this.movie.poster_path,
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
