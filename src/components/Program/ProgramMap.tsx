import React, { FunctionComponent } from 'react';
import moment, { Moment } from 'moment';
import { Link } from 'react-router-dom';

import { Program, sortAndGroupForMap } from '../../logic/Program';
import { ProgramListItem } from './ProgramItem';

const hours:Array<number> = [];
for(var i:number = 0; i < 24; i++) hours.push(i);


const ProgramMap: FunctionComponent<{programs: Program[], date: Moment}> = ({ programs, date }) => {
  var colRow = (colStart:number, colEnd:number, rowStart:number, rowEnd:number) =>{
	return {
      "gridColumnStart":colStart,
	  "gridColumnEnd":colEnd,
	  "gridRowStart": rowStart,
	  "gridRowEnd":rowEnd
	}
  };
  
  var now = moment();
  
  var weekPrograms = sortAndGroupForMap(programs, date);
  
  const weekStart = date.startOf("isoWeek");
  
  var weekdays:Array<String> = [];
  for( var i = 0; i < 7; i++)
  {
	  weekdays.push(weekStart.format("dd D.M"));
	  weekStart.add(1, "days");
  }
  
  return <div className='map'>
    {weekdays.map((date:String, i:number) => (<div className='map-day' key={i} style={colRow(i+2,i+3,1,2)}>{date}</div>))}
    {hours.map((h:number, i:number) => (<div className='map-hour' key={h} style={colRow(1,2,h+2,h+3)}>{h}</div>))}
	{weekPrograms.programs.map((program:Program, i:number) => (
		
		<div key={program.name + i} className={now.isBetween(program.date.start, program.date.end)?"map-program map-program-active":"map-program"} style={
			colRow(program.date.start.isoWeekday()+1,program.date.start.isoWeekday()+2,program.date.start.hours()+2,program.date.end.hours()==0? 26 :program.date.end.hours()+2)
		}>
		<Link to={`/programs/p/${program.name}`} className='program-link'>
			<div className="map-content">{program.title }</div>
		</Link>
		</div>
		
	))}
	
  </div>
};

export default ProgramMap;
