<template>
  <li class="movie-list__item" >
    <img v-on:click="openPage" class="movie-list__poster" v-lazy="image" />
    <p v-on:click="openPage">Release date: {{ this.date.getFullYear() }}</p>
    <p v-if="this.$route.name === 'home'">
      <span v-for="genre in genres.slice(0, 3)" v-bind:key="genre.name"
      >
      {{ genre.name }}
      </span>
    </p>
    <h2 class="movie-list__title" v-on:click="openPage">{{ movie.title }}</h2>
    <button
      type="button"
      class="movie-item__favourites"
      title="Add to favourites"
      v-on:click="toggleFavourites"
    >
      <img class="heart-icon" v-lazy="heartIcon" />
    </button>
  </li>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    props: {
      movie: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        date: new Date(this.movie.release_date),
        heartIcon: require("../assets/heart-icon-empty.svg")
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
      toggleFavourites() {
        let local = localStorage.getItem("favourites");
        let parsed = JSON.parse(local) || {};
        if (parsed[this.movie.id]) {
          this.heartIcon = require("../assets/heart-icon-empty.svg");
          delete parsed[this.movie.id];
        } else {
          this.heartIcon = require("../assets/heart-icon-filled.svg");
          parsed[this.movie.id] = this.movie;
        }
        localStorage.setItem("favourites", JSON.stringify(parsed));
      }
    },
    mounted() {
      let local = localStorage.getItem("favourites");
      let parsed = JSON.parse(local) || {};
      if (parsed[this.movie.id]) {
        this.heartIcon = require("../assets/heart-icon-filled.svg");
      } else {
        this.heartIcon = require("../assets/heart-icon-empty.svg");
      }
    },
    computed: {
      config() {
        return this.getConfig();
      },
      image() {
        if (this.movie.poster_path === null) {
          return "https://www.turfgrasssod.org/wp-content/themes/linstar/assets/images/default.jpg";
        }
        return (
          this.config.secure_base_url +
          this.config.backdrop_sizes[0] +
          this.movie.poster_path
        );
      },
      genres() {
        let allGenres = this.getGenres();
        let movieGenres = [];
        allGenres.forEach(genre => {
          for (let i = 0; i < this.movie.genre_ids.length; i++) {
            if (this.movie.genre_ids[i] === genre.id) {
              movieGenres.push(genre);
              break;
            }
          }
        });
        return movieGenres;
      },
    }
  };
</script>

<style>
  .heart-icon {
    width: 30px;
    height: 30px;
  }

  .movie-list__item {
    /* border: 1px solid #eeeeee; */
    width: 350px;
    margin: 0 auto;
    position: relative;
    background-color: rgb(53, 73, 94);
    color: #ffffff;
    min-height: 530px;
  }
  .movie-list__poster {
    width: 100%;
    height: 400px;
  }
  .movie-item__favourites {
    position: absolute;
    top: 490px;
    left: 0;
    border: none;
    padding: 0;
    background-color: transparent;
    width: 40px;
    height: 40px;
  }
  .movie-list__title {
    width: 300px;
    margin: 0 auto;
    padding-bottom: 20px
  }
</style>
