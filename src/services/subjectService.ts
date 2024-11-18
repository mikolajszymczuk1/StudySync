import { apiClient } from '@/utils/apiClient';
import Subject from '@/mod/subject/model/Subject';

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

export const changeSubjectDay = async (
  userId: number,
  subjectId: number,
  day: string,
  token: string,
) => {
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
