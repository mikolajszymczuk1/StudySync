<template>
  <IonButton class="primaryButton" @click="handleClick()">
    <slot />
  </IonButton>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue';

const emit = defineEmits<{
  clickAction: [];
}>();

const handleClick = (): void => {
  emit('clickAction');
};
</script>

<style scoped lang="scss">
.primaryButton {
  --border-radius: 20px;
  --background: transparent;
  --padding-start: 25px;
  --padding-end: 25px;
  --padding-top: 13px;
  --padding-bottom: 13px;

  height: auto;
  min-height: auto;
  margin: 0;

  background-color: $ColorAccentVariant;
  border-radius: 20px;

  font-family: $teachers;
  text-transform: none;
  font-weight: 500;
  color: $ColorWhite;
  font-size: 0.875rem;
}
</style>
