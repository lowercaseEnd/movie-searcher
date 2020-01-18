<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" v-on:click.native="setFirstPage">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view v-if="dataReady" />
  </div>
</template>

<script>
  //60e1831dec35a216fdaff508cdf5675c - api code
  import {mapActions} from "vuex";


  export default {
    data() {
      return {
        dataReady: false
      }
    },
    methods: {
      ...mapActions(["setPage", "setQuery", "fetchMovieList", "fetchConfig"]),
      setFirstPage() {
        //when pressing home this will show 1st page of popular movies
        this.setPage(1);
        this.setQuery("");
        this.fetchMovieList();
      }
    },
    async created() {
      //download config if user doenst have one
        // const API_KEY = "60e1831dec35a216fdaff508cdf5675c";
        // let url = `https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`;
        // let res = await fetch(url);

        // let config = await res.json();
        // localStorage.setItem("config", JSON.stringify(config));
      await this.fetchConfig();
      this.dataReady = true;
    }
  }
</script>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>
