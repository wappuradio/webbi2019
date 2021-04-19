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
    <li>
      <NavLink to='/ry/'>Yhdistys</NavLink>
    </li>
    <audio id='audio' controls preload='none'>
      <source src="https://stream.wappuradio.fi/icecast/wappuradio-legacy-streamer1.opus" type="audio/ogg; codecs=opus"/>
      <source src="https://stream.wappuradio.fi/icecast/wappuradio-legacy-streamer1.ogg" type="audio/ogg; codecs=vorbis"/>
      <source src="https://stream.wappuradio.fi/icecast/wappuradio-legacy-streamer1.mp3" type="audio/mpeg"/>
      <source src="https://stream.wappuradio.fi/icecast/wappuradio-legacy-streamer2.opus" type="audio/ogg; codecs=opus"/>
      <source src="https://stream.wappuradio.fi/icecast/wappuradio-legacy-streamer2.ogg" type="audio/ogg; codecs=vorbis"/>
      <source src="https://stream.wappuradio.fi/icecast/wappuradio-legacy-streamer2.mp3" type="audio/mpeg"/>
      <source src="https://stream.wappuradio.fi/wappuradio.opus" type="audio/ogg; codecs=opus"/>
      <source src="https://stream.wappuradio.fi/wappuradio.ogg" type="audio/ogg; codecs=vorbis"/>
      <source src="https://stream.wappuradio.fi/wappuradio.mp3" type="audio/mpeg"/>
    </audio>
  </nav>
);

export default MainNav;
