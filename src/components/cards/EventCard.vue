<template>
  <div class="eventCard">
    <div class="eventCard__name">{{ name }}</div>
    <div class="eventCard__eventDate">{{ eventDate }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  name: {
    type: String,
    default: '',
  },
  eventDate: {
    type: String,
    default: '',
  },
});
</script>

<style scoped lang="scss">
.eventCard {
  &__name {
  }

  &__eventDate {
  }
}
</style>
