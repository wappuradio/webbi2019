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

export interface Programs {
  programs: Program[]
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
      const asPrograms: Program[] = data.map((d: APIProgram) => ({
        name: d.title.toLowerCase().replace(/[^a-z]/g,''),
        title: d.title,
        host: d.host,
        prod: d.prod,
        desc: d.desc,
        dates: [{start: moment(d.start), end: moment(d.end)}],

        imgSrc: d.photo,
        thumbSrc: d.thumb
      }));

      return Promise.resolve(asPrograms);
    });

export const sortAndGroupForAlphabetical = (programs: Program[]) => {
  const sorted = R.sort((a: Program, b: Program) =>
    a.dates[0].start.isBefore(b.dates[0].start) ? -1 : 1, programs);

  const byName = R.values((R as any).groupBy(R.prop('title'), sorted))

  const datesAsArrays = byName.map(d => {
    let first = d.shift();

    d.map((e: Program) => first.dates.push(...e.dates))

    return first;
  })

  return datesAsArrays;
};

export const sortAndGroupForTimetable = (programs: Program[]) => {
  const sorted = R.sort((a: Program, b: Program) =>
    a.dates[0].start.isBefore(b.dates[0].start) ? -1 : 1, programs);

  const byDate = (R as any).groupBy((a: Program) => moment(a.dates[0].start).subtract(1, 'h').format('dd D.M.'), sorted);

  const byTime = R.map(R.indexBy((a: Program) => a.dates[0].start.format('HH')), byDate);

  console.log(byTime)

  return byTime;
}
