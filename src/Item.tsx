import React, { useState, useEffect } from 'react';
import { calculatePillColor } from './utils';
import moment from 'moment';
import TimelineItem from './timelineItemType';

interface ItemProps {
  pillColor: number;
  vw: number;
  item: TimelineItem;
};

const Item = ({ pillColor, vw, item }: ItemProps) => {
  const span = moment(item.end).diff(item.start, 'days') + 1;
  const [value, setValue] = useState(item.name);
  const [style, setStyle] = useState({});

  // put into a useEffect to prevent new style obj being created every rerender
  useEffect(() => setStyle({ minWidth: `calc(${vw}vw * ${span} + ${span - 2}px)` }), [span, vw]);

  return (
    <div key={item.id} className={`pill ${calculatePillColor(pillColor)}`} style={style}>
    <input value={value} onChange={(e) => setValue(e.target.value) }/>
  </div>
  );
}

export default Item;
