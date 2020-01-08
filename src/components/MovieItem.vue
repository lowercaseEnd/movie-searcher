<template>
    <li class="movie-list__item">
        <h2>{{movie.title}}</h2>
        <p>Release date: {{this.date.getFullYear()}}</p>
        <img v-bind:src=image>
        <!-- {{movie}} -->
        <!-- {{config}} -->
        <!-- {{config.secure_base_url + config.backdrop_sizes[0] + movie.poster_path}} -->
        <!-- `${config.secure_base_url}${config.backdrop_sizes[0]}${movie.poster_path}` -->
        <img v-bind:src="require(this.image)"
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
            image: this.config.images.secure_base_url + this.config.images.backdrop_sizes[0] + this.movie.poster_path,
            date: new Date(this.movie.release_date)
        }
    },
    mounted() {
      console.log("1" + JSON.stringify(this.config));
      // let temp = JSON.parse(this.config);
      // console.log("temp" + temp);
      // this.image = 
    }
}
</script>