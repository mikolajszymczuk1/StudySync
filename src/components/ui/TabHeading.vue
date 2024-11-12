<template>
  <h1
    class="tabHeading"
    :class="largeBottomSpace ? 'tabHeading--largeBottomSpace' : ''"
  >
    <slot />
  </h1>
</template>

<script setup lang="ts">
defineProps({
  largeBottomSpace: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
.tabHeading {
  margin: 94px 0 60px 0;

  color: $ColorWhite;
  font-family: $teachers;
  font-weight: bold;
  font-size: 2.5rem;
  line-height: 40px;
  text-shadow: 0 2px 4px rgba($ColorAccentVariant, 0.1);

  &:deep(span) {
    color: $ColorAccentVariant;
  }

  &--largeBottomSpace {
    margin-bottom: 80px;
  }
}
</style>
