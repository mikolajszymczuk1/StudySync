<template>
  <div class="subjectsCalendar">
    <div class="subjectsCalendar__calendarGrid">
      <div
        class="subjectsCalendar__day subjectsCalendar__day--noLeftBorder"
      ></div>
      <div v-for="day in days" :key="day" class="subjectsCalendar__day">
        {{ day }}
      </div>
      <template v-for="hour in hours" :key="hour">
        <div class="subjectsCalendar__hour">{{ hour }}</div>
        <template v-for="quarter in 4" :key="quarter">
          <div
            v-for="day in days"
            :key="`${day}_${hour}_quarter${quarter}`"
            class="subjectsCalendar__cell"
          >
            <SubjectCard
              v-if="getSubject(day, hour, quarter)"
              :subject-data="getSubject(day, hour, quarter)!"
            />
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import Subject from '@/mod/subject/model/Subject';
import { WeekSubjects } from '@/types/commonTypes';
import { useSubjectStore } from '@/stores/subjectStore';

import SubjectCard from '@/components/cards/SubjectCard.vue';

const props = defineProps({
  subjects: {
    type: Object as PropType<WeekSubjects>,
    required: true,
  },
});

const subjectStore = useSubjectStore();

const days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const hours: string[] = [
  '7:00',
  '8:00',
  '9:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
];

/**
 * Try to find subject that match day,hour,quarter data
 * @param {string} day day
 * @param {string} hour hour
 * @param {number} quarter quarter
 * @returns {Subject | undefined} fond subject data object or undefined if not found
 */
const getSubject = (
  day: string,
  hour: string,
  quarter: number,
): Subject | undefined => {
  const minutes: number = (quarter - 1) * 15;
  return props.subjects[day as keyof WeekSubjects].find(
    (subject: Subject) =>
      subject.evenOdd === subjectStore.evenOdd &&
      subject.startTime ===
        `${hour.split(':')[0]}:${minutes !== 0 ? minutes : '00'}`,
  );
};
</script>

<style scoped lang="scss">
.subjectsCalendar {
  position: relative;
  width: 100%;
  height: 500px;

  background-color: $ColorWhite;
  border-radius: 20px;
  overflow: auto;
  scrollbar-width: none;
  border: solid 15px $ColorWhite;

  &::-webkit-scrollbar {
    display: none;
  }

  &__calendarGrid {
    $dayColumnWidth: 145px;
    $dayColumnHeight: 56px;
    $hourColumnWidth: 56px;
    $quarterRowHeight: 20px;

    display: grid;
    grid-template-columns: $hourColumnWidth repeat(5, $dayColumnWidth);
    grid-template-rows: $dayColumnHeight repeat(60, $quarterRowHeight);
    position: relative;
    min-width: calc($hourColumnWidth + 5 * $dayColumnWidth);
  }

  &__day {
    display: flex;
    justify-content: center;
    align-items: center;
    position: sticky;
    top: 0;

    background-color: $ColorWhite;
    border-bottom: solid 1px rgba($ColorAccentVariant, 0.06);
    border-left: solid 1px rgba($ColorAccentVariant, 0.06);
    border-right: solid 1px rgba($ColorAccentVariant, 0.06);

    text-align: center;
    color: $ColorAccentVariant;
    font-family: $teachers;
    font-weight: 600;

    z-index: 3;

    &--noLeftBorder {
      border-left: 0;
    }
  }

  &__hour {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    grid-row: span 4;
    padding: 5px 5px 0 0;

    position: sticky;
    left: 0;

    border-right: solid 1px rgba($ColorAccentVariant, 0.06);
    border-bottom: solid 1px rgba($ColorAccentVariant, 0.06);
    border-top: solid 1px rgba($ColorAccentVariant, 0.06);
    background-color: $ColorWhite;

    color: $ColorAccentVariant;
    font-family: $teachers;
    font-weight: 600;

    z-index: 2;
  }

  &__cell {
    position: relative;

    border: solid 1px rgba($ColorAccentVariant, 0.06);
    box-sizing: border-box;
  }
}
</style>
