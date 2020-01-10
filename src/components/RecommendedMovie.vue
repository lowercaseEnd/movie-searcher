<template>
  <li v-on:click="openPage">
    <!-- {{ movie }} -->
    <img v-bind:src="image" />
    <h3>{{ movie.title }}</h3>
  </li>
</template>

<script>
  export default {
    props: {
      movie: {
        type: Object
      }
    },
    methods: {
      openPage() {
        console.log(this);
        this.$router.push({
          name: "description page",
          params: { id: this.movie.id }
        });
        this.$router.go(0);
      }
    },
    computed: {
      image() {
        let config = JSON.parse(localStorage.getItem("config"));
        return (
          config.images.secure_base_url +
          config.images.backdrop_sizes[0] +
          this.movie.poster_path
        );
      }
    }
  };
</script>
