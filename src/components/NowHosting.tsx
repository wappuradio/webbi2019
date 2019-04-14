import React, { FunctionComponent } from 'react';
import InfoItem from './InfoItem';
import { Program } from '../logic/Program';
import moment from 'moment';

const dateString = (date: Program["date"]) =>
    `${date.start.format('dd D.M. H:mm')}–${date.end.format('H:mm')}`

export const NowHosting: FunctionComponent<Program> =
  ({
    name,
    title,
    date,
    dates,
    host,
    prod,
    desc,
    thumbSrc
  }) => (
    <InfoItem title={date.start > moment()?'HYPE':'Nyt esiintyy'} content={title} subcontent={dateString(date)} link={`/programs/p/${name}`}>
      <div className='current'>
        <img src={thumbSrc} />
      </div>
    </InfoItem>
  );
