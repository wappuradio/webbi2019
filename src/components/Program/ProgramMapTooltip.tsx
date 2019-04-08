import React, { FunctionComponent, ReactNode } from 'react';
import { Program } from '../../logic/Program';
import { ProgramSingleItem } from './ProgramItem';

interface TooltipProps {
  program: Program,
  children: ReactNode
}

const ProgramMapTooltip: FunctionComponent<{ program: Program, children: ReactNode }> = ({ program, children }) => (
  <div className="map-tooltip">
    {children}
    <div className="map-tooltip-tooltiptext">
     <ProgramSingleItem {...program} />
    </div>
    
  </div>
);

export default ProgramMapTooltip;
