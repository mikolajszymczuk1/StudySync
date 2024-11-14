<template>
  <PageBase class="tabSubjects">
    <IonContent :fullscreen="true">
      <TabMainContent no-padding>
        <TabHeading class="tabSubjects__heading">
          Setup <br />
          your <span>subjects</span>
        </TabHeading>
        <div class="tabSubjects__wrapper">
          <div>
            <input v-model="searchValue" type="text" name="searchSubjects" />
            <CommonSelect
              v-model="selectValue"
              placeholder="Even/Odd"
              aria-label-value="EvenOdd"
              :options="evenOddSelectOptions"
            />
          </div>
          <HeadingButtonContainer
            v-for="day in days"
            :key="day"
            class="tabSubjects__dayBlock"
            :heading="day"
            no-background
          >
            <template #button>
              <PrimaryButton class="tabSubjects__dayAddButton" plus-button>
                <FontAwesomeIcon :icon="faPlus" />
              </PrimaryButton>
            </template>
            <div class="tabSubjects__subjects">
              <DraggableComponent
                :id="`tabSubjects__${day}`"
                :list="filteredSubjects(day as keyof WeekSubjects)"
                class="tabSubjects__draggableList"
                ghost-class="ghost"
                group="subjects"
                item-key="id"
                :disabled="false"
                :animation="200"
                @add="handleAdd"
                @remove="handleRemove"
                @update="handleUpdate"
              >
                <template #item="{ element }">
                  <SubjectCardEditable
                    :id="element.id"
                    :name="element.name"
                    :even-odd="element.evenOdd"
                    :start="element.start"
                    :end="element.end"
                    :class-number="element.classNumber"
                  />
                </template>
              </DraggableComponent>
            </div>
          </HeadingButtonContainer>
        </div>
      </TabMainContent>
    </IonContent>
  </PageBase>
</template>

<script setup lang="ts">
import { computed, type Ref, ref } from 'vue';
import { IonContent } from '@ionic/vue';
import DraggableComponent from 'vuedraggable';
import TabMainContent from '@/components/layouts/TabMainContent.vue';
import TabHeading from '@/components/ui/TabHeading.vue';
import PageBase from '@/components/layouts/PageBase.vue';
import PrimaryButton from '@/components/buttons/PrimaryButton.vue';
import HeadingButtonContainer from '@/components/layouts/HeadingButtonContainer.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import SubjectCardEditable from '@/components/cards/SubjectCardEditable.vue';
import { SelectOption, SubjectData } from '@/types/commonTypes';
import CommonSelect from '@/components/inputs/CommonSelect.vue';

type WeekSubjects = {
  Monday: Ref<SubjectData[]>;
  Tuesday: Ref<SubjectData[]>;
  Wednesday: Ref<SubjectData[]>;
  Thursday: Ref<SubjectData[]>;
  Friday: Ref<SubjectData[]>;
};

const evenOddSelectOptions: SelectOption[] = [
  { text: 'Even', value: 'even' },
  { text: 'Odd', value: 'odd' },
];

const days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const selectValue: Ref<string> = ref('odd');
const searchValue: Ref<string> = ref('');

const allSubjects: WeekSubjects = {
  Monday: ref([
    {
      id: 1,
      name: 'Subject AA',
      day: 'Monday',
      start: '8:00',
      end: '9:30',
      evenOdd: 'odd',
      classNumber: '224',
    },
    {
      id: 2,
      name: 'Subject AB',
      day: 'Monday',
      start: '10:15',
      end: '12:00',
      evenOdd: 'odd',
      classNumber: '224',
    },
  ]),
  Tuesday: ref([
    {
      id: 3,
      name: 'Subject BA',
      day: 'Tuesday',
      start: '8:00',
      end: '9:30',
      evenOdd: 'even',
      classNumber: '224',
    },
    {
      id: 4,
      name: 'Subject BB',
      day: 'Tuesday',
      start: '10:15',
      end: '12:00',
      evenOdd: 'even',
      classNumber: '224',
    },
  ]),
  Wednesday: ref([]),
  Thursday: ref([]),
  Friday: ref([]),
};

/**
 * Get filter (even or odd) day items
 * @param {keyof WeekSubjects} day day name
 */
const filteredSubjects = computed(
  () =>
    (day: keyof WeekSubjects): SubjectData[] => {
      return allSubjects[day].value
        .filter((subject) => subject.evenOdd === selectValue.value)
        .filter((subject) => {
          if (!searchValue.value.trim()) {
            return true;
          }
          return subject.name
            .toLowerCase()
            .includes(searchValue.value.toLowerCase());
        });
    },
);

/**
 * Add specific subject to day items list
 * @param {keyof WeekSubjects} day day name
 * @param {SubjectData} subject subject object to add
 */
const addSubjectToDay = (
  day: keyof WeekSubjects,
  subject: SubjectData,
): void => {
  allSubjects[day].value.push(subject);
};

/**
 * Remove subject from specific day items list
 * @param {keyof WeekSubjects} day day name
 * @param {number} subjectId subject id to remove
 */
const removeSubjectFromDay = (
  day: keyof WeekSubjects,
  subjectId: number,
): void => {
  allSubjects[day].value = allSubjects[day].value.filter(
    (subject) => subject.id !== subjectId,
  );
};

/** Detect if some element is added to another list */
const handleAdd = (event: any): void => {
  const targetDay: string = event.to.id.split('__')[1];
  const addedSubject: SubjectData = event.item.__draggable_context.element;
  addedSubject.day = targetDay;
  addSubjectToDay(targetDay as keyof WeekSubjects, addedSubject);
};

/** Detect if some element is removed from the list */
const handleRemove = (event: any): void => {
  const sourceDay: string = event.from.id.split('__')[1];
  const subjectId: string = event.item.id.split('-')[1];
  removeSubjectFromDay(sourceDay as keyof WeekSubjects, parseInt(subjectId));
};

/** Detect any update in items list and refresh specific even or odd items list */
const handleUpdate = (event: any) => {
  const day: string = event.to.id.split('__')[1];
  const updatedList: SubjectData[] = event.to.__draggable_component__.list.map(
    (subject: SubjectData) => {
      const subjectId: number = subject.id;
      return allSubjects[day as keyof WeekSubjects].value.find(
        (subject) => subject.id === subjectId,
      );
    },
  );

  allSubjects[day as keyof WeekSubjects].value = [
    ...updatedList.filter((subject) => subject.evenOdd === selectValue.value),
    ...allSubjects[day as keyof WeekSubjects].value.filter(
      (subject) => subject.evenOdd !== selectValue.value,
    ),
  ];
};
</script>

<style scoped lang="scss">
.tabSubjects {
  &__heading {
    padding: 0 15px;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 15px;

    width: 100%;
    min-height: 100vh;

    padding: 15px;

    background-color: $ColorBackground;
    border-radius: 20px 20px 0 0;
    border: solid 1px rgba($ColorAccentVariant, 0.1);
    box-shadow: 0 -4px 15px rgba($ColorAccentVariant, 0.1);
  }

  &__draggableList {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
