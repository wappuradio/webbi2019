import React, { FunctionComponent } from 'react';
const ReactMarkdown = require('react-markdown');

interface AssociationProps {
}

const Association: FunctionComponent<AssociationProps> = () => (
    <section className='view-container'>
        <h1>Wappuradion Tuki ry</h1>
        <p><strong>Wappuradion Tuki ry</strong> toimii Rakkauden Wappuradion taustalla.</p>
  <p>Sähköposti: <a href='mailto:hallitus@wappuradio.fi'>hallitus@wappuradio.fi</a></p>
  <h2>Hallitus 2022-2023:</h2>
  <p>Puheenjohtaja: Saskia Simisker<br />
  Varapuheenjohtaja, rahastonhoitaja: Erik Erola<br />
  Sihteeri: Tytti Hyvönen<br />
  Vanhempi konsultti: Helge Jalonen<br />
  Viestintä- ja sähköpostihenkilö: Miia Pynnönen<br />
  Lakupiippudiileri: Aleksi Sivonen<br />
  Tekniikkaihminen: Esa Varemo</p>
  <h2>Toimihenkilöt 2023:</h2>
  <p>Jussi Kekki<br />
  Joona Kärkkäinen<br />
  Salla-Mari Palokari</p>
    </section>
);

export default Association;
