<template>
  <HeadingButtonContainer class="upcomingEvents" heading="Upcoming events">
    <template #button>
      <PrimaryButton
        class="upcomingEvents__button"
        @click-action="handleClick()"
      >
        Manage
      </PrimaryButton>
    </template>
    <div class="upcomingEvents__cardsWrapper">
      <EventCard
        v-for="singleEvent in events"
        :key="singleEvent.name"
        class="upcomingEvents__event"
        :name="singleEvent.name"
        :event-date="singleEvent.eventDate"
      />
    </div>
  </HeadingButtonContainer>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { useIonRouter } from '@ionic/vue';
import type { EventData } from '@/types/commonTypes';
import EventCard from '@/components/cards/EventCard.vue';
import PrimaryButton from '@/components/buttons/PrimaryButton.vue';
import HeadingButtonContainer from '@/components/layouts/HeadingButtonContainer.vue';

defineProps({
  events: {
    type: Array as PropType<EventData[]>,
    required: true,
  },
});

const router = useIonRouter();

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
