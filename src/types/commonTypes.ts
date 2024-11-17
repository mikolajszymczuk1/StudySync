import type { Ref } from 'vue';

export type SubjectData = {
  id: number;
  name: string;
  day: string;
  start: string;
  end: string;
  grade: number;
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

export type WeekSubjects = {
  Monday: Ref<SubjectData[]>;
  Tuesday: Ref<SubjectData[]>;
  Wednesday: Ref<SubjectData[]>;
  Thursday: Ref<SubjectData[]>;
  Friday: Ref<SubjectData[]>;
};

export type AuthStatus = {
  status: boolean;
  error?: string;
};
