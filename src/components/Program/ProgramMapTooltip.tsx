import React, { FunctionComponent, ReactNode } from 'react';
import { Program } from '../../logic/Program';
import { ProgramSingleItem } from './ProgramItem';

interface TooltipProps {
  program: Program,
  children: ReactNode
}

const ProgramMapTooltip: FunctionComponent<{ program: Program, children: ReactNode }> = ({ program, children }) => (
  <>
  {children}
  <div className="map-tooltip">    
    <div className="map-tooltip-content">
     <ProgramSingleItem {...program} showImg={false} />
    </div>
    
  </div>
  </>
);

export default ProgramMapTooltip;
