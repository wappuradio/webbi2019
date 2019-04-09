import React, { FunctionComponent } from 'react';
import { NavLink, Route, match, Switch, RouteComponentProps, Redirect } from 'react-router-dom';
import moment from 'moment';

import { Program, getProgramByName, sortAndGroupForAlphabetical } from '../logic/Program';
import ProgramList from '../components/Program/ProgramList';
import ProgramMap from '../components/Program/ProgramMap';
import ProgramTimetable from '../components/Program/ProgramTimetable';
import { ProgramSingleItem } from '../components/Program/ProgramItem';

interface ProgramsProps {
  programs: Program[]
}

interface ProgramsDateProps {
  programs: Program[],
  match?: match<{date: string}>
}

interface ProgramsWeekProps {
  programs: Program[],
  match?: match<{week: string}>
}

interface ProgramSingleProps {
  programs: Program[],
  match?: match<{name: string}>
}

const ProgramAlphabetical: FunctionComponent<ProgramsProps> = ({ programs }) => {
  const grouped = sortAndGroupForAlphabetical(programs);

  return (
    <ProgramList programs={grouped} />
  );
}

const ProgramSingle: FunctionComponent<RouteComponentProps & ProgramSingleProps> = ({ history, match, programs }) => {

    const p = getProgramByName(match.params.name, programs);

    return (
      <div>
        {p && <ProgramSingleItem {...p} />}
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
    <ProgramTimetable {...{programs, date}} />
  );
};

const ProgramMapView: FunctionComponent<RouteComponentProps & ProgramsWeekProps> = ({ match, programs }) => {
  let week = "1";
  let date = moment();
  
  //This could be made much better.
  if(date.day() >= 29)
	week = "3";
  else if(date.day() >= 22)
	week = "2";
  
  if (match && match.params.week) {
    week = match.params.week
  };
  return (
    <ProgramMap {...{programs, week}} />
  );
}

const Programs: FunctionComponent<ProgramsProps> = ({ programs }) => (
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
          <NavLink to='/programs/map' exact>Kartta</NavLink>
        </li>
      </nav>
    </h2>

    <Switch>
      <Route path='/programs/' exact render={() =>
        <ProgramAlphabetical {...{programs}} />}
      />
      <Route
        path='/programs/timetable/' exact
        render={() => <ProgramTimetable {...{programs}} date={moment()} />}
      />
	  <Route
        path='/programs/map/' exact 
        render={(route) => <ProgramMapView {...route} {...{programs}} />}
      />
	  <Route
        path='/programs/map/:week' 
        render={(route) => <ProgramMapView {...route} {...{programs}} />}
      />
      <Route
        path='/programs/timetable/:date'
        render={(route) => <ProgramTimetableDate {...route} {...{programs}} />}
      />
      <Route
        path='/programs/p/:name'
        render={(route) => <ProgramSingle {...route} {...{programs}} />}
      />
    </Switch>
    <p>
      <a href="https://wappuradio.fi/wappuradio.ics">Lataa ohjelmakartta vaikkapa Google-kalenteriin tästä!</a> (.ics)
    </p>
  </section>
);

export default Programs;
