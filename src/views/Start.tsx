import React, { FunctionComponent } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import Interval from 'react-interval-rerender';

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

// const friends = [
//     { filename: 'ambientia.png', url: 'http://www.ambientia.fi/' },
//     { filename: 'atostek.png', url: 'http://www.atostek.com/' },
//     { filename: 'bitwise.png', url: 'http://www.bitwise.fi/' },
//     { filename: 'cinia.png', url: 'http://www.cinia.fi/' },
//     { filename: 'cybercom.png', url: 'http://www.cybercom.com/' },
//     { filename: 'digia.png', url: 'http://www.digia.com/' },
//     { filename: 'etteplan.png', url: 'http://www.etteplan.com/' },
//     { filename: 'futurice.gif', url: 'http://www.futurice.com/' },
//     { filename: 'gofore.png', url: 'http://www.gofore.com/' },
//     { filename: 'intopalo.png', url: 'http://www.intopalo.com/' },
//     { filename: 'keisari.png', url: 'http://www.nokianpanimo.fi/' },
//     { filename: 'misnot.png', url: 'http://www.misnot.fi/' },
//     { filename: 'netum.png', url: 'http://www.netum.fi/' },
//     { filename: 'poas.png', url: 'http://www.poas.fi/' },
//     { filename: 'profit.png', url: 'http://www.profitsoftware.com/' },
//     { filename: 'pyynikki.png', url: 'http://www.pyynikin.com/' },
//     { filename: 'rdvelho.png', url: 'http://www.rdvelho.com/' },
//     { filename: 'solita.png', url: 'http://www.solita.fi/' },
//     { filename: 'vincit.jpg', url: 'http://www.vincit.fi/' },
//     { filename: 'wapice.png', url: 'http://www.wapice.com/' },
//     { filename: 'yit.png', url: 'http://www.yit.fi/' }]

const Start: FunctionComponent<StartProps> = ({infoData, programs}) => (
  <section className='view-container -start'>
    <h1>Rakkauden Assyradio</h1>
    <section className='radio-player'>
      <PlayButton />
      <div className='info'>
        <h2>Studiossa</h2>
        <Interval delay={60000}>
          {() => <ProgramListItem {...getCurrentProgram(programs)} />}
        </Interval>
        {/*<InfoItem
          title='Nyt soi'
          content='Tässä on kappaleen nimi'
          subcontent='Artistin nimi taas tässä'
        />*/}
      </div>
    </section>
    <h2>Menossa mukana</h2>
    <Friends />
    <h2>Striimilinkit</h2>
    <ul>
      <li>Ääni: <a href="http://stream.wappuradio.fi/wappuradio.opus">Opus</a>, <a href="http://stream.wappuradio.fi/wappuradio.ogg">Vorbis</a>, <a href="http://stream.wappuradio.fi/wappuradio.mp3">MP3</a>, <a href="https://wappuradio.fi/wappuradio.m3u">M3U</a></li>
    </ul>
  </section>
);

export default Start;
