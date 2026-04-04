import React from 'react';
import {createRoot} from 'react-dom/client';

import './style/style.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(<App />);

serviceWorker.unregister();
