import React, { FunctionComponent, PureComponent } from 'react';
import { BrowserRouter as Router, Route, Switch, RouteComponentProps } from 'react-router-dom';
import Loadable, { LoadableComponent, LoadableCaptureProps } from 'react-loadable';

import { Program, fetchProgramArray } from '../logic/Program';
import Start from '../views/Start';
import Programs from '../views/Programs';

import BottomBar from './BottomBar';
import TopBar from './TopBar';
import Logo from './Logo';
import Spinner from './Spinner';

const InfoView: FunctionComponent = () => (
  <section className='view-container'>
    <h1>Todo: Info</h1>
  </section>
);

interface APIWrapperState {
  programs: Program[];
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
      programs: []
    };
  };

  componentDidMount() {
    fetchProgramArray
      .then((pArray: Program[]) => this.setState({programs: pArray}))
  }

  render() {
    const { programs } = this.state;

    return (
      <Router>
        <div className='layout-container'>
          <TopBar />
          <Route path='/' exact component={Start} />
          <Route
            path='/programs/'
            render={() => <Programs {...{programs}} />}
          />
          <Route path='/info/' component={InfoView} />

          {/* <BottomBar /> */}
          <Route path='/' render={(route) => <LogoWrapper {...route} />} />
        </div>
      </Router>
    );
  }
}
