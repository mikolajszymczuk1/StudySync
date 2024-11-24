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
        :list="items"
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
            :id="`todo-${element.id}`"
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
            <div
              class="tasksList__name"
              @click="editTodo(element.id, element.name)"
            >
              {{ element.name }}
            </div>
            <FontAwesomeIcon
              class="tasksList__trashIcon"
              :icon="faTrash"
              @click="removeTodo(element.id)"
            />
          </div>
        </template>
      </DraggableComponent>
    </div>
    <CreateEditModal
      :modal-open="modalOpen"
      :heading="editMode ? 'Edit todo' : 'Create new todo'"
      :is-edit-mode="editMode"
      small-size
      @on-close="closeModal()"
      @on-delete="removeTodo(todoIdToEdit)"
      @on-save="saveUpdateTodo()"
    >
      <ModalForm>
        <div>
          <ModalInputLabel>Todo name:</ModalInputLabel>
          <CommonInput
            name="todoName"
            placeholder="Write todo name ..."
            no-label
            no-icon
          />
        </div>
      </ModalForm>
    </CreateEditModal>
  </HeadingButtonContainer>
</template>

<script setup lang="ts">
import { type Ref, ref, type PropType } from 'vue';
import DraggableComponent from 'vuedraggable';
import Todo from '@/mod/todo/model/Todo';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlus, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useTodoStore } from '@/stores/todoStore';
import { useForm } from 'vee-validate';
import type { TodoModalForm } from '@/types/formTypes';

import PrimaryButton from '@/components/buttons/PrimaryButton.vue';
import HeadingButtonContainer from '@/components/layouts/HeadingButtonContainer.vue';
import CreateEditModal from '@/components/modals/CreateEditModal.vue';
import ModalInputLabel from '@/components/ui/ModalInputLabel.vue';
import CommonInput from '@/components/inputs/CommonInput.vue';
import ModalForm from '@/components/layouts/ModalForm.vue';

defineProps({
  items: {
    type: Array as PropType<Todo[]>,
    default: () => [],
  },
});

const todoStore = useTodoStore();
const { values, setFieldValue } = useForm<TodoModalForm>();

const drag: Ref<boolean> = ref(false);

// Modal data
// ---------------------------------------------

const modalOpen: Ref<boolean> = ref(false);
const editMode: Ref<boolean> = ref(false);
const todoIdToEdit: Ref<number> = ref(-1);

// ---------------------------------------------

const openModal = (): void => {
  modalOpen.value = true;
};

const closeModal = (): void => {
  modalOpen.value = false;
};

/** Detect if some element is moved to another place */
const handleChange = async (event: any): Promise<void> => {
  const id: number = parseInt(event.item.id.split('-')[1]);
  const order: number = event.newIndex + 1;
  await todoStore.reorder(id, order);
};

/** Add new todo */
const addTodo = (): void => {
  editMode.value = false;
  setFieldValue('todoName', '');
  openModal();
};

/**
 * Edit exists todo
 * @param {number} id todo id
 * @param {string} name todo name
 */
const editTodo = (id: number, name: string): void => {
  editMode.value = true;
  todoIdToEdit.value = id;
  setFieldValue('todoName', name);
  openModal();
};

/**
 * Remove todo
 * @param {number} id todo id to remove
 */
const removeTodo = async (id: number): Promise<void> => {
  await todoStore.remove(id);
  closeModal();
};

/**
 * Change complete status for todo
 * @param {number} id todo id to change
 */
const toggleTodo = async (id: number): Promise<void> => {
  await todoStore.toggleTodo(id);
};

/** Save or update todo */
const saveUpdateTodo = async (): Promise<void> => {
  if (values.todoName === '') {
    closeModal();
    return;
  }

  if (editMode.value) {
    await todoStore.update(todoIdToEdit.value, values.todoName);
  } else {
    await todoStore.add(values.todoName);
  }

  closeModal();
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

    padding-right: 10px;

    overflow: hidden;

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
