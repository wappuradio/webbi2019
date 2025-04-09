import React, { FunctionComponent, Component } from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import moment from 'moment';
import { Program } from '../../logic/Program';
import { FeedbackModal } from '../../components/Program/ProgramFeedback';
import ReactMarkdown from 'react-markdown';

const Hypher = require('hypher');
const fiPatterns = require('hyphenation.fi');
const hypher = new Hypher(fiPatterns);

interface ProgramSingleItemProps extends Program{
  showImg?: boolean,
  activeDay?: string,
  next?:string,
  previous?:string,
  hasAired?:boolean
}

interface ProgramSingleItemState {
  isModalOpen: boolean;
}

interface ProgramImgProps {
  title: string,
  src: string,
  size: {
    w: number,
    h: number
  }
}

const datesString = (dates: Program["dates"], name:Program["name"], activeDay?:string) =>
{
  let cmp = activeDay === undefined ? moment(moment(), "DDMM") : moment(activeDay, "DDMM");
  return dates.map((d, i) =>
    {
	  var classes = cmp !== undefined && cmp.isSame(d.start, "date")?"date activeDate" : "date";
      return <span key={i} className={classes}>
        <time dateTime={d.start.toISOString()} key={i}>{`${d.start.format('dd D.M. H:mm')}`}</time>
        –
        <time dateTime={d.end.toISOString()}>{`${d.end.format('H:mm')}`}</time>
      </span>;
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
  <Link to={`/programs/p/${name}/${date.start.format("DDMM")}`} className='program-link'>
    <div className='info-item -program -many'>
      <ProgramImg {...{title}} src={ thumbSrc } size={{w: 88, h: 88}} />
      <div className='content'>
        <p className='main'>
          { title }
        </p>
        <p className='dates'>{ datesString(dates, name) }</p>
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
        <p className='dates'>{ datesString(dates, name) }</p>
        <p className='sub'>
          { host && <span><span className='label'>Äänessä</span> <strong>{ host }</strong></span> }
          { prod && <span><span className='label'>Tuottaja</span> <strong>{ prod }</strong></span> }
        </p>
        { desc && <div className='desc'>
          <ReactMarkdown children={desc} disallowedElements={['a', 'p']} unwrapDisallowed={true} />
        </div> }
      </div>
    </div>
  </Link>
  );


export class ProgramSingleItem extends Component<ProgramSingleItemProps, ProgramSingleItemState> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isModalOpen: false,
    };
  }

  render() {
    const { title, name, date, dates, host, prod, desc, imgSrc,
      showImg = true,
      activeDay = undefined,
      next = undefined,
      previous = undefined,
      hasAired = false
    } = this.props;
        
    const showFeedback = () => { this.setState({ isModalOpen: true }) };
    const closeFeedback = () => { this.setState({ isModalOpen: false }) };

    return (
      <div className='info-item-container'>
        { previous && <Link className="previousNextLink previousLink" to={previous}>◄Edellinen</Link>}
        { next && <Link className="previousNextLink nextLink" to={next}>Seuraava►</Link>}
        <div className='info-item -program -single'>
          <FeedbackModal isOpen={this.state.isModalOpen} title={title} closeModal={closeFeedback} />
          {showImg && <ProgramImg {...{title}} src={ imgSrc } size={{w: 480, h: 480}} />}
          <div className='content'>
            <h2 className='main'>
              { hypher.hyphenateText(title) }
            </h2>
            <p className='dates'>{ datesString(dates, name, activeDay) }</p>
            <p className='sub'>
              { host && <span><span className='label'>Äänessä</span> <strong>{ host }</strong></span> }
              { prod && <span><span className='label'>Tuottaja</span> <strong>{ prod }</strong></span> }
            </p>
            { desc && <div className='desc'>
              <ReactMarkdown children={desc} />
            </div> }
            { hasAired && <a className="feedbackLink" onClick={showFeedback}>Anna palautetta</a> }
          </div>
        </div>
      </div> );
        };
}
