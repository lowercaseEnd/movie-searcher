<template>
  <section class="sidebar">
    <transition name="slide">
      <div v-if="isPanelOpen" class="sidebar-panel">
        <ul class="sidebar-panel-nav">
              <li class="panel-nav__item"><router-link to="/" v-on:click.native="setFirstPage">Home</router-link></li>
              <li class="panel-nav__item"><router-link to="/favourites" v-on:click.native="reloadFavourites">Favourites</router-link></li>
            </ul>
      </div>
    </transition>
  </section>
</template>

<script>
import { mapActions } from "vuex";

  export default {
    methods: {
      ...mapActions([
        "setPage",
        "setQuery",
        "fetchMovieList",
      ]),
      toggleSidebar() {
        this.isPanelOpen = !this.isPanelOpen;
      },
      setFirstPage() {
        //when pressing home this will show 1st page of popular movies
        this.setPage(1);
        this.setQuery("");
        this.fetchMovieList();
      },
      reloadFavourites() {
        if (this.$route.name === "favourites") {
          this.$router.go();
        }
      }
    },
    computed: {
      isPanelOpen() {
        return this.$store.getters.getButtonState;
      }
    }
  };
</script>

<style>
  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.2s ease;
  }
  .slide-enter,
  .slide-leave-to {
    transform: translateX(-100%);
    transition: all 150ms ease-in 0s;
  }
  .sidebar-panel {
    overflow-y: auto;
    background-color: #424242;
    position: absolute;
    left: 0;
    top: 148px;
    height: 86vh;
    z-index: 999;
    width: 300px;
  }
  @media (min-width: 400px) {
    .sidebar-panel {
      top: 94px;
      height: 91vh;
    }
  }
  .sidebar-panel-nav {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: left;
  }
  .panel-nav__item {
    text-transform: uppercase;
    position: relative;
    width: 250px;
    margin: 0 auto;
    padding: 20px;
  }
  /* .panel-nav__item:nth-child(1)::before {
    content: "";
    width: 30px;
    height: 30px;
    position: absolute;
    top: 0;
    left: 0;
    background-image: url("../../assets/home-icon.svg");
    background-repeat: no-repeat;
    background-size: contain;
  }
  .panel-nav__item:nth-child(2)::before {
    content: "";
    width: 30px;
    height: 30px;
    position: absolute;
    top: 0;
    left: 0;
    background-image: url("../../assets/heart-icon-filled.svg");
    background-repeat: no-repeat;
    background-size: contain;
  } */
</style>
