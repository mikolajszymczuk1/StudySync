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
import Subject from '@/mod/subject/model/Subject';
import { useSubjectStore } from '@/stores/subjectStore';

import TabMainContent from '@/components/layouts/TabMainContent.vue';
import TabHeading from '@/components/ui/TabHeading.vue';
import PageBase from '@/components/layouts/PageBase.vue';
import SubjectCardEditable from '@/components/cards/SubjectCardEditable.vue';

const subjectStore = useSubjectStore();

/**
 * Flat all subjects day arrays to single array to easy calculate average grade
 * @returns {Subject[]} single subjects array
 */
const subjects = computed<Subject[]>(() =>
  Object.values(subjectStore.subjects).flat(),
);

/**
 * Get average grade calculated from all subjects' grades
 * @returns {number} average grade
 */
const avgGrade = computed<number>(() => {
  if (subjects.value.length === 0) {
    return 0;
  }

  const sum = subjects.value.reduce((acc, subject) => acc + subject.grade, 0);
  return sum / subjects.value.length;
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
