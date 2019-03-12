import React, { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

import Logo from '../Logo';

const MainNav: FunctionComponent = () => (
  <nav className='-main'>
    <li>
      <NavLink exact to="/">
        <Logo type='nav' />
      </NavLink>
    </li>
    <li>
      <NavLink to='/programs/'>Ohjelmat</NavLink>
    </li>
    <li>
      <NavLink to='/info/'>Info</NavLink>
    </li>
  </nav>
);

export default MainNav;
