<template>
  <section class="sidebar">
    <div
      class="sidebar-backdrop"
      
      v-if="isPanelOpen"
    >
    </div>
    <transition name="slide">
      <div v-if="isPanelOpen" class="sidebar-panel">
        <ul class="sidebar-panel-nav">
              <li><router-link to="/" v-on:click.native="setFirstPage">Home</router-link></li>
              <li><router-link to="/favourites" v-on:click.native="reloadFavourites">Favourites</router-link></li>
            </ul>
      </div>
    </transition>
  </section>
</template>

<script>
  export default {
    methods: {
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

  .sidebar-backdrop {
    background-color: rgba(0, 0, 0, 0.5);
    width: 27vw;
    height: 90vh;
    position: fixed;
    top: 115px;
    left: 0;
    cursor: pointer;
  }

  .sidebar-panel {
    overflow-y: auto;
    background-color: #130f40;
    position: fixed;
    left: 0;
    top: 115px;
    height: 79vh;
    z-index: 999;
    padding: 3rem 20px 2rem 20px;
    width: 300px;
  }
</style>
