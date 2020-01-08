<template>
  <div class="similar">
    {{similar}}
  </div>
</template>

<script>
export default {
  props: ["similar"],
  computed: {
    image() {
      let config = JSON.parse(localStorage.getItem("config"));
      return config.images.secure_base_url + config.images.backdrop_sizes[0] + this.movie.poster_path;
    }
  }
}
</script>