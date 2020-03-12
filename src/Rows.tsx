import React, { useState, useEffect } from 'react';
import TimelineItem from './timelineItemType';
import moment from 'moment';
import Row from './Row';

interface RowsProps {
  orderedTimelineItems: TimelineItem[];
  startDate: moment.Moment | null;
  vw: number;
};

const Rows = ({ orderedTimelineItems, startDate, vw }: RowsProps) => {
  const [rowsOfItems, setRowsOfItems] = useState([] as TimelineItem[][]);

  useEffect(() => {
    let rows = [] as TimelineItem[][];
    orderedTimelineItems.forEach(item => {
      if (rows.length === 0) {
        rows = [[item]];
      } else {
        for (let i = 0; i < rows.length; i++) {
          const row = rows[i]
          if (row[row.length - 1].end < item.start) {
            rows[i] = row.concat(item)
            break;
            // after having checked the very last row, create new row
          } else if (i === rows.length - 1) {
            rows = rows.concat([[item]]);
            break;
          }
        }
      }
    });
    setRowsOfItems(rows);
  }, [orderedTimelineItems]);

  return (
    <div>
      {rowsOfItems.map((row, i) =>
        <Row idx={i} rowOfItems={row} startDate={startDate} vw={vw}/>
      )}
    </div>
  );
}

export default Rows;
