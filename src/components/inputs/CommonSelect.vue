<template>
  <IonSelect
    class="commonSelect"
    :aria-label="ariaLabelValue"
    interface="popover"
    :placeholder="placeholder"
    :toggle-icon="add"
    :expanded-icon="remove"
    @ion-change="handleSelectChange"
  >
    <IonSelectOption
      v-for="option in options"
      :key="option.text"
      class="commonSelect__selectOption"
      :value="option.value"
    >
      {{ option.text }}
    </IonSelectOption>
  </IonSelect>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { IonSelect, IonSelectOption } from '@ionic/vue';
import { add, remove } from 'ionicons/icons';
import { IonSelectCustomEvent, SelectChangeEventDetail } from '@ionic/core';

defineProps({
  placeholder: {
    type: String,
    default: '',
  },
  ariaLabelValue: {
    type: String,
    default: '',
  },
  options: {
    type: Array as PropType<{ text: string; value: string }[]>,
    default: () => [],
  },
});

const emit = defineEmits<{
  selectValueChange: [string];
}>();

/** Handle new select value and emit new value outside */
const handleSelectChange = (
  event: IonSelectCustomEvent<SelectChangeEventDetail>,
): void => {
  emit('selectValueChange', event.detail.value);
};
</script>

<style scoped lang="scss">
.commonSelect {
  width: auto;
  height: auto;
  min-height: auto;
  padding: 11.5px 25px;

  background-color: $ColorAccentVariant;
  border-radius: 20px;

  font-family: $teachers;
  font-size: 0.875rem;
  font-weight: 500;
  color: $ColorWhite;
}
</style>
