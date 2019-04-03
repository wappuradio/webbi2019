import React, { FunctionComponent } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import LazyLoad from 'react-lazyload';

const Hypher = require('hypher');
const fiPatterns = require('hyphenation.fi');
const hypher = new Hypher(fiPatterns);
const ReactMarkdown = require('react-markdown');

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

const htmlDesc = (desc: string) => {
  return { __html: desc }
}

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
    desc,
    thumbSrc
  }) => (
  <Link to={`/programs/p/${name}`} className='program-link'>
    <div className='info-item -program -many'>
      <ProgramImg {...{title}} src={ thumbSrc } size={{w: 88, h: 88}} />
      <div className='content'>
        <p className='main'>
          { title }
        </p>
        <p className='dates'>{ datesString(dates) }</p>
        <p className='sub'>
          { host && <span><span className='label'>Äänessä</span> <strong>{ host }</strong></span> }
          { prod && <span><span className='label'>Tuottaja</span> <strong>{ prod }</strong></span> }
        </p>
      </div>
    </div>
  </Link>
  );

export const ProgramTimetableItem: FunctionComponent<Program> =
  ({
    name,
    title,
    dates,
    host,
    prod,
    desc,
    thumbSrc
  }) => (
  <Link to={`/programs/p/${name}`} className='program-link'>
    <div className='info-item -program -many'>
      <ProgramImg {...{title}} src={ thumbSrc } size={{w: 88, h: 88}} />
      <div className='content'>
        <p className='main'>
          { title }
        </p>
        <p className='dates'>{ datesString(dates) }</p>
        <p className='sub'>
          { host && <span><span className='label'>Äänessä</span> <strong>{ host }</strong></span> }
          { prod && <span><span className='label'>Tuottaja</span> <strong>{ prod }</strong></span> }
        </p>
        { desc && <div className='desc'>
          <ReactMarkdown source={desc} disallowedTypes={['link']} unwrapDisallowed={true} />
        </div> }
      </div>
    </div>
  </Link>
  );

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
          { hypher.hyphenateText(title) }
        </h2>
        <p className='dates'>{ datesString(dates) }</p>
        <p className='sub'>
          { host && <span><span className='label'>Äänessä</span> <strong>{ host }</strong></span> }
          { prod && <span><span className='label'>Tuottaja</span> <strong>{ prod }</strong></span> }
        </p>
        { desc && <div className='desc'>
          <ReactMarkdown source={desc} />
        </div> }
      </div>
    </div> );

