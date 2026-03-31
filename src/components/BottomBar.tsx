import React, { FunctionComponent } from 'react';
import moment from 'moment';
import Interval from 'react-interval-rerender';

import PlayButton from './PlayButton';
import InfoItem from './InfoItem';
import NowPlaying from './NowPlaying';
import { NowHosting } from './NowHosting';
import { Program, getCurrentProgram, radioStart } from '../logic/Program';

interface BottomBarProps {
  programs: Program[],
}

const BottomBar: FunctionComponent<BottomBarProps> = ({programs}) => {
  const hasStarted = radioStart.isBefore(moment());
  const className = hasStarted ? 'bottom-bar' : 'bottom-bar bottom-bar--before';

  return (
    <section className={className}>
      <InfoItem
        title='Rakkauden Wappuradio'
        content='14.4.&ndash;30.4.'
        subcontent='101,6 MHz &bull; wappuradio.fi'
      >
        <>
          {hasStarted && <PlayButton />}
        </>
      </InfoItem>
      {hasStarted ? <NowPlaying /> : <InfoItem title='' content='' subcontent='' />}
      <Interval delay={60000}>
        {() => { return <NowHosting {...getCurrentProgram(programs)} /> }}
      </Interval>
    </section>
  );
};

export default BottomBar;
