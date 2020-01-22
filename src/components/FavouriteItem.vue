<template>
  <li v-on:click="openPage">
    <img class="movie-list__poster" v-bind:src="image">
    <h2 >{{ movie.title }}</h2>
  </li>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  props: {
    movie: {
      type: Object
    }
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
}
</script>