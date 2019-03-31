import React, { FunctionComponent } from 'react';
import { NavLink, Route, match, Switch, RouteComponentProps } from 'react-router-dom';
import moment from 'moment';

import { Program } from '../logic/Program';
import ProgramList from '../components/Program/ProgramList';
import ProgramTimetable from '../components/Program/ProgramTimetable';


interface ProgramsProps {
  programs: Program[]
}

interface ProgramsDateProps {
  programs: Program[],
  match?: match<{date: string}>
}
interface ProgramSingleProps {
  match?: match<{name: string}>
}

const ProgramSingle: FunctionComponent<ProgramSingleProps> = ({ match }) => (
  <div>todo {match && match.params.name}</div>
);

const ProgramTimetableDate: FunctionComponent<RouteComponentProps &ProgramsDateProps> = ({ match, programs }) => {
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
        <ProgramList {...{programs}} />}
      />
      <Route
        path='/programs/timetable/' exact
        render={() => <ProgramTimetable {...{programs}} date={moment()} />}
      />
      <Route
        path='/programs/timetable/:date'
        render={(route) => <ProgramTimetableDate {...route} {...{programs}} />}
      />
      <Route path='/programs/:name' component={ProgramSingle} />
    </Switch>
  </section>
);

export default Programs;
