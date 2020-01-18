<template>
  <li v-on:click="openPage">
    <!-- {{ movie }} -->
    <img v-bind:src="image" />
    <h3>{{ movie.title }}</h3>
  </li>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";
  export default {
    props: {
      movie: {
        type: Object
      }
    },
    methods: {
      ...mapActions(["fetchMovieInfo"]),
      ...mapGetters(["getConfig"]),
      openPage() {
        this.$router.push({
          name: "description page",
          params: { id: this.movie.id }
        });
        this.fetchMovieInfo(this.$route.params.id);
        window.scrollTo(0, 0);
      }
    },
    computed: {
      image() {
        // let config = JSON.parse(localStorage.getItem("config"));
        let config = this.getConfig();
        return (
          config.secure_base_url +
          config.backdrop_sizes[0] +
          this.movie.poster_path
        );
      }
    }
  };
</script>
