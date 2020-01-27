<template>
  <li class="movie-list__item" v-on:click="openPage">
    <img class="movie-list__poster" v-bind:src="image">
    <p>Release date: {{ this.date.getFullYear() }}</p>
    <!-- {{genres}} -->
    <p> <span v-for="genre in genres.slice(0, 3)" v-bind:key="genre.name">{{genre.name}} </span> </p>
    <h2 >{{ movie.title }}</h2>
    <!-- {{movie}} -->
    <!-- <img v-bind:src="require(this.image)" > -->
  </li>
</template>

<script>
import {mapGetters} from "vuex";

  export default {
    props: {
      movie: {
        type: Object,
        required: true
      },
    },
    data() {
      return {
        date: new Date(this.movie.release_date)
      };
    },
    methods: {
      ...mapGetters(["getConfig", "getGenres"]),
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
      },
      genres() {
        let allGenres = this.getGenres();
        let movieGenres = [];
        allGenres.forEach(genre => {
          for(let i = 0; i < this.movie.genre_ids.length; i++) {
            if(this.movie.genre_ids[i] === genre.id) {
              movieGenres.push(genre);
              break;
            }
          }
        });
        return movieGenres;
      }
    }
  };
</script>

<style>
  .movie-list__item {
    /* border: 1px solid #eeeeee; */
    width: 300px;
    margin: 0 auto;
  }
  .movie-list__poster {
    width: 300px;
    height: 400px;
  }
</style>
