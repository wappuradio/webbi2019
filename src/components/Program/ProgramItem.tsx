import React, { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

import { Program } from '../../logic/Program';

interface ProgramImgProps {
  title: string,
  src: string,
  size: {
    w: number,
    h: number
  }
}

const datesString = (dates: Program["dates"]) =>
  dates.map((d, i) =>
    (<span key={i} className='date'>{`${d.start.format('dd D.M. H:mm')}–${d.end.format('H:mm')}`}</span>)
  );

const ProgramImg: FunctionComponent<ProgramImgProps> =
  ({ title, src }) => (
    <div className='img'>
      <LazyLoad height={200}>
      <img src={src} alt={ title } title={ title } />
      </LazyLoad>
    </div> );

export const ProgramListItem: FunctionComponent<Program> =
  ({
    name,
    title,
    dates,
    host,
    prod,
    thumbSrc
  }) => (
    <div className='info-item -program'>
      <ProgramImg {...{title}} src={ thumbSrc } size={{w: 88, h: 88}} />
      <div className='content'>
        <p className='main'>
          <NavLink to={`/programs/p/${name}`}>
            { title }
          </NavLink>
        </p>
        <p className='dates'>{ datesString(dates) }</p>
        <p className='sub'>
          { host && <span>Toimittaa: <strong>{ host }</strong></span> }
          { (host && prod) && <br />}
          { prod && <span>Tuottaa: <strong>{ prod }</strong></span>}
        </p>
      </div>
    </div> );

export const ProgramSingleItem: FunctionComponent<Program> =
  ({
    title,
    dates,
    host,
    prod,
    desc,
    imgSrc
  }) => (
    <div className='info-item -program -single'>
      <ProgramImg {...{title}} src={ imgSrc } size={{w: 480, h: 480}} />
      <div className='content'>
        <h2 className='main'>
          { title }
        </h2>
        <p className='dates'>{ datesString(dates) }</p>
        <p className='sub'>
          { host && <span>Toimittaa: <strong>{ host }</strong></span> }
          { (host && prod) && <br />}
          { prod && <span>Tuottaa: <strong>{ prod }</strong></span>}
        </p>
        <p className='desc'>
          { desc }
        </p>
      </div>
    </div> );
