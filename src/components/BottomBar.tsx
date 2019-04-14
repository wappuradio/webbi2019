import React, { FunctionComponent } from 'react';
import Interval from 'react-interval-rerender';

import PlayButton from './PlayButton';
import InfoItem from './InfoItem';
import NowPlaying from './NowPlaying';
import { NowHosting } from './NowHosting';
import { Program, getCurrentProgram } from '../logic/Program';

interface BottomBarProps {
  programs: Program[]
}

const BottomBar: FunctionComponent<BottomBarProps> = ({programs}) => {
  var p = getCurrentProgram(programs);
  return (
  <section className='bottom-bar'>
    <InfoItem
      title='Rakkauden Wappuradio'
      content='15.4.&ndash;30.4.'
      subcontent='106,4 MHz &bull; wappuradio.fi'
    >
    <PlayButton />
    </InfoItem>
    <NowPlaying />
    <Interval delay={60000}>
      {() => { return <NowHosting {...getCurrentProgram(programs)} /> }}
    </Interval>
  </section>
)};

export default BottomBar;
