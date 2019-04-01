import React, { FunctionComponent, PureComponent } from 'react';
import { BrowserRouter as Router, Route, Switch, RouteComponentProps } from 'react-router-dom';
import Loadable, { LoadableComponent, LoadableCaptureProps } from 'react-loadable';

import { Program, fetchProgramArray } from '../logic/Program';
import { fetchNews } from '../logic/Info';
import Start from '../views/Start';
import Programs from '../views/Programs';
import Info from '../views/Info';

import BottomBar from './BottomBar';
import TopBar from './TopBar';
import Logo from './Logo';
import Spinner from './Spinner';
import { Data } from 'unist';

interface APIWrapperState {
  programs: Program[],
  infoData: string
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
      infoData: ""
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
          {/* <Route path="/" exact component={Start} /> */}
          <Route path="/" exact render={() =>
            <Info {...{infoData}} />
          }/>
          <Route path="/programs/" render={() =>
            <Programs {...{programs}} />
          }/>
          {/* <BottomBar /> */}
          <Route path='/' render={(route) =>
            <LogoWrapper {...route} />
          } />
        </div>
      </Router>
    );
  }
}
