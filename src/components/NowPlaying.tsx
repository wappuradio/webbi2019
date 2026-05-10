import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import InfoItem from './InfoItem';

const IS_DEV = ['webbi-beta.wappuradio.fi', 'webbi-test.wappuradio.fi'].includes(window.location.host);
const SOCKET_IO_URL = IS_DEV ? 'https://wappuradio.fi/test/api/' : 'https://wappuradio.fi/';

const socket = socketIOClient(SOCKET_IO_URL);

type Song = { artist: string; title: string; };
type SongMessage = { song: string; };

const NowPlaying: React.FC<{}> = () => {
  const [song, setSong] = useState<Song>({ artist: '', title: '' });
  useEffect(() => {
    const onNp = (song: SongMessage) => {
      const parts = song.song.split(' - ');
      var artist = parts[0] || '';
      var title = parts[1] || '';

      setSong({ artist, title });
    };

    socket.on('np', onNp);

    return () => {
      socket.off('np', onNp);
    };
  });

  return <InfoItem title='Nyt Soi' content={song.title} subcontent={song.artist} />;
};

export default NowPlaying;
