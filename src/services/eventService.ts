import { apiClient } from '@/utils/apiClient';
import Event from '@/mod/event/model/Event';

/**
 * Get all user events
 * @param {number} userId user id
 * @param {string} token user auth token
 * @returns {Promise<Event[]>} array of user events
 */
export const getEvents = async (
  userId: number,
  token: string,
): Promise<Event[]> => {
  const response = await apiClient('GET', 'event', `${userId}`, {
    Authorization: `Bearer ${token}`,
  });
  const data = response.data;
  return data.map((eventData: any) => Event.createEventObject(eventData));
};

/**
 * Create new event
 * @param {number} userId user id
 * @param {string} name event name
 * @param {number} eventDate event start date
 * @param {string} token user auth token
 * @returns {Promise<Event>} created event object
 */
export const createEvent = async (
  userId: number,
  name: string,
  eventDate: number,
  token: string,
): Promise<Event> => {
  const response = await apiClient(
    'POST',
    'event',
    '',
    {
      Authorization: `Bearer ${token}`,
    },
    {},
    { userId, name, eventDate },
  );
  const data = response.data;
  return Event.createEventObject(data);
};

/**
 * Update event object
 * @param {string} eventId event id
 * @param {number} userId user id
 * @param {string} name event name
 * @param {number} eventDate event start date
 * @param {string} token user token
 * @returns {Promise<Event>} updated event object
 */
export const updateEvent = async (
  eventId: number,
  userId: number,
  name: string,
  eventDate: number,
  token: string,
): Promise<Event> => {
  const response = await apiClient(
    'PUT',
    'event',
    `${eventId}`,
    {
      Authorization: `Bearer ${token}`,
    },
    {},
    { userId, name, eventDate },
  );
  const data = response.data;
  return Event.createEventObject(data);
};

/**
 * Remove specific event
 * @param {number} eventId event id
 * @param {number} userId user id
 * @param {string} token user auth token
 * @returns {Promise<Event>} removed event object
 */
export const removeEvent = async (
  eventId: number,
  userId: number,
  token: string,
): Promise<Event> => {
  const response = await apiClient(
    'DELETE',
    'event',
    `${eventId}`,
    {
      Authorization: `Bearer ${token}`,
    },
    {},
    { userId },
  );
  const data = response.data;
  return Event.createEventObject(data);
};
