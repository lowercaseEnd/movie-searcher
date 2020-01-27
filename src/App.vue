<template>
  <div id="app">
    <div class="color-container">
      <div class="header-container">
        <nav class="nav-bar" id="nav">
          <router-link to="/" v-on:click.native="setFirstPage">
            <!-- <img class="logo" alt="TMDB logo" src="@/assets/tmdb-logo.png" -->
            <!-- /> -->
            TMDb Movie Search App
          </router-link>
          <router-link to="/favourites">
            favourites
          </router-link>
        </nav>
        <Search class="search-bar" />
      </div>
    </div>
    <Loader v-if="!dataReady" />
    <router-view v-else />
  </div>
</template>

<script>
  import { mapActions } from "vuex";
  import Search from "@/components/Search";
  import Loader from "@/components/Loader";

  export default {
    data() {
      return {
        dataReady: false
      };
    },
    components: {
      Search,
      Loader
    },
    methods: {
      ...mapActions(["setPage", "setQuery", "fetchMovieList", "fetchConfig", "fetchMovieGenres"]),
      setFirstPage() {
        //when pressing home this will show 1st page of popular movies
        this.setPage(1);
        this.setQuery("");
        this.fetchMovieList();
      }
    },
    async created() {
      //download config if user doenst have one
      await this.fetchConfig();
      await this.fetchMovieGenres();
      this.dataReady = true;
    }
  };
</script>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  body {
    padding: 0;
    margin: 0;
  }
  /* TEST */

/***
#393e46
#e5dfdf */
  #app {
    display: flex;
    flex-direction: column;
  }



  /* TEST */
  .nav-bar {
    padding: 30px;
  }
  .color-container {
    background-color: #3c4245;
    width: 100%;
  }

  #nav a {
    font-weight: bold;
    color: #ffffff;
  }

  #nav a.router-link-exact-active {
    color: #ffffff;
  }
  .logo {
    display: block;
    width: 200px;
    height: 100px;
  }
  .header-container {
    display: flex;
    width: 300px;
    justify-content: space-around;
    flex-wrap: wrap;
    margin: 0 auto;
  }
  .search-bar {
    /* order: 1; */
    width: 400px;
  }
  .nav-bar {
    /* order: 2; */
  }
  @media (min-width: 831px) {
    .header-container {
      width: 700px;
      justify-content: flex-start;
    }
    .search-bar {
      padding: 30px;
    }
    .nav-bar {
      padding-left: 0;
    }
  }
  @media (min-width: 1230px) {
    .header-container {
      width: 1100px;
    }
  }
</style>
