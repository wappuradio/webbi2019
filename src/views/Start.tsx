import React, { FunctionComponent } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import Interval from 'react-interval-rerender';

import Tube from '../views/Tube';
import Friends from '../components/Friends';
import PlayButton from '../components/PlayButton';
import { ProgramListItem } from '../components/Program/ProgramItem';
import { Program, getCurrentProgram, getNextProgramItem } from '../logic/Program';
import { getStreams } from '../logic/Streams';
import { News } from '../components/News';

const youtubeVideoId = "st6-l5M72rk";

interface StartProps {
  programs: Program[]
}

const Start: FunctionComponent<StartProps> = ({programs}) => (
  <section className='view-container -start'>
    <h1>Rakkauden Wappuradio</h1>
    <section className='radio-player'>
      <PlayButton />
      <div className='info'>
        <Interval delay={60000}>
          {() => <div>
            <h2>Studiossa</h2>
            <ProgramListItem {...getCurrentProgram(programs)} />
            <h3>Seuraavaksi</h3>
            <ProgramListItem {...getNextProgramItem(programs)} />
          </div>}
        </Interval>
      </div>
    </section>
    <Switch>
      <Route path="/" exact render={() =>
        <div>
          <News />
          {
            <h2><NavLink to='/watch/' exact>Kurkista studioon</NavLink></h2>
          }
        </div>
      }/>
      <Route path="/watch/" exact render={() =>
        <Tube videoId={youtubeVideoId} />
      }/>
    </Switch>
    <h2>Menossa mukana</h2>
    <Friends />
    <h2>Striimilinkit</h2>
    <ul>
      <li>
        Ääni:{' '}
        {getStreams().map((stream, i) =>
          <React.Fragment key={i}>
            {i === 0 ? '' : ', '}
            <a href={stream.url}>{stream.name}</a>
          </React.Fragment>
        )}
      </li>
      <li>Kuva: <a href={`https://youtu.be/${youtubeVideoId}`}>YouTube</a></li>
    </ul>
  </section>
);

export default Start;
