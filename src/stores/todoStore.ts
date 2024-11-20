import { type Ref, ref } from 'vue';
import { defineStore } from 'pinia';
import Todo from '@/mod/todo/model/Todo';
import { useUserStore } from '@/stores/userStore';
import {
  getAllTodos,
  createTodo,
  updateTodo,
  removeTodo,
  changeStatus,
  reorderTodo,
} from '@/services/todoService';

export const useTodoStore = defineStore('todoStore', () => {
  const items: Ref<Todo[]> = ref([]);

  /** Load todo items to store */
  const loadItems = async (): Promise<void> => {
    const userStore = useUserStore();
    items.value = await getAllTodos(userStore.user!.id, userStore.token);
  };

  /**
   * Add new todo item to store
   * @param {string} name todo name
   */
  const add = async (name: string): Promise<void> => {
    const userStore = useUserStore();
    const order =
      items.value.length > 0
        ? items.value[items.value.length - 1].order + 1
        : 1;
    const newTodo = new Todo(-1, name, false, order, userStore.user!.id);

    newTodo.id = (
      await createTodo(
        userStore.user!.id,
        newTodo.name,
        newTodo.order,
        userStore.token,
      )
    ).id;

    items.value.push(newTodo);
  };

  /**
   * Update todo item in store
   * @param {number} id todo id
   * @param {string} name new todo name
   */
  const update = async (id: number, name: string): Promise<void> => {
    const userStore = useUserStore();
    items.value.find((todo) => todo.id === id)!.name = name;
    await updateTodo(id, userStore.user!.id, name, userStore.token);
  };

  /**
   * Remove todo item from store
   * @param {number} id todo id
   */
  const remove = async (id: number): Promise<void> => {
    const userStore = useUserStore();
    items.value = items.value.filter((todo: Todo) => todo.id !== id);
    await removeTodo(id, userStore.user!.id, userStore.token);
  };

  /**
   * Change todo status
   * @param {number} id todo id
   */
  const toggleTodo = async (id: number): Promise<void> => {
    const userStore = useUserStore();
    for (const todo of items.value) {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
        await changeStatus(
          id,
          userStore.user!.id,
          todo.isComplete,
          userStore.token,
        );
        break;
      }
    }
  };

  /**
   * Reorder todo (change todo order value)
   * @param {number} id todo id
   * @param {number} order new order value
   */
  const reorder = async (id: number, order: number): Promise<void> => {
    const userStore = useUserStore();
    await reorderTodo(id, userStore.user!.id, order, userStore.token);
  };

  return { items, loadItems, add, update, remove, toggleTodo, reorder };
});
