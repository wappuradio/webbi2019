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

const friends = [
    { filename: 'ambientia.png', url: 'http://www.ambientia.fi/' },
    { filename: 'atostek.png', url: 'http://www.atostek.com/' },
    { filename: 'bitwise.png', url: 'http://www.bitwise.fi/' },
    { filename: 'cinia.png', url: 'http://www.cinia.fi/' },
    { filename: 'cybercom.png', url: 'http://www.cybercom.com/' },
    { filename: 'digia.png', url: 'http://www.digia.com/' },
    { filename: 'etteplan.png', url: 'http://www.etteplan.com/' },
    { filename: 'futurice.gif', url: 'http://www.futurice.com/' },
    { filename: 'gofore.png', url: 'http://www.gofore.com/' },
    { filename: 'intopalo.png', url: 'http://www.intopalo.com/' },
    { filename: 'keisari.png', url: 'http://www.nokianpanimo.fi/' },
    { filename: 'misnot.png', url: 'http://www.misnot.fi/' },
    { filename: 'netum.png', url: 'http://www.netum.fi/' },
    { filename: 'poas.png', url: 'http://www.poas.fi/' },
    { filename: 'profit.png', url: 'http://www.profitsoftware.com/' },
    { filename: 'pyynikki.png', url: 'http://www.pyynikin.com/' },
    { filename: 'rdvelho.png', url: 'http://www.rdvelho.com/' },
    { filename: 'solita.png', url: 'http://www.solita.fi/' },
    { filename: 'vincit.jpg', url: 'http://www.vincit.fi/' },
    { filename: 'wapice.png', url: 'http://www.wapice.com/' },
    { filename: 'yit.png', url: 'http://www.yit.fi/' }]

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
    { friends.map((friend) => {
        var logo = 'https://wappuradio.fi/files/img/friend/'+friend.filename
        var lol = { order: Math.floor(Math.random()*100) }
        return (
            <a href={friend.url} style={lol}><img src={logo} width='240' height='70' /></a>
        );
    }) }
    </div>
    <h2>Striimilinkit</h2>
    <ul>
      <li><a href="https://wappuradio.fi/wappuradio.m3u">M3U playlist</a></li>
      <li><a href="http://stream.wappuradio.fi/wappuradio.opus">Opus Audio</a></li>
      <li><a href="http://stream.wappuradio.fi/wappuradio.ogg">Vorbis Audio</a></li>
      <li><a href="http://stream.wappuradio.fi/wappuradio.mp3">MP3 Audio</a></li>
      <li><a href="https://mordor.wappuradio.fi/hls/wappuradio.m3u8">HLS Video</a></li>
    </ul>
  </section>
);

export default Start;
