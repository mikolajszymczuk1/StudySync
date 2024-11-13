export type SubjectData = {
  name: string;
  day: string;
  start: string;
  end: string;
  classNumber: string;
};

export type EventData = {
  name: string;
  eventDate: string;
};

export type SelectOption = {
  text: string;
  value: string;
};

export type Todo = {
  id: number;
  order: number;
  name: string;
  isComplete: boolean;
};
