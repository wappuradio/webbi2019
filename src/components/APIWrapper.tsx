import React, { FunctionComponent, PureComponent } from 'react';
import { BrowserRouter as Router, Route, RouteComponentProps } from 'react-router-dom';

// This is the first loaded piece of JavaScript in the bundle,
// load Moment locales here
import '../moment';

import { Program, fetchProgramArray } from '../logic/Program';
import { fetchNews } from '../logic/Info';
import Start from '../views/Start';
import Programs from '../views/Programs';
import Info from '../views/Info';
import English from '../views/English';
import Association from '../views/Association';
import News from '../views/News';

import BottomBar from './BottomBar';
import TopBar from './TopBar';
import Logo from './Logo';

interface APIWrapperState {
  programs: Program[],
  infoData: string,
}

const LogoWrapper: FunctionComponent<RouteComponentProps> = ({ location }) => {
  if (location.pathname.search('programs/p/') > 0) {
    return (<div></div>);
  }
  return (<Logo type='side' />);
}

export default class APIWrapper extends PureComponent<{}, APIWrapperState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      programs: [],
      infoData: "",
    };
  };

  componentDidMount() {
    fetchProgramArray
      .then((pArray: Program[]) => this.setState({programs: pArray}));
    fetchNews
      .then((data: string) => this.setState({infoData: data}));
  }

  render() {
    const { programs, infoData } = this.state;

    return (
      <Router>
        <div className='layout-container'>
          <TopBar />
          <Route path="/" exact render={() =>
            <Start {...{infoData}} {...{programs}} />
           }/>
          <Route path="/info/" exact render={() =>
            <Info />
          }/>
          <Route path="/programs/" render={() =>
            <Programs {...{programs}} />
          }/>
          <Route path="/watch/" exact render={() =>
            <Start {...{infoData}} {...{programs}} />
          }/>
          <Route path="/en/" exact render={() =>
            <English {...{ infoData }} />
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
}
