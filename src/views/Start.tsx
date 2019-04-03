import React, { FunctionComponent } from 'react';
import moment from 'moment';

import InfoItem from '../components/InfoItem';
import PlayButton from '../components/PlayButton';
import { ProgramListItem } from '../components/Program/ProgramItem';
const ReactMarkdown = require('react-markdown');

interface StartProps {
  infoData: string
}

const Start: FunctionComponent<StartProps> = ({infoData}) => (
  <section className='view-container -start'>
    <h1>Rakkauden Wappuradio</h1>
    <section className='radio-player'>
      <PlayButton />
      <div className='info'>
        <h2>Nyt esiintyy</h2>
        <ProgramListItem
          name='aprillia'
          title='Hienon ohjelman nimi'
          dates={ [{start: moment('2019-04-15 14:00'), end: moment('2019-04-15 16:00')}] }
          host='Toimittaja 1, toimittaja 2, toimittaja 3'
          prod='Tuottaja'
          imgSrc=''
          thumbSrc=''
        />
        <InfoItem
          title='Nyt soi'
          content='Tässä on kappaleen nimi'
          subcontent='Artistin nimi taas tässä'
        />
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
    <h2>Menossa mukana</h2>
    <h2>Striimilinkit</h2>
    <h3>Audio</h3>
    <ul>
      <li><a href="/wappuradio.m3u">Soittolista (M3U)</a></li>
      <li><a href="http://stream.wappuradio.fi/wappuradio.opus">Opus 128k</a></li>
      <li><a href="http://stream.wappuradio.fi/wappuradio.ogg">Vorbis 128k</a></li>
      <li><a href="http://stream.wappuradio.fi/wappuradio.mp3">MP3 128k</a></li>
    </ul>
    <h3>Video</h3>
    <ul>
      <li><a href="https://mordor.wappuradio.fi/hls/wappuradio.hls">HLS</a></li>
    </ul>
  </section>
);

export default Start;
