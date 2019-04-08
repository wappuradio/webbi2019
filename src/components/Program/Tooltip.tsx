import React, { FunctionComponent, ReactNode } from 'react';

interface TooltipProps {
  tooltip: string,
  children: ReactNode
}

const ToolTip: FunctionComponent<{ tooltip?: string, children: ReactNode }> = ({ tooltip, children }) => (
  <div className="map-tooltip">
    {children}
    <div className="map-tooltip-tooltiptext">
      {tooltip}
    </div>
  </div>
);

export default ToolTip;
