<template>
  <PageBase class="tabGrades">
    <IonContent :fullscreen="true">
      <TabMainContent>
        <TabHeading>
          Manage <br />
          your <span>grades</span>
        </TabHeading>
        <div class="tabGrades__avgGrade">
          <div class="tabGrades__avgGradeValue">{{ avgGrade }}</div>
          <div class="tabGrades__avgGradeText">Your average grade</div>
        </div>
        <div class="tabGrades__gradesWrapper">
          <div
            v-for="subject in subjects"
            :key="subject.id"
            class="tabGrades__gradeField"
          >
            <SubjectCardEditable
              class="tabGrades__subjectCard"
              :name="subject.name"
              :even-odd="subject.evenOdd"
              is-simple
            />
            <div class="tabGrades__singleGradeValue">{{ subject.grade }}</div>
          </div>
        </div>
      </TabMainContent>
    </IonContent>
  </PageBase>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IonContent } from '@ionic/vue';
import type { SubjectData } from '@/types/commonTypes';

import TabMainContent from '@/components/layouts/TabMainContent.vue';
import TabHeading from '@/components/ui/TabHeading.vue';
import PageBase from '@/components/layouts/PageBase.vue';
import SubjectCardEditable from '@/components/cards/SubjectCardEditable.vue';

const subjects: SubjectData[] = [
  {
    id: 1,
    name: 'Subject 1',
    day: 'Monday',
    start: '8:00',
    end: '9:30',
    evenOdd: 'odd',
    classNumber: '224',
    grade: 4,
  },
  {
    id: 2,
    name: 'Subject 2',
    day: 'Monday',
    start: '10:15',
    end: '12:00',
    evenOdd: 'odd',
    classNumber: '224',
    grade: 2,
  },
  {
    id: 3,
    name: 'Subject 3',
    day: 'Friday',
    start: '9:15',
    end: '10:45',
    evenOdd: 'odd',
    classNumber: '244',
    grade: 5,
  },
  {
    id: 4,
    name: 'Subject 4',
    day: 'Wednesday',
    start: '7:30',
    end: '10:00',
    evenOdd: 'odd',
    classNumber: '224',
    grade: 5,
  },
  {
    id: 5,
    name: 'Subject 5',
    day: 'Wednesday',
    start: '16:30',
    end: '18:00',
    evenOdd: 'odd',
    classNumber: '54',
    grade: 3,
  },
];

/**
 * Get average grade calculated from all subjects' grades
 * @returns {number} average grade
 */
const avgGrade = computed<number>(() => {
  if (subjects.length === 0) {
    return 0;
  }

  const sum = subjects.reduce((acc, subject) => acc + subject.grade, 0);
  return sum / subjects.length;
});
</script>

<style scoped lang="scss">
.tabGrades {
  &__avgGrade {
    padding: 38px 0;
    margin-bottom: 15px;

    background-color: $ColorAccentVariant;
    border-radius: 20px;
    border: solid 1px rgba($ColorAccentVariant, 0.1);
    box-shadow: 0 4px 15px rgba($ColorAccentVariant, 0.1);

    text-align: center;
    font-family: $teachers;
  }

  &__avgGradeValue {
    font-size: 3.125rem;
    color: $ColorWhite;
    font-weight: bold;
  }

  &__avgGradeText {
    color: rgba($ColorWhite, 0.8);
    font-weight: 500;
  }

  &__gradesWrapper {
    display: flex;
    flex-direction: column;
    gap: 15px;

    padding: 15px;
    margin-bottom: 30px;

    border-radius: 20px;
    background-color: $ColorBackground;
  }

  &__gradeField {
    display: flex;
    gap: 10px;
  }

  &__subjectCard {
    flex: 1;
  }

  &__singleGradeValue {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 58px;

    border: solid 1px $ColorAccentVariant;
    border-radius: 15px;

    font-family: $teachers;
    color: $ColorAccentVariant;
    font-weight: 600;
    font-size: 1.25rem;
  }
}
</style>
