import React, { FunctionComponent } from 'react';
const ReactMarkdown = require('react-markdown');

interface EnglishProps {
    infoData: string
}

const English: FunctionComponent<EnglishProps> = ({ infoData }) => (
    <section className='view-container -english'>
        <h1>Rakkauden Wappuradio</h1>
        <p><strong>Rakkauden Wappuradio&trade;</strong> is a student radio station based in Tampere, Finland.
            The station was founded in 2010 and broadcasts every year for two weeks at the end of April.
            Rakkauden Wappuradio reaches over 2,000 listeners over local FM and worldwide over the Internet.
            The target audience is students and young professionals. The primary language is Finnish, with intermittent international programming.
        </p>
        <p>Editors-in-chief: <a href='mailto:wappuradio@wappuradio.fi'>wappuradio@wappuradio.fi</a><br />
            Website: <a href='mailto:webmaster@wappuradio.fi'>webmaster@wappuradio.fi</a><br />
            Advertisements: <a href='mailto:mainosmyynti@wappuradio.fi'>mainosmyynti@wappuradio.fi</a></p>
  </section>
);

export default English;