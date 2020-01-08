<template>
    <ul class="movie-list">
        <MovieItem 
            v-for="movie in movies"
            v-bind:key="movie.id"
            v-bind:movie="movie"
            v-bind:config="config"
        />
    </ul>
</template>

<script>
import MovieItem from "@/components/MovieItem";

export default {
    props: ["movies"],
    data() {
        return {
            config: {}
        }
    },
    components: {
        MovieItem
    },
    mounted() {
        if(localStorage.getItem("config") && JSON.stringify(localStorage.getItem("config")) !== JSON.stringify({})) {
          this.config = JSON.parse(localStorage.getItem("config"));
        }
    },
    watch: {
      async config() {
        const res = await fetch("https://api.themoviedb.org/3/configuration?api_key=60e1831dec35a216fdaff508cdf5675c");
        const config = await res.json();
        const parsed = JSON.stringify(config);
        localStorage.setItem("config", parsed);
        this.config = config;
      }
    }
    
}
</script>

<style>
    .movie-list {
      list-style: none;
        display: flex;
        flex-wrap: wrap;
        width: 1300px;
        margin: 0 auto;
        padding: 0;
    }
</style>