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
        <p class="movie-full__info">
          <b>Budget</b>: {{ movie.budget }} <span class="dollar-sign">$</span>
        </p>
        <p class="movie-full__info">{{ movie.overview }}</p>
        <p class="movie-full__info"><b>Release date</b>: {{ getDate() }}</p>
        <p class="movie-full__info"><b>Status</b>: {{ movie.status }}</p>
        <p class="movie-full__info">
          <b>IMDB link</b>: <a v-bind:href="url">{{ url }}</a>
        </p>
        {{ movie }}
      </div>

      <img class="movie-poster" v-bind:src="image" />
    </div>
    <h2>Similar Movies:</h2>
    <SimilarList v-bind:similar="getSimilarMovies" />
    <RecommendedMovies v-bind:recommended="getRecommendedMovies" />
    <!-- <router-view /> -->
  </section>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import SimilarList from "@/components/SimilarList";
  import RecommendedMovies from "@/components/RecommendedMovies";

  export default {
    data() {
      return {
        movie: {},
        url: ""
      };
    },
    components: {
      SimilarList,
      RecommendedMovies
    },
    methods: {
      ...mapActions(["fetchSimilarMovies"]),
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
    async mounted() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${this.$route.params.id}?api_key=60e1831dec35a216fdaff508cdf5675c&language=en-US`
      );
      const movie = await res.json();
      this.movie = movie;
      const imdbLink = "https://www.imdb.com/title/";
      this.url = imdbLink + this.movie.imdb_id;
      this.fetchSimilarMovies({id: this.$route.params.id, key: "similar"});
      this.fetchSimilarMovies({id: this.$route.params.id, key: "recommendations"});
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
      ...mapGetters(["getSimilarMovies", "getRecommendedMovies"])
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
