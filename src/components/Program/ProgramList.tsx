import React, { FunctionComponent } from 'react';

import { Program } from '../../logic/Program';
import { ProgramListItem } from './ProgramItem';

const ProgramList: FunctionComponent<{programs: Program[]}> = ({ programs }) => (
  <div className='alphabetical'>
    {programs.map((p: Program, i: number) => (
      <ProgramListItem key={i} {...(p)} />
    ))}
  </div>
);

export default ProgramList;
