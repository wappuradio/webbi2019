import React, { FunctionComponent } from 'react';
import Loadable from 'react-loadable';

import Spinner from '../components/Spinner';

const MastoFeed = Loadable({
  loader: () => import('../components/MastoFeed'),
  loading: Spinner,
});

const News: FunctionComponent = () => (
  <section className='view-container'>
    <h1>Wappuradion Uutiset</h1>
    <MastoFeed />
  </section>
);

export default News;
