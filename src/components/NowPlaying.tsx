import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import InfoItem from './InfoItem';

class NowPlaying extends Component {
  state = {
    artist: '',
    title: ''
  }
  componentDidMount = () => {
    const socket = socketIOClient('https://wappuradio.fi/');
    socket.on('np', (song => {
      song = song.song.split(' - ');
      var artist = song[0] || '';
      var title = song[1] || '';
      this.setState({artist: artist, title: title});
    }));
  }
  render() {
    return (
      <InfoItem title='Nyt Soi' content={this.state.title} subcontent={this.state.artist} />
    )
  }
}

export default NowPlaying;
