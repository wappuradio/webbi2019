import React, { FunctionComponent } from 'react';

interface AssociationProps {
}

const Association: FunctionComponent<AssociationProps> = () => (
    <section className='view-container'>
        <h1>Wappuradion Tuki ry</h1>
        <p><strong>Wappuradion Tuki ry</strong> toimii Rakkauden Wappuradion taustalla.</p>
  <p>Sähköposti: <a href='mailto:hallitus@wappuradio.fi'>hallitus@wappuradio.fi</a></p>
  <h2>Hallitus 2023-2024:</h2>
  <p>Puheenjohtaja: Tuomas Tinus<br />
  Varapuheenjohtaja: Jemina Raukamo<br />
  Sihteeri: Maria Järvelin<br />
  Rahastonhoitaja: Aleksi Sivonen</p>
  <h2>Toimihenkilöt 2024:</h2>
  <p>Raafael Juntti<br />
  Tytti Hyvönen<br />
  Elias Meyer<br />
  Tuulia Kusmin<br />
  Sanna Kallio</p>
    </section>
);

export default Association;
