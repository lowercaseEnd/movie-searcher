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
    async mounted() {
        let images = await fetch("https://api.themoviedb.org/3/configuration?api_key=60e1831dec35a216fdaff508cdf5675c");
        let paths =  await images.json();
        // console.log(paths.images);
        // this.image = paths.images.secure_base_url + paths.images.backdrop_sizes[0] + this.movie.poster_path;
        this.config = paths.images;
        console.log(this.config);
    // this.image = paths.images;
  }
}
</script>