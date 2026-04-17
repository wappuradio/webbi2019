import React, { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

import Logo from '../Logo';
import { getStreams } from '../../logic/Streams';

const MainNav: FunctionComponent = () => (
  <nav className='-main'>
    <li>
      <NavLink exact to="/">
        <Logo type='nav' />
      </NavLink>
    </li>
    <li>
      <NavLink to='/programs/timetable' isActive={(match, location) => {return (location.pathname.match("/programs/")?true:false)}}>Ohjelmat</NavLink>
    </li>
    <li>
      <NavLink to='/info/'>Info</NavLink>
    </li>
    <li>
      <NavLink to='/ry/'>Yhdistys</NavLink>
    </li>
    <li>
      <NavLink to='/news/'>Uutiset</NavLink>
    </li>
    <audio id='audio' controls preload='none'>
      {getStreams().map((stream, i) => <source key={i} src={stream.url} type={stream.contentType} />)}
    </audio>
  </nav>
);

export default MainNav;
