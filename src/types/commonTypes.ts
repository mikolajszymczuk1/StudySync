export type SubjectData = {
  id: number;
  name: string;
  day: string;
  start: string;
  end: string;
  evenOdd: string;
  classNumber: string;
};

export type EventData = {
  id: number;
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
