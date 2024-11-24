<template>
  <PageBase class="tabSubjects">
    <IonContent :fullscreen="true">
      <TabMainContent no-padding>
        <TabHeading class="tabSubjects__heading">
          Setup <br />
          your <span>subjects</span>
        </TabHeading>
        <div class="tabSubjects__wrapper">
          <div class="tabSubjects__filtersSection">
            <CommonInput
              class="tabSubjects__filterSearch"
              name="search"
              placeholder="Write subject name ..."
              no-label
            />
            <CommonSelect
              v-model="selectValue"
              class="tabSubjects__filterEvenOdd"
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
              <PrimaryButton
                class="tabSubjects__dayAddButton"
                plus-button
                @click-action="createSubject(day)"
              >
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
                    :start="element.startTime"
                    :end="element.endTime"
                    :day="element.day"
                    :class-number="element.classNumber"
                    @on-edit="editSubject"
                  />
                </template>
              </DraggableComponent>
            </div>
          </HeadingButtonContainer>
        </div>
      </TabMainContent>
      <CreateEditModal
        :modal-open="modalOpen"
        :heading="editMode ? 'Edit subject' : 'Create new subject'"
        :is-edit-mode="editMode"
        @on-close="closeModal()"
        @on-delete="deleteSubject()"
        @on-save="saveUpdateSubject()"
      >
        <ModalForm>
          <div>
            <ModalInputLabel>Subject name:</ModalInputLabel>
            <CommonInput
              name="subjectName"
              placeholder="Write name for new subject ..."
              no-label
              no-icon
            />
          </div>
          <div>
            <ModalInputLabel>Class:</ModalInputLabel>
            <CommonInput
              name="classRoom"
              placeholder="Write name of class room ..."
              no-label
              no-icon
            />
          </div>
          <div>
            <ModalInputLabel>Start time:</ModalInputLabel>
            <div class="tabSubjects__timeInputsWrapper">
              <CommonSelect v-model="hourStart" :options="hoursOptions" />
              :
              <CommonSelect v-model="minutesStart" :options="minutesOptions" />
            </div>
          </div>
          <div>
            <ModalInputLabel>End time:</ModalInputLabel>
            <div class="tabSubjects__timeInputsWrapper">
              <CommonSelect v-model="hourEnd" :options="filteredHoursOptions" />
              :
              <CommonSelect
                v-model="minutesEnd"
                :options="filteredMinutesOptions"
              />
            </div>
          </div>
        </ModalForm>
      </CreateEditModal>
    </IonContent>
  </PageBase>
</template>

<script setup lang="ts">
import { computed, type Ref, ref, watch } from 'vue';
import { IonContent } from '@ionic/vue';
import DraggableComponent from 'vuedraggable';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import type { SelectOption, WeekSubjects } from '@/types/commonTypes';
import { TabSubjectsForm } from '@/types/formTypes';
import { useForm } from 'vee-validate';
import { useSubjectStore } from '@/stores/subjectStore';
import Subject from '@/mod/subject/model/Subject';

import TabMainContent from '@/components/layouts/TabMainContent.vue';
import TabHeading from '@/components/ui/TabHeading.vue';
import PageBase from '@/components/layouts/PageBase.vue';
import PrimaryButton from '@/components/buttons/PrimaryButton.vue';
import HeadingButtonContainer from '@/components/layouts/HeadingButtonContainer.vue';
import SubjectCardEditable from '@/components/cards/SubjectCardEditable.vue';
import CommonSelect from '@/components/inputs/CommonSelect.vue';
import CommonInput from '@/components/inputs/CommonInput.vue';
import CreateEditModal from '@/components/modals/CreateEditModal.vue';
import ModalForm from '@/components/layouts/ModalForm.vue';
import ModalInputLabel from '@/components/ui/ModalInputLabel.vue';

const subjectStore = useSubjectStore();

// Modal data
// ---------------------------------------------

const modalOpen: Ref<boolean> = ref(false);
const editMode: Ref<boolean> = ref(false);
const hourStart: Ref<string> = ref('8');
const minutesStart: Ref<string> = ref('15');
const hourEnd: Ref<string> = ref('10');
const minutesEnd: Ref<string> = ref('30');
const subjectIdToEdit: Ref<number> = ref(-1);
const selectedDay: Ref<string> = ref('');

const hoursOptions: SelectOption[] = [
  { text: '7', value: '7' },
  { text: '8', value: '8' },
  { text: '9', value: '9' },
  { text: '10', value: '10' },
  { text: '11', value: '11' },
  { text: '12', value: '12' },
  { text: '13', value: '13' },
  { text: '14', value: '14' },
  { text: '15', value: '15' },
  { text: '16', value: '16' },
  { text: '17', value: '17' },
  { text: '18', value: '18' },
  { text: '19', value: '19' },
  { text: '20', value: '20' },
  { text: '21', value: '21' },
];

const minutesOptions: SelectOption[] = [
  { text: '00', value: '00' },
  { text: '15', value: '15' },
  { text: '30', value: '30' },
  { text: '45', value: '45' },
];

// ---------------------------------------------

const evenOddSelectOptions: SelectOption[] = [
  { text: 'Even', value: 'even' },
  { text: 'Odd', value: 'odd' },
];

const days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const selectValue: Ref<string> = ref('odd');

const { values, setFieldValue } = useForm<TabSubjectsForm>();

// Don't let user set start time later than end time
watch([hourStart, minutesStart, hourEnd, minutesEnd], () => {
  if (parseInt(hourStart.value) > parseInt(hourEnd.value)) {
    hourEnd.value = hourStart.value;
  }

  if (parseInt(hourStart.value) < parseInt(hourEnd.value)) {
    return;
  }

  if (parseInt(minutesStart.value) > parseInt(minutesEnd.value)) {
    minutesEnd.value = minutesStart.value;
  }
});

/**
 * Get filter (even or odd) day items
 * @param {keyof WeekSubjects} day day name
 */
const filteredSubjects = computed(
  () =>
    (day: keyof WeekSubjects): Subject[] => {
      return subjectStore.subjects[day]
        .filter((subject) => subject.evenOdd === selectValue.value)
        .filter((subject) => {
          if (!values.search || !values.search.trim()) {
            return true;
          }
          return subject.name
            .toLowerCase()
            .includes(values.search.toLowerCase());
        });
    },
);

/**
 * Filter end hours options based on start hour value
 * @returns {SelectOption[]} options array
 */
const filteredHoursOptions = computed<SelectOption[]>(() => {
  return hoursOptions.filter(
    (option: SelectOption) =>
      parseInt(option.value) >= parseInt(hourStart.value),
  );
});

/**
 * Filter end minutes options based on start hour value and start minutes value
 * @returns {SelectOption[]} options array
 */
const filteredMinutesOptions = computed<SelectOption[]>(() => {
  return minutesOptions.filter((option: SelectOption) => {
    if (parseInt(hourStart.value) < parseInt(hourEnd.value)) {
      return true;
    }
    return parseInt(option.value) >= parseInt(minutesStart.value);
  });
});

/**
 * Get start time value
 * @returns {string} start time
 */
const startTime = computed<string>(
  () => `${hourStart.value}:${minutesStart.value}`,
);

/**
 * Get end time value
 * @returns {string} end time
 */
const endTime = computed<string>(() => `${hourEnd.value}:${minutesEnd.value}`);

/**
 * Add specific subject to day items list
 * @param {keyof WeekSubjects} day day name
 * @param {Subject} subject subject object to add
 */
const addSubjectToDay = (day: keyof WeekSubjects, subject: Subject): void => {
  subjectStore.subjects[day].push(Subject.createSubjectObject(subject));
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
  subjectStore.subjects[day] = subjectStore.subjects[day].filter(
    (subject) => subject.id !== subjectId,
  );
};

/** Detect if some element is added to another list */
const handleAdd = async (event: any): Promise<void> => {
  const targetDay: string = event.to.id.split('__')[1];
  const addedSubject: Subject = Subject.createSubjectObject(
    event.item.__draggable_context.element,
  );
  addedSubject.day = targetDay;
  addSubjectToDay(targetDay as keyof WeekSubjects, addedSubject);
  await subjectStore.changeDay(addedSubject.id, addedSubject.day);
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
  const updatedList: Subject[] = event.to.__draggable_component__.list.map(
    (subject: Subject) => {
      const subjectId: number = subject.id;
      return subjectStore.subjects[day as keyof WeekSubjects].find(
        (subject) => subject.id === subjectId,
      );
    },
  );

  subjectStore.subjects[day as keyof WeekSubjects] = [
    ...updatedList.filter((subject) => subject.evenOdd === selectValue.value),
    ...subjectStore.subjects[day as keyof WeekSubjects].filter(
      (subject) => subject.evenOdd !== selectValue.value,
    ),
  ];
};

// Modal logic handlers
// ---------------------------------------------

const openModal = (): void => {
  modalOpen.value = true;
};

const closeModal = (): void => {
  modalOpen.value = false;
};

const createSubject = (day: string): void => {
  editMode.value = false;
  setFieldValue('subjectName', '');
  setFieldValue('classRoom', '');
  hourStart.value = '7';
  minutesStart.value = '00';
  hourEnd.value = '8';
  minutesEnd.value = '00';
  selectedDay.value = day;
  openModal();
};

const deleteSubject = async (): Promise<void> => {
  await subjectStore.remove(subjectIdToEdit.value, selectedDay.value);
  closeModal();
};

const editSubject = ({ id, day }: { id: number; day: string }): void => {
  editMode.value = true;
  subjectIdToEdit.value = id;
  const foundSubjectToEdit = subjectStore.subjects[
    day as keyof WeekSubjects
  ].find((subject) => subject.id === id);
  const [hStart, minStart] = foundSubjectToEdit!.startTime.split(':');
  const [hEnd, minEnd] = foundSubjectToEdit!.endTime.split(':');
  setFieldValue('subjectName', foundSubjectToEdit!.name);
  setFieldValue('classRoom', foundSubjectToEdit!.classNumber);
  hourStart.value = hStart;
  minutesStart.value = minStart;
  hourEnd.value = hEnd;
  minutesEnd.value = minEnd;
  selectedDay.value = day;
  openModal();
};

const saveUpdateSubject = async (): Promise<void> => {
  if (values.subjectName === '' || values.classRoom === '') {
    closeModal();
    return;
  }

  if (editMode.value) {
    await subjectStore.update(
      subjectIdToEdit.value,
      values.subjectName,
      startTime.value,
      endTime.value,
      selectValue.value,
      values.classRoom,
      selectedDay.value,
    );
  } else {
    await subjectStore.add(
      values.subjectName,
      startTime.value,
      endTime.value,
      selectValue.value,
      values.classRoom,
      selectedDay.value,
    );
  }

  closeModal();
};

// ---------------------------------------------
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

  &__filtersSection {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__filterSearch {
    flex: 1;
  }

  &__draggableList {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__timeInputsWrapper {
    display: flex;
    align-items: center;
    gap: 8px;

    font-size: 1.125rem;
    font-weight: 600;
    color: $ColorAccentVariant;
  }
}
</style>
