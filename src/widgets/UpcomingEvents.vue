<template>
  <div class="upcomingEvents"></div>
</template>

<script setup lang="ts">
defineProps({
  events: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.upcomingEvents {
}
</style>
