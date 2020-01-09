<template>
  <ul class="similar-list">
    <SimilarMovie
      v-for="movie in similar"
      v-bind:key="movie.id"
      v-bind:movie="movie"
    />
  </ul>
</template>

<script>
  import SimilarMovie from "@/components/SimilarMovie";

  export default {
    props: ["similar"],
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
