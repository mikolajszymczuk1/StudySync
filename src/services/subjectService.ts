import { apiClient } from '@/utils/apiClient';
import Subject from '@/mod/subject/model/Subject';

/**
 * Get all subjects from server
 * @param {number} userId user id
 * @param {string} token token
 * @returns {Promise<Subject[]>} subjects items
 */
export const getAllSubjects = async (
  userId: number,
  token: string,
): Promise<Subject[]> => {
  const response = await apiClient(
    'GET',
    'subject',
    `${userId}`,
    {
      Authorization: `Bearer ${token}`,
    },
    {},
    {},
  );

  const data = response.data;
  return data.map((subjectData: any) =>
    Subject.createSubjectObject(subjectData),
  );
};

/**
 * Create new subject
 * @param {number} userId user id
 * @param {string} name name
 * @param {string} startTime start time
 * @param {string} endTime end time
 * @param {string} evenOdd even odd
 * @param {string} classNumber class number / class room name
 * @param {string} day day
 * @param {string} token token
 * @returns {Promise<Subject>} created subject object
 */
export const createSubject = async (
  userId: number,
  name: string,
  startTime: string,
  endTime: string,
  evenOdd: string,
  classNumber: string,
  day: string,
  token: string,
): Promise<Subject> => {
  const response = await apiClient(
    'POST',
    'subject',
    '',
    {
      Authorization: `Bearer ${token}`,
    },
    {},
    { userId, name, startTime, endTime, evenOdd, classNumber, day },
  );

  const data = response.data;
  return Subject.createSubjectObject(data);
};

/**
 * Update exist subject
 * @param {number} userId user id
 * @param {number} subjectId subject id
 * @param {string} name name
 * @param {string} startTime start time
 * @param {string} endTime end time
 * @param {string} evenOdd even odd
 * @param {string} classNumber class number / class room name
 * @param {string} day day
 * @param {string} token token
 * @returns {Promise<Subject>} updated subject object
 */
export const updateSubject = async (
  userId: number,
  subjectId: number,
  name: string,
  startTime: string,
  endTime: string,
  evenOdd: string,
  classNumber: string,
  day: string,
  token: string,
): Promise<Subject> => {
  const response = await apiClient(
    'PUT',
    'subject',
    `${subjectId}`,
    {
      Authorization: `Bearer ${token}`,
    },
    {},
    { userId, name, startTime, endTime, evenOdd, classNumber, day },
  );

  const data = response.data;
  return Subject.createSubjectObject(data);
};

/**
 * Delete subject
 * @param {number} userId user id
 * @param {number} subjectId subject id
 * @param {string} token token
 * @returns {Promise<Subject>} deleted subject object
 */
export const deleteSubject = async (
  userId: number,
  subjectId: number,
  token: string,
): Promise<Subject> => {
  const response = await apiClient(
    'DELETE',
    'subject',
    `${subjectId}`,
    {
      Authorization: `Bearer ${token}`,
    },
    {},
    { userId, subjectId },
  );

  const data = response.data;
  return Subject.createSubjectObject(data);
};

/**
 * Change day of subject
 * @param {number} userId user id
 * @param {number} subjectId subject id
 * @returns {Promise<Subject>} updated subject object
 */
export const changeSubjectDay = async (
  userId: number,
  subjectId: number,
  day: string,
  token: string,
): Promise<Subject> => {
  const response = await apiClient(
    'POST',
    'subject',
    `changeDay/${subjectId}`,
    {
      Authorization: `Bearer ${token}`,
    },
    {},
    { userId, day },
  );

  const data = response.data;
  return Subject.createSubjectObject(data);
};

/**
 * Change grade of subject
 * @param {number} userId user id
 * @param {number} subjectId subject id
 * @param {number} grade grade
 * @param {string} token token
 * @returns {Promise<Subject>} updated subject object
 */
export const changeSubjectGrade = async (
  userId: number,
  subjectId: number,
  grade: number,
  token: string,
): Promise<Subject> => {
  const response = await apiClient(
    'POST',
    'subject',
    `changeGrade/${subjectId}`,
    {
      Authorization: `Bearer ${token}`,
    },
    {},
    { userId, grade },
  );

  const data = response.data;
  return Subject.createSubjectObject(data);
};
