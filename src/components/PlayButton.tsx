import React, { FunctionComponent } from 'react';

import Icon from './Icon';

interface PlayButtonProps {
    playing?: boolean
}

const startStream = () => {
    var audio;
    audio = document.getElementById('audio');
    var buttons = document.getElementsByClassName('play-button');
    if(audio.paused) {
        audio.play();
        audio.style.display = 'inline';
        for(var i = 0; i < buttons.length; i++) {
            buttons[i].classList.add('playing');
        }
    } else {
        audio.src = '';
        audio.removeAttribute('src');
        for(var i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('playing');
        }
    }
}

const PlayButton: FunctionComponent<PlayButtonProps> = (props) => (
  <button className='play-button' onClick={startStream}>
    <Icon name='play' title='Kuuntele' />
  </button>
);

export default PlayButton;
