<template>
  <div
    class="headingButtonContainer"
    :class="noBackground ? 'headingButtonContainer--noBackground' : ''"
  >
    <SimpleHeading class="headingButtonContainer__heading">
      {{ heading }}
    </SimpleHeading>
    <div class="headingButtonContainer__buttonWrapper">
      <slot name="button" />
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import SimpleHeading from '@/components/ui/SimpleHeading.vue';

defineProps({
  heading: {
    type: String,
    default: '',
  },
  noBackground: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
.headingButtonContainer {
  position: relative;

  padding: 15px;

  background-color: $ColorBackground;
  border-radius: 20px;
  border: solid 1px rgba($ColorAccentVariant, 0.1);
  box-shadow: 0 0 15px rgba($ColorAccentVariant, 0.1);

  &--noBackground {
    background-color: transparent;
    box-shadow: none;
  }

  &__heading {
    margin-bottom: 23px;
  }

  &__buttonWrapper {
    position: absolute;
    top: 7px;
    right: 7px;
  }
}
</style>
