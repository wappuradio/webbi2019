import React, { FunctionComponent } from 'react';
const ReactMarkdown = require('react-markdown');

interface AssociationProps {
}

const Association: FunctionComponent<AssociationProps> = () => (
    <section className='view-container'>
        <h1>Wappuradion Tuki ry</h1>
        <p><strong>Wappuradion Tuki ry</strong> toimii Rakkauden Wappuradion taustalla.</p>
  <p>Sähköposti: <a href='mailto:hallitus@wappuradio.fi'>hallitus@wappuradio.fi</a></p>
  <h2>Hallitus 2021-2022:</h2>
  <p>Puheenjohtaja: Saskia Simisker<br />
  Varapuheenjohtaja: Jaakko Airasmaa<br />
  Rahastonhoitaja: Sami Hartala<br />
  Sihteeri: Tytti Hyvönen<br />
  Hallituksen jäsen: Veli Tapper<br /></p>
  <h2>Toimihenkilöt 2022:</h2>
  <p>Salla-Mari Palokari<br />
  Emmi Oikkonen<br />
  Esa Varemo</p>
    </section>
);

export default Association;
