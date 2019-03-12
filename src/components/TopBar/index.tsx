import React, { FunctionComponent } from 'react';

import MainNav from './MainNav';
import SocialNav from './SocialNav';

const TopBar: FunctionComponent = () => (
  <section className='top-bar'>
    <MainNav />
    <SocialNav />
  </section>
);

export default TopBar;
