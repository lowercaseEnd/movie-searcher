<template>
  <li>
    <img v-bind:src="image" />
    <h2>{{ castMember.name }}</h2>
  </li>
</template>

<script>
  export default {
    props: {
      castMember: {
        type: Object
      }
    },
    data() {
      return {
        profilePic: ""
      }
    },
    computed: {
      image() {
        let config = JSON.parse(localStorage.getItem("config"));
        return (
          config.images.secure_base_url +
          config.images.backdrop_sizes[0] +
          this.castMember.profile_path
        );
      }
    }
  };
</script>
