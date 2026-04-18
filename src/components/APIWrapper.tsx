import React, { FunctionComponent, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, RouteComponentProps } from 'react-router-dom';

// This is the first loaded piece of JavaScript in the bundle,
// load Moment locales here
import '../moment';

import { Program, fetchProgramArray } from '../logic/Program';
import Start from '../views/Start';
import Programs from '../views/Programs';
import Info from '../views/Info';
import English from '../views/English';
import Association from '../views/Association';
import News from '../views/News';

import BottomBar from './BottomBar';
import TopBar from './TopBar';
import Logo from './Logo';

const LogoWrapper: FunctionComponent<RouteComponentProps> = ({ location }) => {
  if (location.pathname.search('programs/p/') > 0) {
    return (<div></div>);
  }
  return (<Logo type='side' />);
}

const APIWrapper: React.FC = () => {
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    fetchProgramArray().then(setPrograms);
  }, [setPrograms]);

  return (
    <Router>
      <div className='layout-container'>
        <TopBar />
        <Route path="/" exact render={() =>
          <Start {...{programs}} />
          }/>
        <Route path="/info/" exact render={() =>
          <Info />
        }/>
        <Route path="/programs/" render={() =>
          <Programs {...{programs}} />
        }/>
        <Route path="/watch/" exact render={() =>
          <Start {...{programs}} />
        }/>
        <Route path="/en/" exact render={() =>
          <English />
        }/>
        <Route path="/ry/" exact render={() =>
          <Association />
        }/>
        <Route path="/news/" exact render={() =>
          <News />
        }/>
        <BottomBar {...{programs}} />
        <Route path='/' render={(route) =>
          <LogoWrapper {...route} />
        } />
      </div>
    </Router>
  );
}

export default APIWrapper;
