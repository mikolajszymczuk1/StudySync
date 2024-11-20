<template>
  <IonModal
    ref="createEditModal"
    class="createEditModal"
    :is-open="modalOpen"
    :initial-breakpoint="1"
    :breakpoints="[0, 1]"
    @did-dismiss="handleClose()"
  >
    <div
      class="createEditModal__mainContent"
      :class="smallSize ? 'createEditModal__mainContent--smallSize' : ''"
    >
      <SimpleHeading class="createEditModal__heading">
        {{ heading }}
      </SimpleHeading>
      <div class="createEditModal__cornerButtons">
        <PrimaryButton
          v-if="isEditMode"
          plus-button
          @click-action="handleDelete()"
        >
          <FontAwesomeIcon :icon="faTrash" />
        </PrimaryButton>
        <PrimaryButton @click-action="handleClose()">Close</PrimaryButton>
      </div>
      <div class="createEditModal__formContent">
        <div class="createEditModal__inputsContainer">
          <slot />
        </div>
        <div class="createEditModal__saveButtonContainer">
          <PrimaryButton
            class="createEditModal__saveButton"
            @click-action="handleSave()"
          >
            {{ isEditMode ? 'Update' : 'Save' }}
          </PrimaryButton>
        </div>
      </div>
    </div>
  </IonModal>
</template>

<script setup lang="ts">
import { IonModal } from '@ionic/vue';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import SimpleHeading from '@/components/ui/SimpleHeading.vue';
import PrimaryButton from '@/components/buttons/PrimaryButton.vue';

defineProps({
  modalOpen: {
    type: Boolean,
    default: false,
  },
  heading: {
    type: String,
    default: '',
  },
  isEditMode: {
    type: Boolean,
    default: false,
  },
  smallSize: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  onClose: [];
  onSave: [];
  onDelete: [];
}>();

const handleClose = (): void => emit('onClose');

const handleSave = (): void => emit('onSave');

const handleDelete = (): void => emit('onDelete');
</script>

<style scoped lang="scss">
.createEditModal {
  --border-radius: 20px 20px 0 0;
  --box-shadow: 0 -4px 15px rgba(24, 32, 51, 0.1);
  --height: auto;

  &__mainContent {
    height: 75vh;
    padding: 15px;

    overflow: hidden;
    background-color: $ColorWhite;
    border-radius: 20px 20px 0 0;
    border: solid 1px rgba($ColorAccentVariant, 0.1);

    &--smallSize {
      height: 50vh;
    }
  }

  &__heading {
    margin-bottom: 23px;
  }

  &__cornerButtons {
    display: flex;
    gap: 6px;
    position: absolute;
    top: 7px;
    right: 7px;
  }

  &__formContent {
    position: relative;

    padding: 15px 15px calc(15px + 40px + 15px) 15px;
    height: 95%;

    border-radius: 20px 20px 0 0;
    background-color: $ColorBackground;
    border: solid 1px rgba($ColorAccentVariant, 0.1);
    box-shadow: 0 0 15px rgba($ColorAccentVariant, 0.1);

    color: $ColorAccentVariant;
  }

  &__inputsContainer {
    height: 100%;

    overflow-y: auto;
    scrollbar-width: 0;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__saveButtonContainer {
    position: fixed;
    bottom: 15px;
    left: 50%;

    width: calc(100% - 60px);

    transform: translateX(-50%);
  }

  &__saveButton {
    width: 100%;
  }
}
</style>
