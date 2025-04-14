import React, { FunctionComponent } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import Interval from 'react-interval-rerender';
import ReactMarkdown from 'react-markdown';


import Tube from '../views/Tube';
import Friends from '../components/Friends';
import PlayButton from '../components/PlayButton';
import { ProgramListItem } from '../components/Program/ProgramItem';
import { Program, getCurrentProgram, getNextProgramItem } from '../logic/Program';
import MastoFeed from '../components/MastoFeed';

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
          {infoData.trim().length > 0 && (
            <div>
              <p>
                <ReactMarkdown children={infoData} />
              </p>
            </div>
          )}
          {
            <h2><NavLink to='/watch/' exact>Kurkista studioon</NavLink></h2>
          }
        </div>
      }/>
      <Route path="/watch/" exact render={() =>
        <Tube videoId="ooM5hmfsfG0" />
      }/>
    </Switch>
    {/* <MastoFeed /> */}
    <h2>Menossa mukana</h2>
    <Friends />
    <h2>Striimilinkit</h2>
    <ul>
      <li>
Ääni:
<a href="http://stream1.wappuradio.fi/wappuradio.opus">Opus-1</a>,
<a href="http://stream2.wappuradio.fi/wappuradio.opus">Opus-2</a>,
<a href="http://stream1.wappuradio.fi/wappuradio.ogg">Vorbis-1</a>,
<a href="http://stream2.wappuradio.fi/wappuradio.ogg">Vorbis-2</a>,
<a href="http://stream1.wappuradio.fi/wappuradio.mp3">MP3-1</a>,
<a href="http://stream2.wappuradio.fi/wappuradio.mp3">MP3-2</a>,
</li>
      <li>Kuva: <a href="https://youtu.be/ooM5hmfsfG0">YouTube</a></li>
    </ul>
    <a rel="me" href="https://mementomori.social/@wappuradio"></a>
  </section>
);

export default Start;
