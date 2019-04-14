import React, { FunctionComponent } from 'react';
import moment from 'moment';
import { NavLink, Route, Switch } from 'react-router-dom';
import Interval from 'react-interval-rerender';

import InfoItem from '../components/InfoItem';
import PlayButton from '../components/PlayButton';
import { ProgramListItem } from '../components/Program/ProgramItem';
import { Program, getCurrentProgram } from '../logic/Program';
import Cam from '../views/Cam';

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
          {() => { return <ProgramListItem {...getCurrentProgram(programs)} /> } }
        </Interval>
        {/*<InfoItem
          title='Nyt soi'
          content='Tässä on kappaleen nimi'
          subcontent='Artistin nimi taas tässä'
        />*/}
      </div>
    </section>
    {infoData.trim().length > 0 && (
      <div>
        <h2>Uutineet</h2>
        <p>
          <ReactMarkdown source={infoData} />
        </p>
      </div>
    )}
    <Switch>
      <Route path="/" exact render={() =>
        <h2><NavLink to='/watch/' exact>Kurkista studioon</NavLink></h2>
      }/>
      <Route path="/watch/" exact render={() =>
        <Cam url="https://mordor.wappuradio.fi/hls/wappuradio.m3u8" />
      }/>
    </Switch>
    <div className='friends'>
    { (['ambientia.png', 'atostek.png', 'bitwise.png', 'cinia.png', 'cybercom.png', 'digia.png', 'eatech.png', 'etteplan.png', 'futurice.gif', 'gofore.png', 'intopalo.png', 'jussihanna.png', 'keisari.png', 'misnot.png', 'netum.png', 'poas.png', 'profit.png', 'pyynikki.png', 'rdvelho.png', 'riemurinne.png', 'solita.png', 'vincit.jpg', 'wapice.png', 'yit.png']).map((logo) => {
        logo = 'https://wappuradio.fi/files/img/friend/'+logo
        var lol = { order: Math.floor(Math.random()*100) }
        return (
          <img src={logo} style={lol} width='240' height='70' />
        );
    }) }
    </div>
    <h2>Striimilinkit</h2>
    <ul>
      <li><a href="/wappuradio.m3u">M3U playlist</a></li>
      <li><a href="http://stream.wappuradio.fi/wappuradio.opus">Opus Audio</a></li>
      <li><a href="http://stream.wappuradio.fi/wappuradio.ogg">Vorbis Audio</a></li>
      <li><a href="http://stream.wappuradio.fi/wappuradio.mp3">MP3 Audio</a></li>
      <li><a href="https://mordor.wappuradio.fi/hls/wappuradio.m3u8">HLS Video</a></li>
    </ul>
  </section>
);

export default Start;
