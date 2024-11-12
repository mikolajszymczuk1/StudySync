<template>
  <div class="upcomingEvents">
    <SimpleHeading class="upcomingEvents__heading">
      Upcoming events
    </SimpleHeading>
    <PrimaryButton class="upcomingEvents__button" @click-action="handleClick()">
      Manage
    </PrimaryButton>
    <div class="upcomingEvents__cardsWrapper">
      <EventCard
        v-for="singleEvent in events"
        :key="singleEvent.name"
        class="upcomingEvents__event"
        :name="singleEvent.name"
        :event-date="singleEvent.eventDate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { useIonRouter } from '@ionic/vue';
import type { EventData } from '@/types/commonTypes';
import EventCard from '@/components/cards/EventCard.vue';
import SimpleHeading from '@/components/ui/SimpleHeading.vue';
import PrimaryButton from '@/components/buttons/PrimaryButton.vue';

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
  position: relative;

  padding: 15px;

  background-color: $ColorBackground;
  overflow: hidden;
  border-radius: 20px;

  &__heading {
    margin-bottom: 23px;
  }

  &__button {
    position: absolute;
    top: 7px;
    right: 7px;
  }

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
