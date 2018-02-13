import * as React from 'react';
import './App.css';
import Page from './components/Page';
import MultipleChoice, { MultipleChoiceProps } from './components/MultipleChoice';
import LikertScale, { LikertScaleProps } from './components/LikertScale';
import survey from './survey-data';
import { SurveyElementTypeJSON } from './types/SurveyElementTypeJSON';

class App extends React.Component {
	render() {
		return (
			<div>
				<Page>
					{survey.map((surveyEl, idx) => {
						switch (surveyEl.type) {
							case SurveyElementTypeJSON.MultipleChoice: return <MultipleChoice key={idx} {...(surveyEl.opts as MultipleChoiceProps) } />;
							case SurveyElementTypeJSON.LikertScale: return <LikertScale key={idx} {...(surveyEl.opts as LikertScaleProps) } />;
							default: return null;
						}
					})}
				</Page>
			</div>
		);
	}
}

export default App;
