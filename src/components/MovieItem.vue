<template>
    <li class="movie-list__item">
        {{movie}}
    </li>
</template>

<script>
export default {
    props: {
        movie: {
            type: Object,
            required: true
        }
    }
}
</script>