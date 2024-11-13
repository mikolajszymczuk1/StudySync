<template>
  <HeadingButtonContainer class="tasksList" heading="Tasks list">
    <template #button>
      <PrimaryButton
        class="tasksList__button"
        plus-button
        @click-action="addTodo()"
      >
        <FontAwesomeIcon :icon="faPlus" />
      </PrimaryButton>
    </template>
    <div class="tasksList__tasks">
      <DraggableComponent
        id="todoList"
        v-model="items"
        class="tasksList__draggableList"
        ghost-class="ghost"
        group="todos"
        item-key="order"
        :disabled="false"
        :animation="200"
        @start="drag = true"
        @end="drag = false"
        @update="handleChange"
      >
        <template #item="{ element }">
          <div
            class="tasksList__task"
            :class="element.isComplete ? 'tasksList__task--complete' : ''"
          >
            <button
              class="tasksList__taskCheckButton"
              @click="toggleTodo(element.id)"
            >
              <FontAwesomeIcon
                v-if="element.isComplete"
                class="tasksList__taskCheckButtonIcon"
                :icon="faCheck"
              />
            </button>
            <div class="tasksList__name">{{ element.name }}</div>
            <FontAwesomeIcon
              class="tasksList__trashIcon"
              :icon="faTrash"
              @click="removeTodo(element.id)"
            />
          </div>
        </template>
      </DraggableComponent>
    </div>
  </HeadingButtonContainer>
</template>

<script setup lang="ts">
import { type Ref, ref } from 'vue';
import DraggableComponent from 'vuedraggable';
import type { Todo } from '@/types/commonTypes';
import PrimaryButton from '@/components/buttons/PrimaryButton.vue';
import HeadingButtonContainer from '@/components/layouts/HeadingButtonContainer.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlus, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

const items: Ref<Todo[]> = ref([
  { id: 1, order: 1, name: 'Item 1', isComplete: false },
  { id: 2, order: 2, name: 'Item 2', isComplete: false },
  { id: 3, order: 3, name: 'Item 3', isComplete: true },
  { id: 4, order: 4, name: 'Item 4', isComplete: true },
]);

const drag: Ref<boolean> = ref(false);

/** Detect if some element is moved to another place */
const handleChange = (event: any) => {
  console.log(event);
};

/** Add new todo */
const addTodo = (): void => {
  console.log('Add todo');
};

/**
 * Remove todo
 * @param {number} id todo id to remove
 */
const removeTodo = (id: number): void => {
  items.value = items.value.filter((todo: Todo) => todo.id !== id);
};

/**
 * Change complete status for todo
 * @param {number} id todo id to change
 */
const toggleTodo = (id: number): void => {
  items.value.forEach((todo: Todo) => {
    if (todo.id === id) {
      todo.isComplete = !todo.isComplete;
    }
  });
};
</script>

<style scoped lang="scss">
.tasksList {
  $self: &;

  &__draggableList {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__task {
    display: flex;
    align-items: center;

    padding: 15px;

    border-radius: 15px;
    box-shadow: 0 0 15px rgba($ColorAccentVariant, 0.1);
    border: solid 1px rgba($ColorAccentVariant, 0.1);
    background-color: $ColorWhite;

    &--complete {
      background-color: rgba($ColorWhite, 0.5);
    }
  }

  &__taskCheckButton {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 30px;
    height: 30px;
    margin-right: 15px;

    border-radius: 50%;
    background-color: $ColorWhite;
    border: solid 1px $ColorAccentVariant;

    #{ $self }__task--complete & {
      background-color: $ColorAccentVariant;
    }
  }

  &__taskCheckButtonIcon {
    font-size: 1rem;
    color: $ColorWhite;
  }

  &__name {
    flex: 1;

    font-weight: 500;
    font-family: $teachers;
    color: $ColorAccentVariant;
    font-size: 1.125rem;

    #{ $self }__task--complete & {
      opacity: 0.5;
    }
  }

  &__trashIcon {
    color: $ColorAccent;
    font-size: 0.9375rem;
  }
}
</style>
