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
            />
          </div>
        </div>
        <PrimaryButton class="tabEvents__addButton" plus-button>
          <FontAwesomeIcon :icon="faPlus" />
        </PrimaryButton>
      </TabMainContent>
    </IonContent>
  </PageBase>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IonContent } from '@ionic/vue';
import { useForm } from 'vee-validate';
import type { SearchForm } from '@/types/formTypes';
import type { EventData } from '@/types/commonTypes';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import TabMainContent from '@/components/layouts/TabMainContent.vue';
import TabHeading from '@/components/ui/TabHeading.vue';
import PageBase from '@/components/layouts/PageBase.vue';
import CommonInput from '@/components/inputs/CommonInput.vue';
import EventCard from '@/components/cards/EventCard.vue';
import PrimaryButton from '@/components/buttons/PrimaryButton.vue';

const { values } = useForm<SearchForm>();

const events: EventData[] = [
  { id: 1, name: 'Some event 1', eventDate: '14-10-2024' },
  { id: 2, name: 'Some event 2', eventDate: '20-10-2024' },
  { id: 3, name: 'Some event 3', eventDate: '14-10-2024' },
  { id: 4, name: 'Some event 4', eventDate: '20-10-2024' },
  { id: 5, name: 'Some event 5', eventDate: '14-10-2024' },
  { id: 6, name: 'Some event 6', eventDate: '20-10-2024' },
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
}
</style>
