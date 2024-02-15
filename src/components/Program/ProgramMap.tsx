import React, { FunctionComponent } from 'react';
import moment from 'moment';
import { NavLink, Link } from 'react-router-dom';

import { Program, sortAndGroupForMap } from '../../logic/Program';
import ProgramMapTooltip from './ProgramMapTooltip';

const hours: Array<number> = [];
for (var i: number = 0; i < 24; i++) hours.push(i);

const ProgramMap: FunctionComponent<{ programs: Program[], week: string }> = ({ programs, week }) => {
  var colRow = (colStart: number, colEnd: number, rowStart: number, rowEnd: number) => {
    return {
      "gridColumnStart": colStart,
      "gridColumnEnd": colEnd,
      "gridRowStart": rowStart,
      "gridRowEnd": rowEnd
    }
  };

  var radioStart = moment("13.04.2023", "DD.MM.YYYY");

  var now = moment();

  //Second week of program. This could be done with dates also but week number sounded better for short time radio.
  if (week === "2") radioStart.add(7, "days");
  else if (week === "3") radioStart.add(14, "days");
  var weekPrograms = sortAndGroupForMap(programs, radioStart);
  //console.log(weekPrograms);
  const weekStart = radioStart.startOf("isoWeek");

  var weekdays: Array<any> = [];
  for (var i = 0; i < 7; i++) {
    weekdays.push({
      weekday: weekStart.format("dd"),
      date: weekStart.format("D.M.")
    });
    weekStart.add(1, "days");
  }

  return (
    <div>
      <h3>
        <nav>
          <li>
            <NavLink to='/programs/map/1'>Viikko 1</NavLink>
          </li>
          <li>
            <NavLink to='/programs/map/2'>Viikko 2</NavLink>
          </li>
          <li>
            <NavLink to='/programs/map/3'>Viikko 3</NavLink>
          </li>
        </nav>
      </h3>
      <div className='map'>
        {weekdays.map((date: any, i: number) => (<div className="map-day" key={i} style={colRow(i + 2, i + 3, 1, 2)}><Link to={`/programs/timetable/${date.date}`} style={{ color: 'white', textDecoration: 'none'}}>{date.weekday} {date.date}</Link></div>))}
        {hours.map((h: number, i: number) => (<div className='map-hour' key={h} style={colRow(1, 2, h + 2, h + 3)}>{h}</div>))}
        {weekPrograms.programs.map((program: Program, i: number) => {
          let className = now.isBetween(program.date.start, program.date.end) ? "map-program map-program-active" : "map-program";
		  if(i > 0 && program.name === weekPrograms.programs[i-1].name){
			className += " map-program-split";
		  }
          const gridPositionStyle = colRow(program.date.start.isoWeekday() + 1, program.date.start.isoWeekday() + 2, program.date.start.hours() + 2, program.date.end.hours() === 0 ? 26 : program.date.end.hours() + 2);
          const leftSide = program.date.start.isoWeekday() < 5;
          return (

            <div key={program.name + i} className={className} style={gridPositionStyle}>
              <ProgramMapTooltip program={program} left={leftSide}>
                <Link to={`/programs/p/${program.name}/${program.date.start.format("DDMM")}`} className='program-link'>
                  <div className="map-content">{program.title}</div>
                </Link>
              </ProgramMapTooltip>
            </div>
          )
        }
        )}

      </div>
    </div>);
};

export default ProgramMap;
