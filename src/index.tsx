import React from 'react';
import ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client';

import './style/style.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

import './hls.d.ts';
const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(<App />);

serviceWorker.unregister();
