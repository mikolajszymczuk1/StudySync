<template>
  <div class="loadingScreen">
    <IonSpinner class="loadingScreen__spinner" name="crescent" />
  </div>
</template>

<script setup lang="ts">
import { IonSpinner } from '@ionic/vue';
</script>

<style scoped lang="scss">
.loadingScreen {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  &__spinner {
    width: 40px;
    height: 40px;

    color: $ColorAccent;
  }
}
</style>
