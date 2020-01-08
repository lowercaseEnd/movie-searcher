<template>
    <ul class="movie-list">
        <MovieItem 
            v-for="movie in movies"
            v-bind:key="movie.id"
            v-bind:movie="movie"
        />
    </ul>
</template>

<script>
import MovieItem from "@/components/MovieItem";

export default {
    props: ["movies"],
    components: {
        MovieItem
    }
}
</script>