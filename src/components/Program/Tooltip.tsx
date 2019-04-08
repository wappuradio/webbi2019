import React, { FunctionComponent, ReactNode } from 'react';

interface TooltipProps {
  tooltip: string,
  host: string,
  prod: string,
  children: ReactNode
}

const ToolTip: FunctionComponent<{ tooltip?: string, host?:string, prod?:string, children: ReactNode }> = ({ tooltip, host, prod, children }) => (
  <div className="map-tooltip">
    {children}
    <div className="map-tooltip-tooltiptext">
      <p>
        {tooltip}
      </p>
      <p className='sub'>
        { host && <span style={{display:"block"}}><span className='label'>Äänessä</span> <strong>{ host }</strong></span> }
        { prod && <span style={{display:"block"}}><span className='label'>Tuottaja</span> <strong>{ prod }</strong></span> }
      </p>
    </div>
    
  </div>
);

export default ToolTip;
