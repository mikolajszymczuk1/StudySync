import { type Ref, ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useUserStore } from '@/stores/userStore';
import Event from '@/mod/event/model/Event';
import {
  getEvents,
  createEvent,
  updateEvent,
  removeEvent,
} from '@/services/eventService';

export const useEventStore = defineStore('eventStore', () => {
  const events: Ref<Event[]> = ref([]);

  /**
   * Convert event date to string format
   * @param {Date} date event date
   * @returns {string} event date in string format
   */
  const convertToStringDate = computed(() => (date: Date): string => {
    const year = date.getFullYear();
    const month =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    return `${year}-${month}-${day}`;
  });

  /** Load user events to store */
  const loadEvents = async (): Promise<void> => {
    const userStore = useUserStore();
    events.value = await getEvents(userStore.user!.id, userStore.token);
  };

  /**
   * Add new event to store
   * @param {string} name event name
   * @param {number} eventDate event start date
   */
  const add = async (name: string, eventDate: number): Promise<void> => {
    const userStore = useUserStore();
    const event = await createEvent(
      userStore.user!.id,
      name,
      eventDate,
      userStore.token,
    );
    events.value.push(event);
  };

  /**
   * Updated event in store
   * @param {number} eventId event id
   * @param {string} name event name
   * @param {number} eventDate event start date
   */
  const update = async (
    eventId: number,
    name: string,
    eventDate: number,
  ): Promise<void> => {
    const userStore = useUserStore();
    const updatedEvent = await updateEvent(
      eventId,
      userStore.user!.id,
      name,
      eventDate,
      userStore.token,
    );
    events.value = events.value.filter((event) => event.id !== eventId);
    events.value.push(updatedEvent);
  };

  /**
   * Remove event from store
   * @param {number} eventId event id
   */
  const remove = async (eventId: number): Promise<void> => {
    const userStore = useUserStore();
    await removeEvent(eventId, userStore.user!.id, userStore.token);
    events.value = events.value.filter((event) => event.id !== eventId);
  };

  return { events, convertToStringDate, loadEvents, add, update, remove };
});
