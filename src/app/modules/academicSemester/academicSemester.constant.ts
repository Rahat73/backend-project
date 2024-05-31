import {
  TMonth,
  TSemesterCode,
  TSemesterName,
  TSemesterNameToCodeMapper,
} from './academicSemester.interface';

export const months: TMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const semesterName: TSemesterName[] = ['Autumn', 'Summer', 'Fall'];

export const semesterCode: TSemesterCode[] = ['01', '02', '03'];

export const semesterNameToCodeMapper: TSemesterNameToCodeMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
