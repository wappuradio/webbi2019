import React, { FunctionComponent } from 'react';
import moment from 'moment';

import InfoItem from '../components/InfoItem';
import PlayButton from '../components/PlayButton';
import { ProgramListItem } from '../components/Program/ProgramItem';

const Start: FunctionComponent = () => (
  <section className='view-container -start'>
    <h1>Rakkauden Wappuradio</h1>
    <section className='radio-player'>
      <PlayButton />
      <div className='info'>
        <h2>Nyt esiintyy</h2>
        <ProgramListItem
          name=''
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
    <h2>Menossa mukana</h2>
    <h2>Striimilinkit</h2>
  </section>
);

export default Start;
