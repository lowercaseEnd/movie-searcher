<template>
  <ul class="similar-list">
    <SimilarMovie
      v-for="movie in recommended.slice(0, 4)"
      v-bind:key="movie.id"
      v-bind:movie="movie"
    />
  </ul>
</template>

<script>
  import SimilarMovie from "@/components/SimilarMovie";

  export default {
    props: ["recommended"],
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
