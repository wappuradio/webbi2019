import React, { FunctionComponent } from 'react';

import { Program, sortAndGroupForTimetable } from '../../logic/Program';

const ProgramTimetable: FunctionComponent<{programs: Program[]}> = ({ programs }) => {
  const timetablePrograms = sortAndGroupForTimetable(programs);

  return (
    <div className='timetable-wrapper'>
    <div className='timetable-container'>
      {Object.keys(timetablePrograms).map((day: any, i) => {
        const currentDay = timetablePrograms[day];
        return (
          <div className='day' key={ i }>
            <h3 className='date'>{ day }</h3>

            <div className='items'>
              {Object.keys(currentDay).map((time: any, j) => {
                const { title, dates } = currentDay[time];
                const { start, end } = dates[0];

                const lengthCls = end.diff(start, 'h');
                const startCls = start.format('H');

                return (
                  <div className={`item -l${ lengthCls } -s${ startCls }`} key={ j }>
                    <p className='time'>{ start.format('H:mm') }–{ end.format('H:mm') }</p>
                    <p className='title'>{ title }</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}{Object.keys(timetablePrograms).map((day: any, i) => {
        const currentDay = timetablePrograms[day];
        return (
          <div className='day' key={ i }>
            <h3 className='date'>{ day }</h3>

            <div className='items'>
              {Object.keys(currentDay).map((time: any, j) => {
                const { title, dates } = currentDay[time];
                const { start, end } = dates[0];

                const lengthCls = end.diff(start, 'h');
                const startCls = start.format('H');

                return (
                  <div className={`item -l${ lengthCls } -s${ startCls }`} key={ j }>
                    <p className='time'>{ start.format('H:mm') }–{ end.format('H:mm') }</p>
                    <p className='title'>{ title }</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}{Object.keys(timetablePrograms).map((day: any, i) => {
        const currentDay = timetablePrograms[day];
        return (
          <div className='day' key={ i }>
            <h3 className='date'>{ day }</h3>

            <div className='items'>
              {Object.keys(currentDay).map((time: any, j) => {
                const { title, dates } = currentDay[time];
                const { start, end } = dates[0];

                const lengthCls = end.diff(start, 'h');
                const startCls = start.format('H');

                return (
                  <div className={`item -l${ lengthCls } -s${ startCls }`} key={ j }>
                    <p className='time'>{ start.format('H:mm') }–{ end.format('H:mm') }</p>
                    <p className='title'>{ title }</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}{Object.keys(timetablePrograms).map((day: any, i) => {
        const currentDay = timetablePrograms[day];
        return (
          <div className='day' key={ i }>
            <h3 className='date'>{ day }</h3>

            <div className='items'>
              {Object.keys(currentDay).map((time: any, j) => {
                const { title, dates } = currentDay[time];
                const { start, end } = dates[0];

                const lengthCls = end.diff(start, 'h');
                const startCls = start.format('H');

                return (
                  <div className={`item -l${ lengthCls } -s${ startCls }`} key={ j }>
                    <p className='time'>{ start.format('H:mm') }–{ end.format('H:mm') }</p>
                    <p className='title'>{ title }</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}{Object.keys(timetablePrograms).map((day: any, i) => {
        const currentDay = timetablePrograms[day];
        return (
          <div className='day' key={ i }>
            <h3 className='date'>{ day }</h3>

            <div className='items'>
              {Object.keys(currentDay).map((time: any, j) => {
                const { title, dates } = currentDay[time];
                const { start, end } = dates[0];

                const lengthCls = end.diff(start, 'h');
                const startCls = start.format('H');

                return (
                  <div className={`item -l${ lengthCls } -s${ startCls }`} key={ j }>
                    <p className='time'>{ start.format('H:mm') }–{ end.format('H:mm') }</p>
                    <p className='title'>{ title }</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}{Object.keys(timetablePrograms).map((day: any, i) => {
        const currentDay = timetablePrograms[day];
        return (
          <div className='day' key={ i }>
            <h3 className='date'>{ day }</h3>

            <div className='items'>
              {Object.keys(currentDay).map((time: any, j) => {
                const { title, dates } = currentDay[time];
                const { start, end } = dates[0];

                const lengthCls = end.diff(start, 'h');
                const startCls = start.format('H');

                return (
                  <div className={`item -l${ lengthCls } -s${ startCls }`} key={ j }>
                    <p className='time'>{ start.format('H:mm') }–{ end.format('H:mm') }</p>
                    <p className='title'>{ title }</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
    </div>
)};

export default ProgramTimetable;
