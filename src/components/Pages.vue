<template>
  <ul>
    <li v-for="page in pages" v-bind:key="page">
      <button type="button" v-on:click="search(page)" v-bind:disabled="isCurrentPage(page)">{{page}}</button>
    </li>
  </ul>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  methods: {
    ...mapGetters(["getPages"]),
    ...mapActions(["setPage", "fetchMovieList"]),
    search(page) {
      this.setPage(page);
      this.fetchMovieList();
    },
    isCurrentPage(page) {
      return this.getPages().page === page;
    }
  },
  computed: {
    pages() {
       let current = this.getPages().page,
        last = this.getPages().total_pages,
        delta = 2,
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = [],
        l;
  
    range.push(1)  
    for (let i = left; i <= right - 1; i++) {
        if (i >= left && i < right && i < last && i > 1) {
        range.push(i);
        }
    }  
    range.push(last);

    for (let i of range) {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (i - l !== 1) {
                rangeWithDots.push('...');
            }
        }
        rangeWithDots.push(i);
        l = i;
    }

    return rangeWithDots;
    }
  }
}
</script>

<style>

</style>