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
      <NavLink to='/programs/timetable' isActive={(match, location) => {return (location.pathname.match("/programs/")?true:false)}}>Ohjelmat</NavLink>
    </li>
    <li>
      <NavLink to='/info/'>Info</NavLink>
    </li>
    <audio id='audio' controls preload='none'>
      <source src="http://stream.wappuradio.fi:8000/wappuradio.opus" type="audio/ogg; codecs=opus"/>
      <source src="https://stream.wappuradio.fi/wappuradio.ogg" type="audio/ogg; codecs=vorbis"/>
      <source src="https://stream.wappuradio.fi/wappuradio.mp3" type="audio/mpeg"/>
    </audio>
  </nav>
);

export default MainNav;
