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
          <p class="subjectCard__name">{{ subjectData.name }}</p>
          <div class="subjectCard__wrapper">
            <p class="subjectCard__text">Start: {{ subjectData.startTime }}</p>
            <p class="subjectCard__text">End: {{ subjectData.endTime }}</p>
            <p class="subjectCard__text">{{ subjectData.classNumber }}</p>
          </div>
        </div>
      </IonContent>
    </IonModal>
    <p class="subjectCard__name">{{ subjectData.name }}</p>
    <div class="subjectCard__wrapper">
      <p class="subjectCard__text">Start: {{ subjectData.startTime }}</p>
      <p class="subjectCard__text">End: {{ subjectData.endTime }}</p>
      <p class="subjectCard__text">{{ subjectData.classNumber }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType, type Ref, ref } from 'vue';
import { IonModal, IonContent } from '@ionic/vue';
import Subject from '@/mod/subject/model/Subject';

const props = defineProps({
  subjectData: {
    type: Object as PropType<Subject>,
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
  const [hourStart, minutesStart] = props.subjectData.startTime.split(':');
  const [hourEnd, minutesEnd] = props.subjectData.endTime.split(':');

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
  padding: 6px;

  background-color: $ColorTertiary;
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
    margin: 0 0 6px 0;
    padding: 4px 0;

    background-color: $ColorAccentVariant;
    border-radius: 6px;

    font-family: $teachers;
    font-size: 0.875rem;
    color: $ColorWhite;
    text-align: center;
    font-weight: 500;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 10px;

    background-color: transparent;
  }

  &__text {
    margin: 0;

    font-family: $teachers;
    font-size: 0.75rem;
    color: $ColorAccentVariant;
    font-weight: 500;
  }
}
</style>
