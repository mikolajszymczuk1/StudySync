<template>
  <div :id="`subject-${id}`" class="subjectCardEditable" @click="handleClick()">
    <div class="subjectCardEditable__evenOdd">{{ evenOdd }}</div>
    <div class="subjectCardEditable__name">{{ name }}</div>
    <PencilCircle v-if="!isSimple" class="subjectCardEditable__cornerIcon" />
    <div class="subjectCardEditable__startEndWrapper">
      <div
        v-if="!isSimple"
        class="subjectCardEditable__timeText subjectCardEditable__timeText--flex-1"
      >
        {{ classNumber }}
      </div>
      <div v-if="!isSimple" class="subjectCardEditable__timeText">
        Start: {{ start }}
      </div>
      <div v-if="!isSimple" class="subjectCardEditable__timeText">
        End: {{ end }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PencilCircle from '@/components/ui/PencilCircle.vue';

const props = defineProps({
  id: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
    default: '',
  },
  evenOdd: {
    type: String,
    default: '',
  },
  start: {
    type: String,
    default: '',
  },
  end: {
    type: String,
    default: '',
  },
  day: {
    type: String,
    default: '',
  },
  classNumber: {
    type: String,
    default: '',
  },
  isSimple: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  onEdit: [{ id: number; day: string }];
}>();

const handleClick = (): void =>
  emit('onEdit', { id: props.id, day: props.day });
</script>

<style scoped lang="scss">
.subjectCardEditable {
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

  &__evenOdd {
    margin-bottom: 2px;

    font-size: 0.75rem;
    text-transform: capitalize;
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

  &__startEndWrapper {
    display: flex;
    justify-content: flex-end;
    gap: 10px;

    margin-top: 2px;
  }

  &__timeText {
    font-family: $teachers;
    color: $ColorAccentVariant;
    font-size: 0.75rem;
    font-weight: 500;

    &--flex-1 {
      flex: 1;
    }
  }
}
</style>
