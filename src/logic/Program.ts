import moment, { Moment } from 'moment';
import * as R from 'ramda';

export interface Program {
  name: string,

  title: string,
  dates: ProgramDate[],
  host?: string,
  prod?: string,
  desc?: string,

  imgSrc: string,
  thumbSrc: string
}

interface ProgramDate {
  start: Moment,
  end: Moment
}

interface APIProgram {
  id: string,

  start: Date,
  end: Date,

  title: string,
  host: string,
  prod: string,
  desc: string,

  timestamp: Date,

  photo: string,
  thumb: string
}

export const fetchProgramArray: Promise<Program[]> =
  fetch('https://wappuradio.fi/api/programs')
    .then(results => results.json())
    .then((data: APIProgram[]) => {
      const aprilliUrl = process.env.PUBLIC_URL + '/kisu/kisu';
      const asPrograms: Program[] = data.map((d: APIProgram, i: number) => {
        const num = i % 20 + 1;
        return {
          name: d.title.toLowerCase().replace(/[^a-z]/g,''),
          title: d.title,
          host: d.host,
          prod: d.prod,
          desc: d.desc,
          dates: [{start: moment(d.start), end: moment(d.end)}],

          imgSrc: d.photo,
          thumbSrc: d.thumb
        }
      });

      return asPrograms;
    });

// TODO: Make this prettier
export const sortAndGroupForAlphabetical = (programs: Program[]) => {
  const sortedDate = R.sort((a: Program, b: Program) =>
    a.dates[0].start.isBefore(b.dates[0].start) ? -1 : 1, programs);

  const sortedName = R.sort((a: Program, b: Program) =>
    a.title.localeCompare(b.title, 'fi', {sensitivity: 'base'}), sortedDate);

  const byName = R.values((R as any).groupBy(R.prop('title'), sortedName))

  const datesAsArrays = byName.map(d => {
    let first = d.shift();

    d.map((e: Program) => first.dates.push(...e.dates))

    return first;
  })

  return datesAsArrays;
};

interface ForTimetable {
  programs: Program[],
  date: Moment,
  prev: Moment | null,
  next: Moment | null
}

// TODO: Make this prettier
export const sortAndGroupForTimetable = (programs: Program[], date: Moment): ForTimetable => {
  const isSameDate = (startDate: Moment, sameAs: Moment) => {
    const start = moment(startDate);
    return sameAs.isSame(start, 'day');
  }

  if (programs.length > 0) {
    const sorted = R.sort((a: Program, b: Program) =>
      a.dates[0].start.isBefore(b.dates[0].start) ? -1 : 1, programs);

    const byDate = R.filter((a: Program) => isSameDate(a.dates[0].start, date), sorted);

    if (byDate.length > 0) {
      const prev = moment(date).subtract(1, 'days');
      const next = moment(date).add(1, 'days');
      const prevByDate = R.filter((a: Program) => isSameDate(a.dates[0].start, prev), sorted);
      const nextByDate = R.filter((a: Program) => isSameDate(a.dates[0].start, next), sorted);

      return {
        programs: byDate,
        date: date,
        prev: prevByDate.length > 0 ? prev : null,
        next: nextByDate.length > 0 ? next : null
      };
    } else {
      const first = sorted[0].dates[0].start;
      const last = sorted[sorted.length - 1].dates[0].start;

      if (date.isBefore(first)) {
        return sortAndGroupForTimetable(programs, moment(first));
      } else {
        return sortAndGroupForTimetable(programs, moment(last));
      }
    }
  } else {
    return { programs: [], date: date, prev: null, next: null };
  }
};

export const getProgramByName = (name: string, programs: Program[]): Program => {
  return R.find(R.propEq('name', name))(programs);
}
