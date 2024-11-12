<template>
  <IonPage class="pageBase">
    <slot />
  </IonPage>
</template>

<script setup lang="ts">
import { IonPage } from '@ionic/vue';
</script>

<style scoped lang="scss">
.pageBase {
  background-image: url('/assets/pattern.png'),
    linear-gradient(
      100deg,
      rgba($ColorSecondary, 1) 0%,
      rgba($ColorPrimary, 1) 32%,
      rgba($ColorTertiary, 1) 100%
    );
  background-attachment: fixed;
  background-size: auto, cover;
  margin: 0;
}
</style>
