<template>
  <div class="evenOddCalendarToggle">
    <div class="evenOddCalendarToggle__calendarHeading">Class shedule</div>
    <CommonSelect
      v-model="subjectStore.evenOdd"
      placeholder="Even/Odd"
      aria-label-value="EvenOdd"
      :options="evenOddSelectOptions"
    />
  </div>
</template>

<script setup lang="ts">
import type { SelectOption } from '@/types/commonTypes';
import { useSubjectStore } from '@/stores/subjectStore';

import CommonSelect from '@/components/inputs/CommonSelect.vue';

const subjectStore = useSubjectStore();

const evenOddSelectOptions: SelectOption[] = [
  { text: 'Even', value: 'even' },
  { text: 'Odd', value: 'odd' },
];
</script>

<style scoped lang="scss">
.evenOddCalendarToggle {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-left: 15px;

  background-color: rgba($ColorWhite, 0.1);
  border-radius: 20px;

  &__calendarHeading {
    color: $ColorWhite;
    font-family: $teachers;
    font-weight: 600;
  }
}
</style>
