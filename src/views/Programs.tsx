import React, { FunctionComponent } from 'react';
import { NavLink, Route, match, Switch } from 'react-router-dom';

import { Program } from '../logic/Program';
import ProgramList from '../components/Program/ProgramList'
import ProgramTimetable from '../components/Program/ProgramTimetable'

interface ProgramSingleProps {
  match?: match<{name: string}>
}

const ProgramSingle: FunctionComponent<ProgramSingleProps> = ({ match }) => (
  <div>todo {match && match.params.name}</div>
);

interface ProgramsProps {
  programs: Program[]
}

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
      <Route path="/programs/" exact render={() =>
        <ProgramList {...{programs}} />}
      />
      <Route path="/programs/timetable/" render={() =>
        <ProgramTimetable {...{programs}} />
      } />
      <Route path="/programs/:name" component={ProgramSingle} />
    </Switch>
  </section>
);

export default Programs;
