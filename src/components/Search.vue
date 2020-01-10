<template>
  <form v-on:submit.prevent="">
    <input type="text" v-model.trim="input" placeholder="Search">
    <button type="submit"></button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      input: ""
    }
  },
  methods: {

  }
}
</script>