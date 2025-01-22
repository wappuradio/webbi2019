import React, { FunctionComponent } from 'react';
import { NavLink, Route, match, Switch, RouteComponentProps, Redirect } from 'react-router-dom';
import moment, { Moment } from 'moment';

import { Program, getProgramByName, sortAndGroupForAlphabetical, getNextProgram, getPreviousProgram, hasAlreadyAired } from '../logic/Program';
import ProgramList from '../components/Program/ProgramList';
import ProgramMap from '../components/Program/ProgramMap';
import ProgramTimetable from '../components/Program/ProgramTimetable';
import { ProgramSingleItem } from '../components/Program/ProgramItem';

interface ProgramsProps {
  programs: Program[]
}

interface ProgramsDateProps {
  programs: Program[],
  match?: match<{ date: string }>
}

interface ProgramsWeekProps {
  programs: Program[],
  match?: match<{ week?: string }>
}

interface ProgramSingleProps {
  programs: Program[],
  match?: match<{ name?: string, date?: string }>
}

const ProgramAlphabetical: FunctionComponent<ProgramsProps> = ({ programs }) => {
  const grouped = sortAndGroupForAlphabetical(programs);

  return (
    <ProgramList programs={grouped} />
  );
}

const ProgramSingle: FunctionComponent<RouteComponentProps & ProgramSingleProps> = ({ history, match, programs }) => {

  let year: number | undefined;
  if (programs.length > 0) {
    year = programs[0].date.start.year();
  }
  else {
    year = moment().year();
  }
  let date: Moment | undefined;
  if (match.params.date) {
    const dateFromUrl = match.params.date;
    date = moment(dateFromUrl + year, "DDMMYYYY");
  }

  const p = getProgramByName(match.params.name!, programs, date)!;
  let previous = "";
  let next = "";
  let pDate = match.params.date;
  let hasAired = false;
  if (pDate != null || (p != null && p.dates.length === 1)) {
    let date = pDate === null ? p.date.start : moment(pDate, "DDMM")
    //Check next & previous program.
    let PP = getPreviousProgram(programs, p, date);
    let NP = getNextProgram(programs, p, date);
    if (PP != null) previous = "/programs/p/" + PP.name + "/" + PP.date.start.format("DDMM");
    if (NP != null) next = "/programs/p/" + NP.name + "/" + NP.date.start.format("DDMM");
  }
  if (p != null) {
    hasAired = hasAlreadyAired(p);
  }
  return (
    <div>
      {p && <ProgramSingleItem {...p} activeDay={pDate} previous={previous} next={next} hasAired={hasAired} />}

      <button className="back-button" onClick={() => history.goBack()}>
        Takaisin
      </button>
    </div>
  );
};


const ProgramTimetableDate: FunctionComponent<RouteComponentProps & ProgramsDateProps> = ({ match, programs }) => {
  let date = moment();

  if (match && match.params.date) {
    date = moment(match.params.date, 'DDMM')
  };

  return (
    <ProgramTimetable {...{ programs, date }} />
  );
};

const ProgramMapView: FunctionComponent<RouteComponentProps & ProgramsWeekProps> = ({ match, programs }) => {
  const week = match.params.week!
  return (
    <ProgramMap {...{ programs, week }} />
  );

}

const Programs: FunctionComponent<ProgramsProps> = ({ programs }) => {
  const curWeek = moment().week();
  const sortedPrograms = programs.sort((x, y) => x.date.start.toISOString().localeCompare(y.date.start.toISOString()));
  const firstWeek = programs.length > 0 ? sortedPrograms[0].date.start.week() : curWeek;
  const delta = curWeek - firstWeek + 1;
  const mapWeek = "/programs/map/" + delta;

  return (
    <section className='view-container -programs'>
      <h1>Ohjelmat</h1>
      <h2>
        <nav>
          <li>
            <NavLink to='/programs/timetable/'>Aikataulu</NavLink>
          </li>
          <li>
            <NavLink to='/programs/' exact>Lista</NavLink>
          </li>
          <li>
            <NavLink to='/programs/map/'>Kartta</NavLink>
          </li>
        </nav>
      </h2>

      <Switch>
        <Route path='/programs/' exact render={() =>
          <ProgramAlphabetical {...{ programs }} />}
        />
        <Route
          path='/programs/timetable/' exact
          render={() => <ProgramTimetable {...{ programs }} date={moment()} />}
        />

        <Route
          path='/programs/map/' exact>
          {programs.length > 0 ?
            (<Redirect to={mapWeek} />) :
            ""}
        </Route>

        <Route
          path='/programs/map/:week?'
          render={(route) => <ProgramMapView {...route} {...{ programs }} />}
        />
        <Route
          path='/programs/timetable/:date'
          render={(route) => <ProgramTimetableDate {...route} {...{ programs }} />}
        />
        <Route
          path='/programs/p/:name/:date?'
          render={(route) => <ProgramSingle {...route} {...{ programs }} />}
        />
      </Switch>
      <p>
        <a href="https://wappuradio.fi/wappuradio.ics">Lataa ohjelmakartta vaikkapa Google-kalenteriin tästä!</a> (.ics)
      </p>
    </section>
  );
}
export default Programs;
