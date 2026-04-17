type Stream = {
	url: string;
	name: string;
	contentType: string;
};

// Randomize once to be consistent for a single visitor
const streamers = Math.random() >= 0.5 ? [1, 2] : [2, 1];

export const getStreams: () => Stream[] = () => {
	return streamers.flatMap(i => [
		{url: `https://stream${i}.wappuradio.fi/wappuradio.opus`, name: `Opus-${i}`, contentType: 'audio/ogg; codecs=opus'},
		{url: `https://stream${i}.wappuradio.fi/wappuradio.ogg`, name: `Vorbis-${i}`, contentType: 'audio/ogg; codecs=vorbis'},
		{url: `https://stream${i}.wappuradio.fi/wappuradio.mp3`, name: `MP3-${i}`, contentType: 'audio/mpeg'},
	]);
};
