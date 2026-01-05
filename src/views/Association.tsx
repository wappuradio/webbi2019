import React, { FunctionComponent } from 'react';

interface AssociationProps {
}

const Association: FunctionComponent<AssociationProps> = () => (
  <section className='view-container'>
    <h1>Wappuradion Tuki ry</h1>
    <p><strong>Wappuradion Tuki ry</strong> toimii Rakkauden Wappuradion taustalla.</p>
    <p>Sähköposti: <a href='mailto:hallitus@wappuradio.fi'>hallitus@wappuradio.fi</a></p>
    <h2>Hallitus 2025-2026:</h2>
    <p>Puheenjohtaja: Raafael Juntti<br />
    Sihteeri & Varapuheenjohtaja: Tytti Hyvönen<br />
    Rahastonhoitaja: Sanna Kallio<br />
    Viestintävastaava: Jemina Raukamo<br />
    Hallituksen jäsen: Hannu Vuolasaho<br />
    Hallituksen jäsen: Joni Selänne</p>

    <h2>Toimihenkilöt 2025-2026:</h2>
    <p>
    Tekniikkatonttu: Esa Varemo<br />
    </p>

    <h3>Päätoimitus:</h3>
    <p>
    Alexander Lindholm<br />
    Paju Tella<br />
    Aatos Mickelsson<br />
    Lassi Alm
    </p>
  
  </section>
);

export default Association;

