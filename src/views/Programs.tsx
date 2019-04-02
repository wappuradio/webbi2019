import React, { FunctionComponent } from 'react';
import { NavLink, Route, match, Switch, RouteComponentProps, Redirect } from 'react-router-dom';
import moment from 'moment';

import { Program, getProgramByName, sortAndGroupForAlphabetical } from '../logic/Program';
import ProgramList from '../components/Program/ProgramList';
import ProgramTimetable from '../components/Program/ProgramTimetable';
import { ProgramSingleItem } from '../components/Program/ProgramItem';

interface ProgramsProps {
  programs: Program[]
}

interface ProgramsDateProps {
  programs: Program[],
  match?: match<{date: string}>
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

const Programs: FunctionComponent<ProgramsProps> = ({ programs }) => (
  <section className='view-container -programs'>
    <h1>Ohjelmat</h1>
    <h2>
      <nav>
        <li>
          <NavLink to='/programs/' exact>Aakkosjärjestys</NavLink>
        </li>
        <li>
          <NavLink to='/programs/timetable/'>Aikataulu</NavLink>
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
        path='/programs/timetable/:date'
        render={(route) => <ProgramTimetableDate {...route} {...{programs}} />}
      />
      <Route
        path='/programs/p/:name'
        render={(route) => <ProgramSingle {...route} {...{programs}} />}
      />
    </Switch>
  </section>
);

export default Programs;
