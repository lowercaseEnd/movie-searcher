<template>
  <section class="movie-page">
    <div class="movie-full">
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
        <p class="movie-full__info">{{ movie.overview }}</p>
        <p class="movie-full__info"><b>Status</b>: {{ movie.status }}</p>
        <p class="movie-full__info">
          <b>IMDB link</b>: <a v-bind:href="url">{{ url }}</a>
        </p>
        <Cast v-bind:cast="cast" />
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

    <!-- <router-view /> -->
  </section>
</template>

<script>
  import { mapActions, mapGetters, mapState } from "vuex";
  import SimilarList from "@/components/SimilarList";
  import Cast from "@/components/Cast";

  export default {
    data() {
      return {
        // movie: {},
        // url: ""
      };
    },
    components: {
      SimilarList,
      Cast
    },
    methods: {
      ...mapActions(["fetchSimilarMovies", "fetchCast", "fetchMovieInfo"]),
      ...mapGetters(["getMovie", "getSimilarMovies", "getRecommendedMovies", "getCast"]),
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
      }
    },
    mounted() {
      this.fetchMovieInfo(this.$route.params.id);
      this.fetchCast(this.$route.params.id);
    },
    computed: {
      releaseDate() {
        return new Date(this.movie.release_date);
      },
      image() {
        let config = JSON.parse(localStorage.getItem("config"));
        return (
          config.images.secure_base_url +
          config.images.backdrop_sizes[0] +
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
        if (this.movie.status === "Released") {
          this.fetchSimilarMovies({
            id: this.$route.params.id,
            key: "similar"
          });
        }
        return this.getSimilarMovies();
      },
      similar() {
        if (this.movie.status === "Released") {
          this.fetchSimilarMovies({
            id: this.$route.params.id,
            key: "recommendations"
          });
        }
        return this.getRecommendedMovies();
      },
      cast() {
        this.fetchCast(this.$route.params.id);
        return this.getCast();
      }
    }
  };
</script>

<style>
  .movie-full {
    display: flex;
    width: 800px;
    flex-direction: row-reverse;
    margin: 0 auto;
    text-align: initial;
  }
  .movie-poster {
    display: block;
    width: 300px;
    height: 400px;
  }
  .container {
    width: 500px;
    margin-left: 70px;
  }
  .movie-full__title {
    text-align: center;
  }
</style>
