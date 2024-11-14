<template>
  <div :id="`event-${id}`" class="eventCard">
    <div class="eventCard__eventDate">{{ eventDate }}</div>
    <div class="eventCard__name">{{ name }}</div>
    <FontAwesomeIcon
      v-if="!editable"
      class="eventCard__cornerIcon"
      :icon="faCircleInfo"
    />
    <PencilCircle v-else class="eventCard__cornerIcon" />
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import PencilCircle from '@/components/ui/PencilCircle.vue';

defineProps({
  id: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
    default: '',
  },
  eventDate: {
    type: String,
    default: '',
  },
  editable: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
.eventCard {
  position: relative;

  padding: 15px;
  min-height: 84px;

  background-color: $ColorWhite;
  border-radius: 15px;
  border: solid 1px rgba($ColorAccentVariant, 0.1);
  box-shadow: 0 0 15px rgba($ColorAccentVariant, 0.05);

  font-family: $teachers;
  color: $ColorAccentVariant;
  font-weight: 500;

  &__eventDate {
    margin-bottom: 2px;

    font-size: 0.75rem;
  }

  &__name {
    font-size: 1.125rem;
  }

  &__cornerIcon {
    position: absolute;
    top: 7px;
    right: 7px;

    color: $ColorAccent;
  }
}
</style>
