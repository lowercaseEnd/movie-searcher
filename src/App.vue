<template>
  <div class="app" id="app">
    <div class="color-container">
      <div class="header-container">
        <nav class="nav-bar" id="nav">
          <Burger />
          <Sidebar />
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
  import Burger from "@/components/menu/Burger";
  import Sidebar from "@/components/menu/Sidebar";

  export default {
    data() {
      return {
        dataReady: false
      };
    },
    components: {
      Search,
      Loader,
      Burger,
      Sidebar
    },
    methods: {
      ...mapActions([
        "fetchConfig",
        "fetchMovieGenres"
      ])
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
  .project-name {
    display: none;
  }
  /* TEST */
  .router-link-exact-active {
    color: blue;
  }
  /***
#393e46
#e5dfdf */
  .app {
    display: flex;
    flex-direction: column;
    background-color: #303030;
  }

  /* TEST */
  .nav-bar {
    padding: 30px;
  }
  .color-container {
    position: fixed;
    z-index: 999;
    background-color: rgb(66, 184, 131);
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
    width: 100%;
    justify-content: space-around;
    flex-wrap: wrap;
    margin: 0 auto;
  }
  .search-bar {
    width: 90%;
  }
  @media (min-width: 400px) {
    .search-bar {
      margin-top: 30px;
      width: 70%;
    }
  }
</style>
