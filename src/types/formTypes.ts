export type SearchForm = {
  search: string;
};

export type SubjectsModalForm = {
  subjectName: string;
  classRoom: string;
};

export type EventsModalForm = {
  eventName: string;
};

export type TabSubjectsForm = SearchForm & SubjectsModalForm;

export type TabEventsForm = SearchForm & EventsModalForm;

export type LoginForm = { username: string; password: string };

export type RegisterForm = {
  username: string;
  password: string;
  repeatPassword: string;
};

export type TodoModalForm = {
  todoName: string;
};
