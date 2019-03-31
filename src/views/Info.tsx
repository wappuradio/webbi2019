import React, { FunctionComponent } from 'react';

interface InfoProps {
  infoData: string
}

const Info: FunctionComponent<InfoProps> = ({infoData}) => (
  <section className='view-container'>
    <h1>Infoa Wappuradiosta</h1>
    <h2>
      {infoData}
    </h2>
  </section>
);

export default Info;
