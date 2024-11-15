<template>
  <PageBase class="tabEvents">
    <IonContent :fullscreen="true">
      <TabMainContent no-padding>
        <TabHeading class="tabEvents__heading">
          Setup <br />
          your <span>events</span>
        </TabHeading>
        <div class="tabEvents__wrapper">
          <div class="tabEvents__filtersSection">
            <CommonInput
              class="tabEvents__filterSearch"
              name="search"
              placeholder="Write event name ..."
              no-label
            />
          </div>
          <div class="tabEvents__events">
            <EventCard
              v-for="event in filteredEvents"
              :id="event.id"
              :key="event.id"
              :name="event.name"
              :event-date="event.eventDate"
              editable
              @on-edit="editEvent"
            />
          </div>
        </div>
        <PrimaryButton
          class="tabEvents__addButton"
          plus-button
          @click-action="createEvent()"
        >
          <FontAwesomeIcon :icon="faPlus" />
        </PrimaryButton>
      </TabMainContent>
      <CreateEditModal
        :modal-open="modalOpen"
        :heading="editMode ? 'Edit event' : 'Create new event'"
        :is-edit-mode="editMode"
        @on-close="closeModal()"
        @on-delete="deleteEvent()"
        @on-save="saveUpdateEvent()"
      >
        <ModalForm>
          <div>
            <ModalInputLabel>Event name:</ModalInputLabel>
            <CommonInput
              name="eventName"
              placeholder="Write event name ..."
              no-label
              no-icon
            />
          </div>
          <div>
            <ModalInputLabel>Event date:</ModalInputLabel>
            <IonDatetime
              v-model="eventDate"
              class="tabEvents__dateInput"
              presentation="date"
              :format-options="{
                date: { day: '2-digit', month: '2-digit', year: 'numeric' },
              }"
            />
          </div>
        </ModalForm>
      </CreateEditModal>
    </IonContent>
  </PageBase>
</template>

<script setup lang="ts">
import { computed, type Ref, ref } from 'vue';
import { IonContent, IonDatetime } from '@ionic/vue';
import { useForm } from 'vee-validate';
import type { TabEventsForm } from '@/types/formTypes';
import type { EventData } from '@/types/commonTypes';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import TabMainContent from '@/components/layouts/TabMainContent.vue';
import TabHeading from '@/components/ui/TabHeading.vue';
import PageBase from '@/components/layouts/PageBase.vue';
import CommonInput from '@/components/inputs/CommonInput.vue';
import EventCard from '@/components/cards/EventCard.vue';
import PrimaryButton from '@/components/buttons/PrimaryButton.vue';
import CreateEditModal from '@/components/modals/CreateEditModal.vue';
import ModalForm from '@/components/layouts/ModalForm.vue';
import ModalInputLabel from '@/components/ui/ModalInputLabel.vue';

const { values, setFieldValue } = useForm<TabEventsForm>();

// Modal data
// ---------------------------------------------

const modalOpen: Ref<boolean> = ref(false);
const editMode: Ref<boolean> = ref(false);
const eventDate: Ref<string> = ref('');
const eventIdToEdit: Ref<number> = ref(-1);

// ---------------------------------------------

const events: EventData[] = [
  { id: 1, name: 'Some event 1', eventDate: '2024-10-14' },
  { id: 2, name: 'Some event 2', eventDate: '2024-10-20' },
  { id: 3, name: 'Some event 3', eventDate: '2024-10-14' },
  { id: 4, name: 'Some event 4', eventDate: '2024-10-20' },
  { id: 5, name: 'Some event 5', eventDate: '2024-10-14' },
  { id: 6, name: 'Some event 6', eventDate: '2024-10-20' },
];

/**
 * Get filtered events by search value
 * @returns {EventData[]} filtered events items
 */
const filteredEvents = computed<EventData[]>(() => {
  return events.filter((event) => {
    if (!values.search || !values.search.trim()) {
      return true;
    }

    return event.name.toLowerCase().includes(values.search.toLowerCase());
  });
});

/**
 * Get current date in specific date format
 * @returns {string} current date
 */
const currentDate = computed<string>(() => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  return `${year}-${month}-${day}`;
});

// Modal logic handlers
// ---------------------------------------------

const openModal = (): void => {
  modalOpen.value = true;
};

const closeModal = (): void => {
  modalOpen.value = false;
};

const createEvent = (): void => {
  editMode.value = false;
  setFieldValue('eventName', '');
  eventDate.value = currentDate.value;
  openModal();
};

const editEvent = (id: number): void => {
  editMode.value = true;
  eventIdToEdit.value = id;
  const foundEventToEdit = events.find((event: EventData) => event.id === id);
  setFieldValue('eventName', foundEventToEdit!.name);
  eventDate.value = foundEventToEdit!.eventDate;
  openModal();
};

const deleteEvent = (): void => {};

const saveUpdateEvent = (): void => {};

// ---------------------------------------------
</script>

<style scoped lang="scss">
.tabEvents {
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

  &__events {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  &__addButton {
    position: fixed;
    z-index: 1;
    bottom: 15px;
    right: 15px;
  }

  &__dateInput {
    --background: white;
    --wheel-fade-background-rgb: transparent;
    --title-color: #182033;
    --wheel-highlight-background: #e9edf6;

    border-radius: 15px;
    box-shadow: 0 0 15px rgba($ColorAccentVariant, 0.1);

    color: $ColorAccentVariant;
    font-family: $teachers;

    &::part(calendar-day active) {
      background-color: $ColorBackground;
      border-color: $ColorAccentVariant;

      color: $ColorAccentVariant;
    }

    &::part(month-year-button) {
      color: $ColorAccentVariant;
      font-family: $teachers;
    }

    &::part(wheel-item) {
      font-family: $teachers;
    }

    &::part(wheel-item active) {
      color: $ColorAccent;
    }
  }
}
</style>
