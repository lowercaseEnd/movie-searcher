<template>
  <div>
    <button type="button" 
    v-on:click.prevent="toggleButton"
    v-bind:class=" {'active': isButtonActive }"></button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isButtonActive: false
    }
  },
  methods: {
    toggleButton() {
      this.isButtonActive = !this.isButtonActive;
    }
  }
}
</script>

<style lang="stylus" scoped>
  button {
    
  }
</style>