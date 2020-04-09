import React, { FunctionComponent } from 'react';
const ReactMarkdown = require('react-markdown');

interface AssociationProps {
}

const Association: FunctionComponent<AssociationProps> = () => (
    <section className='view-container'>
        <h1>Wappuradion Tuki ry</h1>
        <p><strong>Wappuradion Tuki ry</strong> toimii Rakkauden Wappuradion taustalla.</p>
  <p>Sähköposti: <a href='mailto:hallitus@wappuradio.fi'>hallitus@wappuradio.fi</a></p>
  <h2>Hallitus 2019-2020:</h2>
  <p>Puheenjohtaja: Jaakko Airasmaa<br />
  Varapuheenjohtaja: Veli Tapper<br />
  Rahastonhoitaja: Valtteri Yli-Karro<br />
  Sihteeri: Tytti Hyvönen<br />
  Hallituksen jäsen: Sami Hartala<br />
  Hallituksen jäsen: Ansse Saarimäki</p>
  <h2>Toimihenkilöt 2020:</h2>
  <p>Petra Oksa<br />
  Matti Tuomas<br />
  Jukka-Pekka Venttola</p>
    </section>
);

export default Association;
