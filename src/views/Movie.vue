<template>
  <section class="movie-page">
    <Loader v-if="isLoading" />
    <div v-else class="movie-full">
      <div class="container">
        <h2 class="movie-full__title">{{ movie.title }}</h2>
        <p class="movie-full__info">
          <b>Genres</b>:
          <span v-for="genre in movie.genres" v-bind:key="genre.id"
            >{{ genre.name }}
          </span>
        </p>
        <p class="movie-full__info"><b>Release date</b>: {{ getDate() }}</p>
        <p class="movie-full__info"><b>Runtime</b>: {{ movie.runtime }} min</p>
        <p class="movie-full__info">
          <b>Budget</b>: {{ movie.budget }} <span class="dollar-sign">$</span>
        </p>
        <p class="movie-full__info"><b>Status</b>: {{ movie.status }}</p>
        <p class="movie-full__info">
          <b>IMDB link</b>: <a v-bind:href="url">{{ url }}</a>
        </p>
        <p class="movie-full__info movie-full__info--plot">
          {{ movie.overview }}
        </p>
        <p class="cast">Cast:</p>
        <Cast v-bind:cast="cast" />
        <button
          type="button"
          class="movie-full__favourites"
          title="Add to favourites"
          v-on:click="toggleFavourites"
        >
          <img v-lazy="heartIcon" />
        </button>
      </div>

      <img class="movie-poster" v-bind:src="image" />
    </div>
    <div v-if="recommendations.length > 0">
      <h2>Similar movies:</h2>
      <SimilarList class="recommendations" v-bind:moviesList="similar" />
      <h2>Recommended movies:</h2>
      <SimilarList
        class="recommendations"
        v-bind:moviesList="recommendations"
      />
    </div>
  </section>
</template>

<script>
  import { mapActions, mapGetters, mapState } from "vuex";
  const SimilarList = () => import("@/components/SimilarList");
  const Cast = () => import("@/components/Cast");
  const Loader = () => import("@/components/Loader");

  export default {
    data() {
      return {
        heartIcon: require("../assets/heart-icon-empty.svg")
      };
    },
    components: {
      SimilarList,
      Cast,
      Loader
    },
    methods: {
      ...mapActions(["fetchSimilarMovies", "fetchCast", "fetchMovieInfo"]),
      ...mapGetters([
        "getMovie",
        "getSimilarMovies",
        "getRecommendedMovies",
        "getCast",
        "getConfig"
      ]),
      getDate() {
        const monthsName = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ];
        let date = this.releaseDate.getDay() + " ";
        date += monthsName[this.releaseDate.getMonth()] + " ";
        date += this.releaseDate.getFullYear();
        return date;
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
      },
      checkNumber(string) {
        let num = +string;
        if (isNaN(num) && isNaN(parseInt(num))) {
          return false;
        }
        return true;
      }
    },
    mounted() {
      let local = localStorage.getItem("favourites");
      let parsed = JSON.parse(local) || {};
      if (parsed[this.$route.params.id]) {
        this.heartIcon = require("../assets/heart-icon-filled.svg");
      } else {
        this.heartIcon = require("../assets/heart-icon-empty.svg");
      }
    },
    beforeRouteEnter(to, from, next) {
      next(async vm => {
        await vm.fetchMovieInfo(vm.$route.params.id);
        await vm.fetchCast(vm.$route.params.id);
        if (vm.movie.status === "Released") {
          await vm.fetchSimilarMovies({
            id: vm.$route.params.id,
            key: "similar"
          });
          await vm.fetchSimilarMovies({
            id: vm.$route.params.id,
            key: "recommendations"
          });
        }
      });
    },
    computed: {
      releaseDate() {
        return new Date(this.movie.release_date);
      },
      image() {
        let config = this.getConfig();
        return (
          config.secure_base_url +
          config.backdrop_sizes[0] +
          this.movie.poster_path
        );
      },
      movie() {
        return this.getMovie();
      },
      url() {
        const imdbLink = "https://www.imdb.com/title/";
        return imdbLink + this.movie.imdb_id;
      },
      recommendations() {
        return this.getSimilarMovies();
      },
      similar() {
        return this.getRecommendedMovies();
      },
      cast() {
        return this.getCast();
      },
      isLoading() {
        return this.$store.getters.getLoadingState;
      }
    },
    watch: {
      $route(to, from) {
        this.$store.commit("changeLoadingState", true);
        if (!this.checkNumber(this.$route.params.id)) {
          this.$router.push({
            name: "not found"
          });
        } else {
          this.fetchMovieInfo(this.$route.params.id);
          this.fetchCast(this.$route.params.id);
          this.fetchSimilarMovies({
            id: this.$route.params.id,
            key: "similar"
          });
          this.fetchSimilarMovies({
            id: this.$route.params.id,
            key: "recommendations"
          });
          //this code will check if movie is in favourites on $route change
          let local = localStorage.getItem("favourites");
          let parsed = JSON.parse(local) || {};
          if (parsed[this.$route.params.id]) {
            this.heartIcon = require("../assets/heart-icon-filled.svg");
          } else {
            this.heartIcon = require("../assets/heart-icon-empty.svg");
          }
        }
        this.$store.commit("changeLoadingState", false);
      }
    }
  };
</script>

<style>
  .container {
    position: relative;
    margin-top: 20px;
  }
  @media (min-width: 831px) {
    .container {
      margin-top: 0;
    }
  }
  /*Styling button */
  .movie-full__favourites {
    position: absolute;
    top: -19px;
    left: 120px;
    width: 40px;
    height: 40px;
    padding: 0;
    border: none;
    background-color: transparent;
  }
  @media (min-width: 831px) {
    .movie-full__favourites {
      top: 430px;
      left: -300px;
    }
  }
  /****** */
  .recommendations {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 20px;
  }
  .movie-full {
    display: flex;
    width: 300px;
    flex-direction: column-reverse;
    margin: 0 auto;
    text-align: initial;
  }
  .movie-poster {
    display: block;
    width: 300px;
    height: 400px;
  }
  .movie-full__title {
    text-align: center;
  }
  .movie-page {
    /* background-color: #e3e7f1; */
    padding-top: 120px;
    color: #ffffff;
  }

  @media (min-width: 831px) {
    .movie-full {
      flex-direction: row-reverse;
      width: 700px;
    }
    .movie-full__info--plot {
      margin-top: 20px;
    }

    .movie-poster {
      margin-top: 29px;
    }
    .container {
      padding-left: 30px;
    }
  }

  @media (min-width: 1230px) {
    .movie-full {
      width: 1100px;
    }
  }
</style>
