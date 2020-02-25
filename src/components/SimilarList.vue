<template>
  <ul class="similar-list">
    <SimilarMovie
      v-for="movie in moviesList.slice(0, 4)"
      v-bind:key="movie.id"
      v-bind:movie="movie"
    />
  </ul>
</template>

<script>
  const SimilarMovie = () => import("@/components/SimilarMovie");

  export default {
    props: ["moviesList"],
    components: {
      SimilarMovie
    }
  };
</script>

<style>
  .similar-list {
    list-style: none;
    display: flex;
    overflow-x: auto;
  }
</style>
