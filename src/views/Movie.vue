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
        <p class="movie-full__info"><b>Budget</b>: {{ movie.budget }}</p>
        <p class="movie-full__info">{{ movie.overview }}</p>
        {{ this.releaseDate.getFullYear() }}
        {{ this.releaseDate.getMonth() }}
        <p class="movie-full__info"><b>Status</b>: {{ movie.status }}</p>
        <p class="movie-full__info">
          IMDB link: <a v-bind:href="url">click</a>
        </p>
        <!-- {{ movie }} -->
      </div>

      <img class="movie-poster" v-bind:src="image" />
    </div>
    <Similar v-bind:similar="getSimilarMovies" />
    <!-- {{this.$route.params.id}} -->
  </section>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import Similar from "@/components/Similar";

  export default {
    data() {
      return {
        movie: {},
        url: ""
      };
    },
    components: {
      Similar
    },
    methods: mapActions(["fetchSimilarMovies"]),
    async mounted() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${this.$route.params.id}?api_key=60e1831dec35a216fdaff508cdf5675c&language=en-US`
      );
      const movie = await res.json();
      this.movie = movie;
      const imdbLink = "https://www.imdb.com/title/";
      this.url = imdbLink + this.movie.imdb_id;
      this.fetchSimilarMovies(this.$route.params.id);
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
      ...mapGetters(["getSimilarMovies"])
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
