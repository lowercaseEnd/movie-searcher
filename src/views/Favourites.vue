<template>
  <section class="favourites">
    <ul class="favourites-list" v-if="favourites">
      <FavouriteItem 
        v-for="movie in favourites" v-bind:key="movie.id"
        v-bind:movie="movie"
      />
    </ul>
    <p v-else>No items were added</p>
  </section>  
</template>

<script>
import FavouriteItem from "@/components/FavouriteItem";

export default {
  components: {
    FavouriteItem
  },
  computed: {
    favourites() {
      return JSON.parse(localStorage.getItem("favourites"));
    }
  }
}
</script>

<style>
  .favourites-list {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
</style>