import moment, { Moment } from 'moment';
import * as R from 'ramda';

export interface Program {
  name: string,

  title: string,
  date: ProgramDate,
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

  name: string,
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
      const asPrograms: Program[] = data.map((d: APIProgram, i: number) => {
        return {
          name: d.name ?? d.title,
          title: d.title,
          host: d.host,
          prod: d.prod,
          desc: d.desc,
          date: {start: moment(d.start), end: moment(d.end)},
          dates: [{start: moment(d.start), end: moment(d.end)}],

          imgSrc: d.photo,
          thumbSrc: d.thumb
        }
      });
      asPrograms.map(p => {
        asPrograms.map(o => {
          if(o.name===p.name && o.dates.indexOf(p.dates[0]) === -1) {
            o.dates.push(p.dates[0]);
          }
        });
      });
      asPrograms.map(p => {
        p.dates.sort((a: ProgramDate, b: ProgramDate) => a.start.isBefore(b.start) ? -1 : 1);
      });
      return asPrograms;
    });

// TODO: Make this prettier
export const sortAndGroupForAlphabetical = (programs: Program[]) => {
  const sortedDate = R.sort((a: Program, b: Program) =>
    a.date.start.isBefore(b.date.start) ? -1 : 1, programs);

  const sortedName = R.sort((a: Program, b: Program) =>
    a.title.localeCompare(b.title, 'fi', {sensitivity: 'base'}), sortedDate);

  const byName = R.values((R as any).groupBy(R.prop('title'), sortedName))

  const datesAsArrays = byName.map(d => {
    let first = d.shift();

    /*d.map((e: Program) => {
      if (first.dates.indexOf(...e.dates) === -1)
        first.dates.push(...e.dates)
    })*/

    return first;
  })

  return datesAsArrays;

  //return byName;
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
      a.date.start.isBefore(b.date.start) ? -1 : 1, programs);

    const byDate = R.filter((a: Program) => isSameDate(a.date.start, date), sorted);

    if (byDate.length > 0) {
      const prev = moment(date).subtract(1, 'days');
      const next = moment(date).add(1, 'days');
      const prevByDate = R.filter((a: Program) => isSameDate(a.date.start, prev), sorted);
      const nextByDate = R.filter((a: Program) => isSameDate(a.date.start, next), sorted);

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

interface ForMap {
  programs: Program[],
  date: Moment,
  prev: Moment | null,
  next: Moment | null
}

const splitProgramByMidnight = (programs: Program[]) =>
{
	var toAdd:Program[] = [];
	for (let i = 0; i < programs.length; i++)
	{
		var p = programs[i];
		var split = !p.date.start.isSame(p.date.end, "date") && p.date.end.hour() !== 0;
		if(split)
		{
			console.log("split " + p.name);
			var ndStart = p.date.end.clone().startOf("day");

			toAdd.push( {
				  name: p.name,
				  title: p.title,
				  host: p.host,
				  prod: p.prod,
				  desc: p.desc,
				  date: {start: ndStart, end: p.date.end.clone()},
				  dates: [{start: ndStart, end: p.date.end.clone()}],

				  imgSrc: p.imgSrc,
				  thumbSrc: p.thumbSrc
				}
			)
			p.date.end.startOf("day");
		}
	}
	for (let i =0; i < toAdd.length; i++)
	{
		programs.push(toAdd[i]);
	}
	programs.sort((a: Program, b: Program) =>
      a.date.start.isBefore(b.date.start) ? -1 : 1);
	return programs;
}

export const sortAndGroupForMap = (programs: Program[], date: Moment): ForMap => {
  const isSameWeek = (startDate: Moment, sameAs: Moment) => {
    const start = moment(startDate);
    return sameAs.isSame(start, 'isoWeek');
  }
  splitProgramByMidnight(programs);
  if (programs.length > 0) {
    const sorted = R.sort((a: Program, b: Program) =>
      a.date.start.isBefore(b.date.start) ? -1 : 1, programs);

    const byWeek = R.filter((a: Program) => isSameWeek(a.date.start, date), sorted);

    if (byWeek.length > 0) {
      const prev = moment(date).subtract(1, 'weeks');
      const next = moment(date).add(1, 'weeks');
      const prevByWeek = R.filter((a: Program) => isSameWeek(a.date.start, prev), sorted);
      const nextByWeek = R.filter((a: Program) => isSameWeek(a.date.start, next), sorted);

      return {
        programs: byWeek,
        date: date,
        prev: prevByWeek.length > 0 ? prev : null,
        next: nextByWeek.length > 0 ? next : null
      };
    } else {
      const first = sorted[0].dates[0].start;
      const last = sorted[sorted.length - 1].dates[0].start;

      if (date.isBefore(first)) {
        return sortAndGroupForMap(programs, moment(first));
      } else {
        return sortAndGroupForMap(programs, moment(last));
      }
    }
  } else {
    return { programs: [], date: date, prev: null, next: null };
  }
};

export const getProgramByName = (name: string, programs: Program[], date: Moment): Program | undefined => {
  return programs.find(p => p.name === name && p.date.start.date() === date.date() && p.date.start.month() === date.month());
}

export const getCurrentProgram = (programs: Program[]): Program => {
  if(!programs.length) return {name: '', title: '', date: {start: moment(), end: moment()}, dates: [], imgSrc: '', thumbSrc: '' };
  const sorted = R.sort((a: Program, b: Program) =>
    a.date.start.isBefore(b.date.start) ? -1 : 1, programs);
  var p = sorted[0];
  var now = moment();
  for(var i of sorted) {
    if(i.date.start <= now && i.date.end > now) p = i;
  }
  if(now > sorted[sorted.length-1].date.start) return sorted[sorted.length-1];
  return p;
}

export const getNextProgramItem = (programs: Program[]): Program => {
  if(!programs.length) return {name: '', title: '', date: {start: moment(), end: moment()}, dates: [], imgSrc: '', thumbSrc: '' };
  const sorted = R.sort((a: Program, b: Program) =>
    a.date.start.isBefore(b.date.start) ? -1 : 1, programs);
  var p = sorted[0];
  var current = getCurrentProgram(programs);
  var now = current.date.end;
  for(var i of sorted) {
    if(i.date.start <= now && i.date.end > now) p = i;
  }
  if(now > sorted[sorted.length-1].date.start) return sorted[sorted.length-1];
  return p;
}

export const getNextProgram = (programs: Program[], program: Program, date:Moment): Program | null => {
  if(!programs.length) return null;
  if(!program) return null;
  
  let sorted = R.sort((a: Program, b: Program) =>
    a.date.start.isBefore(b.date.start) ? -1 : 1, programs);

  sorted = sorted.filter( (a:Program) => a.date.start.isSameOrAfter(date, "date"));
  if(sorted.length===null) return null;

  var ci = sorted.findIndex( (p) => p && p.name===program.name);

  if(ci+1 < sorted.length)
	return sorted[ci+1];
  return null;
}

export const getPreviousProgram = (programs:Program[], program: Program, date:Moment): Program | null => {
  if(!programs.length) return null;
  if(!program) return null;

  let sorted = R.sort((a: Program, b: Program) =>
    a.date.start.isBefore(b.date.start) ? -1 : 1, programs);

  sorted = sorted.filter( (a:Program) => a.date.start.isSameOrBefore(date, "date"));
  if(sorted.length===null) return null;

  var ci = sorted.reverse().findIndex( (p) => p && p.name===program.name);
  if(ci+1 < sorted.length)
	return sorted[ci+1];
  return null;
}

export const hasAlreadyAired = (program: Program): boolean => {
  var now = moment();
  if(program.date.start <= now) {
    return true;
  } 
  return false;
}

export const submitFeedback = (e: React.SyntheticEvent): void => {
    const target = e.target as typeof e.target & {
        rating: { value: number }
        feedback: { value: string }
        show: { value: string }
    }
    const rating = target.rating.value;
    const feedback = target.feedback.value;
    const program = target.show.value;
    sendFeedback(program, rating, feedback);
    e.preventDefault();
}

export const sendFeedback = (title: string, rating: number, feedback?: string): boolean => {
  if(title===undefined) {
    return false;
  }
  if(rating > 10 || rating < 0) {
    return false;
  }
  const req = {
    method: "POST",
    body: JSON.stringify({show: title, rating: rating, feedback: feedback})
  };
  fetch("/api/feedback", req);
  return true;
}
