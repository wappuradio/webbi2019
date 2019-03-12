import React, { FunctionComponent } from 'react';
import { LoadingComponentProps } from 'react-loadable';

const Spinner: FunctionComponent<LoadingComponentProps> = ({ error, retry, timedOut, pastDelay}) => {
  if (error) {
    return <div>Error! <button onClick={ retry }>Retry</button></div>;
  } else if (timedOut) {
    return <div>Taking a long time... <button onClick={ retry }>Retry</button></div>;
  } else if (pastDelay) {
    return <div className='spinner'>Ladataan</div>;
  } else {
    return null;
  }
}

export default Spinner;
