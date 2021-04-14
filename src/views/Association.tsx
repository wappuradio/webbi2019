import React, { FunctionComponent } from 'react';
const ReactMarkdown = require('react-markdown');

interface AssociationProps {
}

const Association: FunctionComponent<AssociationProps> = () => (
    <section className='view-container'>
        <h1>Wappuradion Tuki ry</h1>
        <p><strong>Wappuradion Tuki ry</strong> toimii Rakkauden Wappuradion taustalla.</p>
  <p>Sähköposti: <a href='mailto:hallitus@wappuradio.fi'>hallitus@wappuradio.fi</a></p>
  <h2>Hallitus 2020-2021:</h2>
  <p>Puheenjohtaja: Veli Tapper<br />
  Varapuheenjohtaja: Helky Kouri<br />
  Rahastonhoitaja: Jaakko Airasmaa<br />
  Sihteeri: Tytti Hyvönen<br />
  Hallituksen jäsen: Tuulia Kusmin<br />
  Hallituksen jäsen: Hilppa Kouri<br />
  Hallituksen jäsen: Saskia Simisker<br /></p>
  <h2>Toimihenkilöt 2021:</h2>
  <p>Maria Järvelin<br />
  Tuomas Tinus</p>
    </section>
);

export default Association;
