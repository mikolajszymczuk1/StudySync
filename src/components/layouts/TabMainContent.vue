<template>
  <div
    class="tabMainContent"
    :class="noPadding ? 'tabMainContent--noPadding' : ''"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps({
  noPadding: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
.tabMainContent {
  position: relative;
  padding: 0 15px;

  &--noPadding {
    padding: 0;
  }
}
</style>
