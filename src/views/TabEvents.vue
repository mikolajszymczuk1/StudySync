<template>
  <PageBase class="tabEvents">
    <IonContent :fullscreen="true">
      <TabMainContent no-padding>
        <TabHeading class="tabEvents__heading" data-cy="tabHeadingEvents">
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
              data-cy="eventSearchBar"
            />
          </div>
          <div class="tabEvents__events">
            <EventCard
              v-for="event in filteredEvents"
              :id="event.id"
              :key="event.id"
              :name="event.name"
              :event-date="
                eventStore.convertToStringDate(new Date(event.eventDate))
              "
              editable
              data-cy="eventCard"
              @on-edit="editEvent"
            />
          </div>
        </div>
        <PrimaryButton
          class="tabEvents__addButton"
          plus-button
          data-cy="addEvent"
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
              data-cy="eventNameInput"
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
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEventStore } from '@/stores/eventStore';
import Event from '@/mod/event/model/Event';

import TabMainContent from '@/components/layouts/TabMainContent.vue';
import TabHeading from '@/components/ui/TabHeading.vue';
import PageBase from '@/components/layouts/PageBase.vue';
import CommonInput from '@/components/inputs/CommonInput.vue';
import EventCard from '@/components/cards/EventCard.vue';
import PrimaryButton from '@/components/buttons/PrimaryButton.vue';
import CreateEditModal from '@/components/modals/CreateEditModal.vue';
import ModalForm from '@/components/layouts/ModalForm.vue';
import ModalInputLabel from '@/components/ui/ModalInputLabel.vue';

const eventStore = useEventStore();

const { values, setFieldValue } = useForm<TabEventsForm>();

// Modal data
// ---------------------------------------------

const modalOpen: Ref<boolean> = ref(false);
const editMode: Ref<boolean> = ref(false);
const eventDate: Ref<string> = ref('');
const eventIdToEdit: Ref<number> = ref(-1);

// ---------------------------------------------

/**
 * Get filtered events by search value
 * @returns {Event[]} filtered events items
 */
const filteredEvents = computed<Event[]>(() => {
  return eventStore.events.filter((event) => {
    if (!values.search || !values.search.trim()) {
      return true;
    }

    return event.name.toLowerCase().includes(values.search.toLowerCase());
  });
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
  eventDate.value = eventStore.convertToStringDate(new Date());
  openModal();
};

const editEvent = (id: number): void => {
  editMode.value = true;
  eventIdToEdit.value = id;
  const foundEventToEdit = eventStore.events.find(
    (event: Event) => event.id === id,
  );
  setFieldValue('eventName', foundEventToEdit!.name);
  const d = new Date(foundEventToEdit!.eventDate);
  eventDate.value = eventStore.convertToStringDate(d);
  openModal();
};

const deleteEvent = async (): Promise<void> => {
  await eventStore.remove(eventIdToEdit.value);
  closeModal();
};

const saveUpdateEvent = async (): Promise<void> => {
  if (values.eventName === '') {
    closeModal();
    return;
  }

  if (editMode.value) {
    await eventStore.update(
      eventIdToEdit.value,
      values.eventName,
      new Date(eventDate.value).getTime(),
    );
  } else {
    await eventStore.add(values.eventName, new Date(eventDate.value).getTime());
  }

  closeModal();
};

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
