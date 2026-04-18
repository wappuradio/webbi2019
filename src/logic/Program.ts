import moment, { Moment } from 'moment';

// Clone to prevent mutation after an import site affecting other uses
export const radioStart = () => moment("14.04.2026", "DD.MM.YYYY").clone();

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

export const sortAndGroupForAlphabetical = (programs: Program[]) => {
  const sortedName = programs
    .sort((a: Program, b: Program) => a.date.start.isBefore(b.date.start) ? -1 : 1)
    .sort((a: Program, b: Program) => a.title.localeCompare(b.title, 'fi', {sensitivity: 'base'}));

  const byName = Object.values(
    sortedName.reduce((grouped, program) => {
        grouped[program.title] ??= [];
        grouped[program.title].push(program);
        return grouped;
    }, {})
  );

  return byName
    .filter(d => !!d)
    .map(d => d.shift());
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
    const sorted = programs.sort((a: Program, b: Program) =>
      a.date.start.isBefore(b.date.start) ? -1 : 1);

    const byDate = sorted.filter((a: Program) => isSameDate(a.date.start, date));

    if (byDate.length > 0) {
      const prev = moment(date).subtract(1, 'days');
      const next = moment(date).add(1, 'days');
      const prevByDate = sorted.some((a: Program) => isSameDate(a.date.start, prev));
      const nextByDate = sorted.some((a: Program) => isSameDate(a.date.start, next));

      return {
        programs: byDate,
        date: date,
        prev: prevByDate ? prev : null,
        next: nextByDate ? next : null
      };
    } else {
      const first = sorted[0].dates[0].start;

      if (date.isBefore(first)) {
        return sortAndGroupForTimetable(programs, moment(first));
      } else {
        const last = sorted[sorted.length - 1].dates[0].start;
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
    const sorted = programs
      .sort((a: Program, b: Program) => a.date.start.isBefore(b.date.start) ? -1 : 1);

    const byWeek = sorted.filter((a: Program) => isSameWeek(a.date.start, date));

    if (byWeek.length > 0) {
      const prev = moment(date).subtract(1, 'weeks');
      const next = moment(date).add(1, 'weeks');
      const prevByWeek = sorted.some((a: Program) => isSameWeek(a.date.start, prev));
      const nextByWeek = sorted.some((a: Program) => isSameWeek(a.date.start, next));

      return {
        programs: byWeek,
        date: date,
        prev: prevByWeek ? prev : null,
        next: nextByWeek ? next : null
      };
    } else {
      const first = sorted[0].dates[0].start;

      if (date.isBefore(first)) {
        return sortAndGroupForMap(programs, moment(first));
      } else {
        const last = sorted[sorted.length - 1].dates[0].start;
        return sortAndGroupForMap(programs, moment(last));
      }
    }
  } else {
    return { programs: [], date: date, prev: null, next: null };
  }
};

export const getProgramByName = (name: string, programs: Program[], date: Moment | undefined): Program | undefined => {
  let program;
  if (date) {
    program = programs.find(p => p.name === name && p.date.start.date() === date.date() && p.date.start.month() === date.month() && p.date.start.year() === date.year());
  } else {
    program = programs.find(p => p.name === name);
  }

  return program;
}

export const getCurrentProgram = (programs: Program[]): Program => {
  if(!programs.length) return {name: '', title: '', date: {start: moment(), end: moment()}, dates: [], imgSrc: '', thumbSrc: '' };
  const sorted = programs.sort((a: Program, b: Program) =>
    a.date.start.isBefore(b.date.start) ? -1 : 1);
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
  const sorted = programs.sort((a: Program, b: Program) =>
    a.date.start.isBefore(b.date.start) ? -1 : 1);
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
  
  const sorted = programs
    .sort((a: Program, b: Program) => a.date.start.isBefore(b.date.start) ? -1 : 1)
    .filter( (a:Program) => a.date.start.isSameOrAfter(date, "date"));

  if(sorted.length===null) return null;

  var ci = sorted.findIndex( (p) => p && p.name===program.name);

  if(ci+1 < sorted.length)
	return sorted[ci+1];
  return null;
}

export const getPreviousProgram = (programs:Program[], program: Program, date:Moment): Program | null => {
  if(!programs.length) return null;
  if(!program) return null;

  const sorted = programs
    .sort((a: Program, b: Program) => a.date.start.isBefore(b.date.start) ? -1 : 1)
    .filter( (a:Program) => a.date.start.isSameOrBefore(date, "date"));

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

export const sendFeedback = (show: string, rating: number, feedback?: string): boolean => {
  if(show===undefined) {
    return false;
  }
  if(rating > 10 || rating < 0) {
    return false;
  }
  const req = {
    method: "POST",
    body: JSON.stringify({ show, rating, feedback }),
  };
  fetch("/api/feedback", req);
  return true;
}
