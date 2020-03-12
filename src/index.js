import React from 'react';
import { render } from 'react-dom';
import timelineItems from './timelineItems';
import Timeline from './Timeline';
import './index.css';

const App = () => (
  <div class="container">
    <h1>Timeline</h1>
    <Timeline timelineItems={timelineItems} />
    <h1>Timeline</h1>
  </div>
);
render(<App />, document.getElementById('root'));
