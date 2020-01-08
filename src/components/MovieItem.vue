<template>
    <li class="movie-list__item">
        <h2>{{movie.title}}</h2>
        <p>Release date: {{movie.release_date}}</p>
        <img v-bind:src=image>
        {{movie}}
        {{config}}
        {{config.secure_base_url + config.backdrop_sizes[0] + movie.poster_path}}
        <img v-bind:src="require(`${config.secure_base_url}${config.backdrop_sizes[0]}${movie.poster_path}`)"
    </li>
</template>

<script>
export default {
    props: {
        movie: {
            type: Object,
            required: true
        },
        config: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            image: this.config.secure_base_url + this.config.backdrop_sizes[0] + this.movie.poster_path
        }
    }
}
</script>