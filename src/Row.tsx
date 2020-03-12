import React, { useState, useEffect } from 'react';
import TimelineItem from './timelineItemType';
import moment from 'moment';
import { getSpacers } from './utils';
import Item from './Item';

interface RowProps {
  rowOfItems: TimelineItem[];
  startDate: moment.Moment | null;
  idx: number;
  vw: number;
};

const Row = ({ rowOfItems, startDate, idx, vw }: RowProps) => {
  const [elements, setElements] = useState([] as JSX.Element[]);
  useEffect(() => {
    if (startDate) {
      let start = startDate as moment.Moment | string;
      let rowElements = [] as JSX.Element[];
      for (let i = 0; i < rowOfItems.length; i++) {
        const item = rowOfItems[i];
        rowElements = rowElements
          .concat(getSpacers(start, item.start, i === 0, vw))
          .concat(
            <Item pillColor={i + idx} vw={vw} item={item}/>
          );
        start = item.end;
      }
      setElements(rowElements);
    }
  }, [rowOfItems, startDate, vw]);

  return (
    <div className='flex pb-4' key={idx}>{elements}</div>
  );
}

export default Row;
