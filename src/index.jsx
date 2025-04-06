import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import WorldClock from './WorldClock';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
            <header className={'task__header'}>
            <h3 className={'task__title'}>Мировые часы</h3>
          </header>
    <WorldClock />
  </React.StrictMode>
);
