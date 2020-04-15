import React, { FunctionComponent } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import Interval from 'react-interval-rerender';
import YouTube from 'react-youtube';

import Tube from '../views/Tube';
import Cam from '../views/Cam';
import Friends from '../components/Friends';
import PlayButton from '../components/PlayButton';
import { ProgramListItem } from '../components/Program/ProgramItem';
import { Program, getCurrentProgram } from '../logic/Program';

const ReactMarkdown = require('react-markdown');

interface StartProps {
  infoData: string,
  programs: Program[]
}

const Start: FunctionComponent<StartProps> = ({infoData, programs}) => (
  <section className='view-container -start'>
    <h1>Rakkauden Wappuradio</h1>
    <section className='radio-player'>
      <PlayButton />
      <div className='info'>
        <h2>Studiossa</h2>
        <Interval delay={60000}>
          {() => <ProgramListItem {...getCurrentProgram(programs)} />}
        </Interval>
      </div>
    </section>
    <Switch>
      <Route path="/" exact render={() =>
        <div>
          {
            <h2><NavLink to='/watch/' exact>Kurkista studioon</NavLink></h2>
          }
          {infoData.trim().length > 0 && (
            <div>
              <p>
                <ReactMarkdown source={infoData} />
              </p>
            </div>
          )}
        </div>
      }/>
      <Route path="/watch/" exact render={() =>
        <Tube videoId="OjRUu4GVruc" />
      }/>
    </Switch>
    <h2>Menossa mukana</h2>
    <Friends />
    <h2>Striimilinkit</h2>
    <ul>
      <li>Ääni: <a href="http://stream.wappuradio.fi/wappuradio.opus">Opus</a>, <a href="http://stream.wappuradio.fi/wappuradio.ogg">Vorbis</a>, <a href="http://stream.wappuradio.fi/wappuradio.mp3">MP3</a>, <a href="https://wappuradio.fi/wappuradio.m3u">M3U</a></li>
      <li>Kuva: <a href="https://youtu.be/OjRUu4GVruc">YouTube</a></li>
    </ul>
  </section>
);

export default Start;
