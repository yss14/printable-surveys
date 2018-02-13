import * as React from 'react';
import './App.css';
import Page from './components/Page';
import MultipleChoice, { MultipleChoiceProps } from './components/MultipleChoice';
import LikertScale, { LikertScaleProps } from './components/LikertScala';

enum SurveyElementType {
	MultipleChoice = 'MultipleChoice',
	LikertScale = 'LikertScale'
}

interface SurveyElement {
	type: SurveyElementType;
	opts: MultipleChoiceProps | LikertScaleProps;
}

const survey: SurveyElement[] = [
	{
		type: SurveyElementType.MultipleChoice,
		opts: {
			question: 'How are you?',
			hint: 'Only one choice possible',
			options: ['Greate!', 'Well, I am ok', 'Not that good', 'Horrible'],
			multipleAnswers: false,
			enableOtherOption: true,
			randomOrder: true
		}
	},
	{
		type: SurveyElementType.LikertScale,
		opts: {
			question: 'Rate from 1 to 10',
			from: 10,
			to: 22,
			step: 2,
			randomInverse: true
		}
	}
];

class App extends React.Component {
	render() {
		return (
			<div>
				<Page>
					{survey.map((surveyEl, idx) => {
						switch (surveyEl.type) {
							case SurveyElementType.MultipleChoice: return <MultipleChoice key={idx} {...(surveyEl.opts as MultipleChoiceProps) } />;
							case SurveyElementType.LikertScale: return <LikertScale key={idx} {...(surveyEl.opts as LikertScaleProps) } />;
							default: return null;
						}
					})}
				</Page>
			</div>
		);
	}
}

export default App;
