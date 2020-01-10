<template>
  <li v-on:click="show">
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
    methods: {
      show() {
        console.log(this.image);
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
