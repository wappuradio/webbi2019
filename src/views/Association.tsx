import React, { FunctionComponent } from 'react';

interface AssociationProps {
}

const Association: FunctionComponent<AssociationProps> = () => (
  <section className='view-container'>
    <h1>Wappuradion Tuki ry</h1>
    <p><strong>Wappuradion Tuki ry</strong> toimii Rakkauden Wappuradion taustalla.</p>
    <p>Sähköposti: <a href='mailto:hallitus@wappuradio.fi'>hallitus@wappuradio.fi</a></p>
    <h2>Hallitus 2024-2025:</h2>
    <p>Puheenjohtaja: Elias Meyer<br />
    Varapuheenjohtaja & Viestintähenkilö: Raafael Juntti<br />
    Sihteeri: Tytti Hyvönen<br />
    Rahastonhoitaja: Sanna Kallio</p>

    <h2>Toimihenkilöt 2024-2025:</h2>
    <p>
    Vuosijuhlatoimihenkilö: Tuulia Kusmin<br />
    Tekniikkatonttu: Esa Varemo<br />
    </p>

    <h3>Päätoimitus:</h3>
    <p>
    Aatos Mickelsson<br />
    Ale Kemppainen<br />
    Hannu Vuolasaho<br />
    Jemina Raukamo<br />
    Jussi Lähteenmäki
    </p>
  
  </section>
);

export default Association;
