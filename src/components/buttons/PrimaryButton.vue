<template>
  <IonButton
    class="primaryButton"
    :class="[
      plusButton ? 'primaryButton--plusButton' : '',
      bordered ? 'primaryButton--bordered' : '',
    ]"
    @click="handleClick()"
  >
    <slot />
  </IonButton>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue';

defineProps({
  plusButton: {
    type: Boolean,
    default: false,
  },
  bordered: {
    type: Boolean,
    default: false,
  },
});

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

  &--plusButton {
    --border-radius: 50%;
    --padding-top: 11.5px;
    --padding-bottom: 11.5px;
    --padding-start: 0;
    --padding-end: 0;

    width: 40px;
  }

  &--bordered {
    background-color: transparent;
    border: solid 1px $ColorAccentVariant;

    color: $ColorAccentVariant;
  }

  &:deep(svg) {
    color: $ColorWhite;
    font-size: 1.0625rem;
  }
}
</style>
