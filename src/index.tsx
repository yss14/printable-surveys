import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import survey from './survey-data-example';

const GROUP = 3;

ReactDOM.render(
	<App group={GROUP} survey={survey} />,
	document.getElementById('root') as HTMLElement
);