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
  const MovieItem = () => import("@/components/MovieItem");

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
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    grid-gap: 20px;
    padding: 0;
    margin-top: 160px;
  }
</style>
