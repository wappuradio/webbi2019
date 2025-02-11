import React, { FunctionComponent } from 'react';
import MastoFeed from '../components/MastoFeed';

const News: FunctionComponent = () => (
  <section className='view-container'>
    <h1>Wappuradion Uutiset</h1>
      { <MastoFeed /> }
    </section>
);

export default News;
