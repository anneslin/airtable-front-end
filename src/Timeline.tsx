import React, { useState, useEffect } from 'react';
import TimelineItem from './timelineItemType';
import moment from 'moment';
import { generateDateArray } from './utils';
import Rows from './Rows';

interface TimeLineProps {
  timelineItems: TimelineItem[];
}
const Timeline = ({ timelineItems }: TimeLineProps) => {
  const [orderedTimelineItems, setOrderedTimelineItems] = useState(timelineItems);
  const [startDate, setStartDate] = useState(null as moment.Moment | null);
  const [endDate, setEndDate] = useState(null as moment.Moment | null);
  const [dates, setDates] = useState([] as moment.Moment[]);
  const [vw, setVw] = useState(6);
  const [containerStyle, setContainerStyle] = useState({});
  const [dateStyle, setDateStyle] = useState({});

  // order the timeline items and set the beginning and end dates of the timeline 
  useEffect(() => {
    let endDate = timelineItems[0].end;
    const items = timelineItems.map(x => x);

    setOrderedTimelineItems(items.sort((a: TimelineItem, b: TimelineItem) => {
      const startsBefore = a.start < b.start;
      const sameStartEndsBefore = a.start === b.start && a.end < b.end;
      if (a.end > endDate) endDate = a.end;
      if (b.end > endDate) endDate = b.end;
      return (startsBefore || sameStartEndsBefore) ? -1 : 1;
    }));
    setStartDate(moment(orderedTimelineItems[0].start));
    setEndDate(moment(endDate));
  }, [timelineItems]);

  useEffect(() => {
    if (startDate && endDate) setDates(generateDateArray(startDate, endDate));
  }, [startDate, endDate]);

  useEffect(() => {
    const numberOfDays = orderedTimelineItems.length;
    setContainerStyle({ minWidth: `calc(${vw}vw * ${numberOfDays} + ${numberOfDays}px)` })
  }, [orderedTimelineItems, vw]);

  useEffect(() => {
    setDateStyle({ minWidth: `${vw}vw` })
  }, [vw]);
  
  return (
    <div className='overflowHidden flex'>
      <h1>Timeline</h1>
      <div>
        <button className="zoomButton" onClick={() => setVw(vw + 1)}>+</button>
        <button className="zoomButton" onClick={() => setVw(Math.max(vw - 1, 4))}>-</button>
      </div>
      <div className='overflowScroll' style={containerStyle}>
        <div className='flex pb-4'>
          {dates.map((x, i) => <div key={i} className='date' style={dateStyle}> {x.format('MM/DD')}</div>)}
        </div>
        <Rows orderedTimelineItems={orderedTimelineItems} startDate={startDate} vw={vw} />
      </div>
    </div>
  );
}

export default Timeline;
