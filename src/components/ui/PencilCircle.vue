<template>
  <div class="pencilCircle">
    <FontAwesomeIcon class="pencilCircle__icon" :icon="faPencil" />
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
</script>

<style scoped lang="scss">
.pencilCircle {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 25px;
  min-width: 25px;
  height: 25px;

  background-color: $ColorAccent;
  border-radius: 50%;

  &__icon {
    color: $ColorWhite;
    font-size: 0.625rem;
  }
}
</style>
