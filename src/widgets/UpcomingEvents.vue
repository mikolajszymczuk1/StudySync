<template>
  <HeadingButtonContainer class="upcomingEvents" heading="Upcoming events">
    <template #button>
      <PrimaryButton
        class="upcomingEvents__button"
        data-cy="goToManageEventsTabButton"
        @click-action="handleClick()"
      >
        Manage
      </PrimaryButton>
    </template>
    <div class="upcomingEvents__cardsWrapper">
      <EventCard
        v-for="singleEvent in events"
        :id="singleEvent.id"
        :key="singleEvent.name"
        class="upcomingEvents__event"
        :name="singleEvent.name"
        :event-date="
          eventStore.convertToStringDate(new Date(singleEvent.eventDate))
        "
      />
    </div>
  </HeadingButtonContainer>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { useIonRouter } from '@ionic/vue';
import Event from '@/mod/event/model/Event';
import { useEventStore } from '@/stores/eventStore';

import EventCard from '@/components/cards/EventCard.vue';
import PrimaryButton from '@/components/buttons/PrimaryButton.vue';
import HeadingButtonContainer from '@/components/layouts/HeadingButtonContainer.vue';

defineProps({
  events: {
    type: Array as PropType<Event[]>,
    required: true,
  },
});

const router = useIonRouter();
const eventStore = useEventStore();

const handleClick = (): void => {
  router.push('/tabs/events');
};
</script>

<style scoped lang="scss">
.upcomingEvents {
  &__cardsWrapper {
    display: flex;
    justify-items: center;
    gap: 10px;

    overflow-x: auto;
    white-space: nowrap;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__event {
    flex: 0 0 auto;

    width: 200px;
  }
}
</style>
