class Event {
  id: number = -1;
  name: string = '';
  eventDate: number = 0;
  userId: number = -1;

  constructor(id: number, name: string, eventDate: number, userId: number) {
    this.id = id;
    this.name = name;
    this.eventDate = eventDate;
    this.userId = userId;
  }

  public static createEventObject(data: {
    id: number;
    name: string;
    eventDate: number;
    userId: number;
  }): Event {
    return new Event(data.id, data.name, data.eventDate, data.userId);
  }
}

export default Event;
