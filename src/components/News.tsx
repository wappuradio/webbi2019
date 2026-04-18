import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { fetchNews } from '../logic/Info';

export const News: React.FC = () => {
	const [news, setNews] = useState('Ladataan...');
	useEffect(() => {
		fetchNews().then(setNews);
	}, [setNews]);

	return <>
		{news.trim().length > 0 && (
			<div>
				<ReactMarkdown children={news} />
			</div>
		)}
	</>
};
