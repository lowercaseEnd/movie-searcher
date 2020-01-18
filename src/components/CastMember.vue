<template>
  <li>
    <img v-bind:src="image" />
    <h2>{{ castMember.name }}</h2>
  </li>
</template>

<script>
  import {mapState, mapGetters} from "vuex";

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
      ...mapGetters(["getConfig"])
    },
    computed: {
      image() {
        // let config = JSON.parse(localStorage.getItem("config"));
        let config = this.getConfig();
        return (
          config.secure_base_url +
          config.backdrop_sizes[0] +
          this.castMember.profile_path
        );
      }
    }
  };
</script>
