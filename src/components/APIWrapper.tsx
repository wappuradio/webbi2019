import React, { FunctionComponent, PureComponent } from 'react';
import { BrowserRouter as Router, Route, Switch, RouteComponentProps } from 'react-router-dom';
import Loadable, { LoadableComponent, LoadableCaptureProps } from 'react-loadable';

import { Program, fetchProgramArray } from '../logic/Program';
import { fetchNews } from '../logic/Info';
import { fetchLicenses } from '../logic/License';
import Start from '../views/Start';
import Programs from '../views/Programs';
import Info from '../views/Info';
import English from '../views/English';

import BottomBar from './BottomBar';
import TopBar from './TopBar';
import Logo from './Logo';
import Spinner from './Spinner';
import { Data } from 'unist';

interface APIWrapperState {
  programs: Program[],
  infoData: string,
  licenseData: string
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
      licenseData: ""
    };
  };

  componentDidMount() {
    fetchProgramArray
      .then((pArray: Program[]) => this.setState({programs: pArray}));
    fetchNews
      .then((data: string) => this.setState({infoData: data}));
    fetchLicenses
      .then((data: string) => this.setState({licenseData: data}));
  }

  render() {
    const { programs, infoData, licenseData } = this.state;

    return (
      <Router>
        <div className='layout-container'>
          <TopBar />
          <Route path="/" exact render={() =>
            <Start {...{infoData}} />
           }/>
          <Route path="/info/" exact render={() =>
            <Info {...{infoData}} {...{licenseData}} />
          }/>
          <Route path="/programs/" render={() =>
            <Programs {...{programs}} />
          }/>
          <Route path="/en" exact render={() =>
            <English {...{ infoData }} />
          }/>
          {/*<BottomBar />*/}
          <Route path='/' render={(route) =>
            <LogoWrapper {...route} />
          } />
        </div>
      </Router>
    );
  }
}
