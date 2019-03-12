import React, { FunctionComponent } from 'react';

import PlayButton from './PlayButton';
import InfoItem from './InfoItem';

interface BottomBarProps {

}

const BottomBar: FunctionComponent<BottomBarProps> = (props) => (
  <section className='bottom-bar'>
    <InfoItem
      title='Rakkauden Wappuradio'
      content='15.4.&ndash;30.4.'
      subcontent='107,1 MHz &bull; wappuradio.fi'
    >
      <PlayButton />
    </InfoItem>
    <InfoItem
      title='Nyt soi'
      content='Tässä on kappaleen nimi'
      subcontent='Artistin nimi taas tässä'
    />
    <InfoItem
      title='Nyt esiintyy'
      content='Hienon ohjelman nimi'
      subcontent='ma 15.4. 14.00&ndash;16.00'
      link='/'
    >
      <div className='current'>
        <img src='' />
      </div>
    </InfoItem>
  </section>
);

export default BottomBar;
