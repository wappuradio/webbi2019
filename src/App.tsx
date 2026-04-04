import React, { FunctionComponent } from 'react';
import Loadable from 'react-loadable';

import Spinner from './components/Spinner';

const APIWrapper = Loadable({
  loader: () => import('./components/APIWrapper'),
  loading: Spinner
});

const App: FunctionComponent = () => (
  <APIWrapper />
);

export default App;
