<template>
  <section class="cast-info">
    <!-- {{crew}} -->
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
import CastMember from "@/components/CastMember";

export default {
  props: ["cast"],
  components: {
    CastMember
  }
}
</script>

<style>

</style>