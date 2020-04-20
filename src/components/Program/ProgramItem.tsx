import React, { FunctionComponent } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import LazyLoad from 'react-lazyload';
import moment from 'moment';

const Hypher = require('hypher');
const fiPatterns = require('hyphenation.fi');
const hypher = new Hypher(fiPatterns);
const ReactMarkdown = require('react-markdown');

import { Program } from '../../logic/Program';

interface ProgramSingleItemProps extends Program{
  showImg?: boolean,
  activeDay?: string,
  next?:string,
  previous?:string
}

interface ProgramImgProps {
  title: string,
  src: string,
  size: {
    w: number,
    h: number
  }
}

const datesString = (dates: Program["dates"], activeDay?:string) =>
{
  let cmp = activeDay == undefined ? moment(moment(), "DDMM") : moment(activeDay, "DDMM");
  return dates.map((d, i) =>
    {
	  var classes = cmp != undefined && cmp.isSame(d.start, "date")?"date activeDate" : "date";
      return (<span key={i} className={classes}>{`${d.start.format('dd D.M. H:mm')}–${d.end.format('H:mm')}`}</span>);
    }
  );
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
    date,
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
    date,
    dates,
    host,
    prod,
    desc,
    thumbSrc
  }) => (
  <Link to={`/programs/p/${name}/${date.start.format("DDMM")}`} className='program-link'>
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
          <ReactMarkdown source={desc} disallowedTypes={['link', 'paragraph']} unwrapDisallowed={true} />
        </div> }
      </div>
    </div>
  </Link>
  );

export const ProgramSingleItem: FunctionComponent<ProgramSingleItemProps> =
  ({
    title,
    date,
    dates,
    host,
    prod,
    desc,
    imgSrc,
    showImg = true,
	activeDay = undefined,
	next = undefined,
	previous = undefined
  }) => (
    <div className='info-item -program -single'>

      {showImg && <ProgramImg {...{title}} src={ imgSrc } size={{w: 480, h: 480}} />}
      <div className='content'>
        <h2 className='main'>
          { hypher.hyphenateText(title) }
        </h2>
        <p className='dates'>{ datesString(dates, activeDay) }</p>
        <p className='sub'>
          { host && <span><span className='label'>Äänessä</span> <strong>{ host }</strong></span> }
          { prod && <span><span className='label'>Tuottaja</span> <strong>{ prod }</strong></span> }
        </p>
        { desc && <div className='desc'>
          <ReactMarkdown source={desc} />
        </div> }
        { previous && <Link className="previousNextLink previousLink" to={previous}>Edellinen</Link>}
        { next && <Link className="previousNextLink nextLink" to={next}>Seuraava</Link>}
      </div>
    </div> );

