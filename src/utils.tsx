import React from 'react';
import moment from 'moment';

export const generateDateArray = (start: moment.Moment, end: moment.Moment): moment.Moment[] => {
  const arr = new Array();
  let currDate = start;
  while (currDate.isSameOrBefore(end)) {
    arr.push(currDate);
    currDate = currDate.clone().add(1, 'days');
  }
  return arr;
};

export const getSpacers = (
  endItem1: string | moment.Moment,
  startItem2: string | moment.Moment,
  isInitial: boolean,
  vw: number) => {
  const daysBetween = moment(startItem2).diff(endItem1, 'days') || 0;
  const spacers = (daysBetween !== 0 && !isInitial) ? daysBetween - 1 : daysBetween;
  const style = { minWidth: `calc(${vw}vw + 1px)` }
  return new Array(spacers)
    .fill(0)
    .map((_, i) => <div key={(startItem2 as string) + i} style={style} />);
};

export const calculatePillColor = (i: number) => {
  switch (i % 3) {
    case 0:
      return 'red';
    case 1:
      return 'yellow';
    default: return 'blue';
  }
}