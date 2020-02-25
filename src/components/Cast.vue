<template>
  <section class="cast-info">
    <ul class="cast-list">
      <CastMember
        v-for="castMember in cast.slice(0, 5)"
        v-bind:key="castMember.cast_id"
        v-bind:castMember="castMember"
      />
    </ul>
  </section>
</template>

<script>
const CastMember = () => import("@/components/CastMember");

export default {
  props: ["cast"],
  components: {
    CastMember
  }
}
</script>

<style>
  .cast-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
</style>