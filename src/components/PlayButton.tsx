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
        for(let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('stopped');
            buttons[i].classList.add('playing');
        }
    } else {
        audio.src = '';
        audio.removeAttribute('src');
        for(let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('playing');
            buttons[i].classList.add('stopped');
        }
    }
}

const buttonState = () => {
    var audio;
    audio = document.getElementById('audio');
    if(!audio || audio.paused) {
        return 'play-button stopped';
    } else {
        return 'play-button playing';
    }
}

const PlayButton: FunctionComponent<PlayButtonProps> = (props) => (
  <button className={buttonState()} onClick={startStream}>
    <span className='play'><Icon name='play' title='Kuuntele' /></span>
    <span className='stop'><Icon name='stop' title='Älä kuuntelekaan' /></span>
  </button>
);

export default PlayButton;
