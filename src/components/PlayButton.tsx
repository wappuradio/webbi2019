import React, { FunctionComponent } from 'react';

import Icon from './Icon';

interface PlayButtonProps {
 //name?: string, // Change the required prop to an optional prop.
}

const PlayButton: FunctionComponent<PlayButtonProps> = (props) => (
  <button className='play-button'>
    <Icon name='play' title='Kuuntele' />
  </button>
);

export default PlayButton;
