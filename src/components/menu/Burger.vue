<template>
  <div v-bind:class=" {'active': isButtonActive }">
    <button class="button-menu" type="button" 
    v-on:click.prevent="toggleButton"
    ></button>
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

<style>
  .button-menu {
    transition: transform .6s ease;
    cursor: pointer;
    width: 40px;
    height: 30px;
    padding: 0;
    margin: 0;
    background-color: transparent;
    border: none;
    position: relative;
    
  }
  .button-menu::after {
    content: "";
    position: absolute;
    top: 4px;
    left: 0;
    width: 40px;
    height: 3px;
    background-color: #fff;
    box-shadow: 0 10px 0 0 #fff, 0 20px 0 0 #fff;
    transition: transform .6s ease;
  }
  .active .button-menu {
    
  }
  .active .button-menu::after{
    box-shadow: none;
    top: 13px;
    transform: rotate(45deg);
  }
  .active .button-menu::before {
    content: "";
    position: absolute;
    top: 13px;
    left: 0;
    width: 40px;
    height: 3px;
    background-color: #fff;
    transition: transform .6s ease;
    transform: rotate(-45deg);
  }

</style>