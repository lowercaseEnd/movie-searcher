<template>
  <ul class="pages-list">
    <li class="pages-list__item"
     v-for="page in pages" v-bind:key="page">
      <button type="button" class="pages-list__button"
      v-on:click="search(page)" v-bind:disabled="isCurrentPage(page)">{{page}}</button>
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
      window.scrollTo(0, 0);
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
        right = current + delta,
        range = [],
        rangeWithDots = [],
        l;
  
    range.push(1)  
    for (let i = left; i <= right; i++) {
        if (i < right + 1 && i < last && i > 1) {
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
  .pages-list {
    list-style: none;
    display: flex;
    flex-wrap: nowrap;
    width: 200px;
    margin: 0 auto;
  }
  .pages-list__item {
    margin-right: 20px;
  }
  .pages-list__button {
    border: none;
    background-color: #fff;
  }
</style>