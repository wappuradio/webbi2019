import React, { FunctionComponent, ReactNode } from 'react';
import { Program } from '../../logic/Program';
import { ProgramSingleItem } from './ProgramItem';

interface TooltipProps {
  program: Program,
  left: boolean,
  children: ReactNode
}

const ProgramMapTooltip: FunctionComponent<TooltipProps> = ({ program, left, children }) => 
{
  const className = left ? "map-tooltip-content right" : "map-tooltip-content left";
  return (
  <>
  {children}
    <div className={className}>
     <ProgramSingleItem {...program} showImg={false} />
    </div>
    
  </>
)};

export default ProgramMapTooltip;
