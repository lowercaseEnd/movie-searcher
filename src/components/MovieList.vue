<template>
  <ul class="movie-list">
    <MovieItem
      v-for="movie in movies"
      v-bind:key="movie.id"
      v-bind:movie="movie"
    />
  </ul>
</template>

<script>
  import MovieItem from "@/components/MovieItem";

  export default {
    props: ["movies"],
    components: {
      MovieItem
    }
  };
</script>

<style>
  .movie-list {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    padding: 0;
  }
</style>
