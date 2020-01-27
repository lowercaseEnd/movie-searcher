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
          v-on:click="addToFavourites"
        >
          Add
        </button>
        <!-- {{ movie }} -->
      </div>

      <img class="movie-poster" v-bind:src="image" />
    </div>
    <div v-if="recommendations.length > 0">
      <h2>Similar movies:</h2>
      <SimilarList v-bind:moviesList="similar" />
      <h2>Recommended movies:</h2>
      <SimilarList v-bind:moviesList="recommendations" />
    </div>
  </section>
</template>

<script>
  import { mapActions, mapGetters, mapState } from "vuex";
  import SimilarList from "@/components/SimilarList";
  import Cast from "@/components/Cast";
  import Loader from "@/components/Loader";

  export default {
    data() {
      return {};
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
      addToFavourites() {
        let local = localStorage.getItem("favourites");
        let parsed = {};
        if (local) {
          parsed = JSON.parse(local);
        }
        if(parsed[this.movie.id]) {
          delete(parsed[this.movie.id]);
        } else {
          parsed[this.movie.id] = this.movie;
        }
        localStorage.setItem("favourites", JSON.stringify(parsed));
      }
    },
    async mounted() {
      await this.fetchMovieInfo(this.$route.params.id);
      await this.fetchCast(this.$route.params.id);
      if (this.movie.status === "Released") {
        await this.fetchSimilarMovies({
          id: this.$route.params.id,
          key: "similar"
        });
        await this.fetchSimilarMovies({
          id: this.$route.params.id,
          key: "recommendations"
        });
      }
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
        this.$store.commit("changeLoadingState", false);
      }
    }
  };
</script>

<style>
  .movie-full {
    display: flex;
    width: 300px;
    /* flex-direction: row-reverse; */
    flex-direction: column-reverse;
    margin: 0 auto;
    text-align: initial;
    /* display: grid; */
    /* grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); */
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
    padding-top: 20px;
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
