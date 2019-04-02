import React, { FunctionComponent } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import LazyLoad from 'react-lazyload';

var Hypher = require('hypher');
var fiPatterns = require('hyphenation.fi');
var hypher = new Hypher(fiPatterns);

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
          { host && <span><span className='label'>Studiossa</span> <strong>{ host }</strong></span> }
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
          { host && <span><span className='label'>Studiossa</span> <strong>{ host }</strong></span> }
          { prod && <span><span className='label'>Tuottaja</span> <strong>{ prod }</strong></span> }
        </p>
        <p className='desc'><span dangerouslySetInnerHTML={htmlDesc(desc?desc:'')} /></p>
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
          { host && <span><span className='label'>Studiossa</span> <strong>{ host }</strong></span> }
          { prod && <span><span className='label'>Tuottaja</span> <strong>{ prod }</strong></span> }
        </p>
        <p className='desc'><span dangerouslySetInnerHTML={htmlDesc(desc?desc:'')} /></p>
      </div>
    </div> );

