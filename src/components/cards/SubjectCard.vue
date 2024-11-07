<template>
  <div
    class="subjectCard"
    :style="{ height: `${blockHeight}px` }"
    @click="setDetailsPopupOpen(true)"
  >
    <IonModal
      class="subjectCard__modal"
      :is-open="isDetailsPopupOpen"
      @did-dismiss="setDetailsPopupOpen(false)"
    >
      <IonContent class="subjectCard__modalContent">
        <div class="subjectCard__modalMainContent">
          <p class="subjectCard__name">Subject name</p>
          <div class="subjectCard__wrapper">
            <p class="subjectCard__text">Start: {{ subjectData.start }}</p>
            <p class="subjectCard__text">{{ subjectData.classNumber }}</p>
          </div>
          <p class="subjectCard__text">End: {{ subjectData.end }}</p>
        </div>
      </IonContent>
    </IonModal>
    <p class="subjectCard__name">Subject name</p>
    <div class="subjectCard__wrapper">
      <p class="subjectCard__text">Start: {{ subjectData.start }}</p>
      <p class="subjectCard__text">{{ subjectData.classNumber }}</p>
    </div>
    <p class="subjectCard__text">End: {{ subjectData.end }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType, type Ref, ref } from 'vue';
import { IonModal, IonContent } from '@ionic/vue';
import type { SubjectData } from '@/types/commonTypes';

const props = defineProps({
  subjectData: {
    type: Object as PropType<SubjectData>,
    required: true,
  },
});

const SINGLE_CELL_HEIGHT: number = 20;

const isDetailsPopupOpen: Ref<boolean> = ref(false);

/**
 * Calculate heigh of subject block
 * @returns {number} calculated height
 */
const blockHeight = computed<number>(() => {
  const [hourStart, minutesStart] = props.subjectData.start.split(':');
  const [hourEnd, minutesEnd] = props.subjectData.end.split(':');

  const quarters: number =
    (parseInt(hourEnd) - parseInt(hourStart)) * 4 +
    (parseInt(minutesEnd) - parseInt(minutesStart)) / 15;

  return quarters * SINGLE_CELL_HEIGHT;
});

/**
 * Set new state value for details popup
 * @param {boolean} value new state value for card modal
 */
const setDetailsPopupOpen = (value: boolean): void => {
  isDetailsPopupOpen.value = value;
};
</script>

<style scoped lang="scss">
.subjectCard {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px;

  background-color: $lightBlue;
  overflow: hidden;
  border-radius: 6px;

  z-index: 1;

  &__modal {
    --width: 250px;
    --height: 150px;
    --border-radius: 15px;
  }

  &__modalContent {
    --background: white;
  }

  &__modalMainContent {
    padding: 15px;
  }

  &__name {
    margin: 0 0 3px 0;

    font-family: $teachers;
    font-size: 0.875rem;
    color: $darkMaroon;
    font-weight: 500;
  }

  &__wrapper {
    display: flex;
    justify-content: space-between;

    margin-bottom: 3px;
  }

  &__text {
    margin: 0;

    font-family: $teachers;
    font-size: 0.75rem;
    color: $darkMaroon;
  }
}
</style>
