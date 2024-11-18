import { type Ref, ref, reactive } from 'vue';
import { defineStore } from 'pinia';
import type { WeekSubjects } from '@/types/commonTypes';
import {
  getAllSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
  changeSubjectDay,
} from '@/services/subjectService';
import { useUserStore } from '@/stores/userStore';

export const useSubjectStore = defineStore('subjectStore', () => {
  const subjects = reactive<WeekSubjects>({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
  });

  const evenOdd: Ref<string> = ref('odd');

  /** Get subjects from service and load them to store */
  const loadSubjects = async (): Promise<void> => {
    const userStore = useUserStore();

    Object.keys(subjects).forEach((day) => {
      subjects[day as keyof WeekSubjects].splice(
        0,
        subjects[day as keyof WeekSubjects].length,
      );
    });

    const subjectsToLoad = await getAllSubjects(
      userStore.user!.id,
      userStore.token,
    );
    if (subjectsToLoad.length <= 0) {
      return;
    }

    subjectsToLoad.forEach((subject) => {
      const day = subject.day as keyof WeekSubjects;
      subjects[day].push(subject);
    });
  };

  /**
   * Change single subject day
   * @param {number} subjectId subject id
   * @param {string} day day
   */
  const changeDay = async (subjectId: number, day: string): Promise<void> => {
    const userStore = useUserStore();
    await changeSubjectDay(userStore.user!.id, subjectId, day, userStore.token);
  };

  /**
   * Add new subject to store
   * @param {string} name name
   * @param {string} startTime start time
   * @param {string} endTime end time
   * @param {string} evenOdd event odd
   * @param {string} classNumber class number / class room name
   * @param {string} day day
   */
  const add = async (
    name: string,
    startTime: string,
    endTime: string,
    evenOdd: string,
    classNumber: string,
    day: string,
  ): Promise<void> => {
    const userStore = useUserStore();
    const addedSubject = await createSubject(
      userStore.user!.id,
      name,
      startTime,
      endTime,
      evenOdd,
      classNumber,
      day,
      userStore.token,
    );

    subjects[day as keyof WeekSubjects].push(addedSubject);
  };

  /**
   * Update subject in store
   * @param {number} subjectId subject id
   * @param {string} name name
   * @param {string} startTime start time
   * @param {string} endTime end time
   * @param {string} evenOdd even odd
   * @param {string} classNumber class number / class room name
   * @param {string} day day
   */
  const update = async (
    subjectId: number,
    name: string,
    startTime: string,
    endTime: string,
    evenOdd: string,
    classNumber: string,
    day: string,
  ): Promise<void> => {
    const userStore = useUserStore();
    const updatedSubject = await updateSubject(
      userStore.user!.id,
      subjectId,
      name,
      startTime,
      endTime,
      evenOdd,
      classNumber,
      day,
      userStore.token,
    );

    const daySubjects = subjects[day as keyof WeekSubjects];
    const subjectIndex = daySubjects.findIndex(
      (subject) => subject.id === subjectId,
    );

    if (subjectIndex !== -1) {
      daySubjects[subjectIndex] = updatedSubject;
    }
  };

  /**
   * Remove subject from store
   * @param {number} subjectId subject id
   * @param {string} day day
   */
  const remove = async (subjectId: number, day: string): Promise<void> => {
    const userStore = useUserStore();
    await deleteSubject(userStore.user!.id, subjectId, userStore.token);
    subjects[day as keyof WeekSubjects] = subjects[
      day as keyof WeekSubjects
    ].filter((subject) => subject.id !== subjectId);
  };

  return { subjects, evenOdd, loadSubjects, changeDay, add, update, remove };
});
