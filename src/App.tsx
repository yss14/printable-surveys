import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './App.css';
import Page from './components/Page';
import MultipleChoice, { MultipleChoiceProps } from './components/MultipleChoice';
import LikertScale, { LikertScaleProps } from './components/LikertScale';
import survey from './survey-data';
import { SurveyElementTypeJSON } from './types/SurveyElementTypeJSON';
import UserInput, { UserInputProps } from './components/UserInput';

interface AppState {
	pageAdjusted: boolean;
	renderPayload: Map<number, JSX.Element[]>;
}

class App extends React.Component<{}, AppState> {
	private _surveyElementRefs: React.Component[];
	private _pageRef: React.Component;

	constructor(props: {}) {
		super(props);

		this.state = {
			pageAdjusted: false,
			renderPayload: new Map<number, JSX.Element[]>()
		};

		this._surveyElementRefs = new Array<React.Component>(survey.length);
	}

	componentDidMount() {
		//Prepare list of react elements
		/*const components = survey.map((surveyEl, idx) => {
			switch (surveyEl.type) {
				case SurveyElementTypeJSON.MultipleChoice: return <MultipleChoice key={idx} {...(surveyEl.opts as MultipleChoiceProps)} />;
				case SurveyElementTypeJSON.LikertScale: return <LikertScale key={idx} {...(surveyEl.opts as LikertScaleProps)} />;
				case SurveyElementTypeJSON.UserInput: return <UserInput key={idx} {...(surveyEl.opts as UserInputProps)} />;
				default: return null;
			}
		});

		this.setState({
			...this.state,
			surveyElments: components.map((c, idx) => {
				return {
					component: c,
					page: idx === 0 ? 1 : -1
				};
			})
		});*/
		const pageDOM = ReactDOM.findDOMNode(this._pageRef);
		const maxPageHeight = parseInt(window.getComputedStyle(pageDOM).getPropertyValue('height').replace('px', ''), 10)
			- parseInt(window.getComputedStyle(pageDOM).getPropertyValue('padding-top').replace('px', ''), 10)
			- parseInt(window.getComputedStyle(pageDOM).getPropertyValue('padding-bottom').replace('px', ''), 10);

		let currentPageNumber = 0;
		let currentPageUsedHeight = 0;

		let newRenderPayload = new Map<number, JSX.Element[]>();

		for (let i = 0; i < survey.length; i++) {
			const domEl = ReactDOM.findDOMNode(this._surveyElementRefs[i]);

			let elStyle = window.getComputedStyle(domEl);
			let elHeight = ['height', 'margin-top', 'margin-bottom', 'padding-top', 'padding-bottom']
				.map((key) => parseInt(elStyle.getPropertyValue(key), 10))
				.reduce((prev, cur) => prev + cur);

			if (currentPageUsedHeight + elHeight > maxPageHeight) {
				//Set on next page
				currentPageNumber++;
				currentPageUsedHeight = 0;
			}

			if (newRenderPayload.get(currentPageNumber) === undefined) {
				newRenderPayload.set(currentPageNumber, []);
			}

			newRenderPayload.get(currentPageNumber).push(this.getSurveyComponent(survey[i].type, survey[i].opts, `${currentPageNumber}-${i}`));
			currentPageUsedHeight += elHeight;
		}

		this.setState({
			...this.state,
			pageAdjusted: true,
			renderPayload: newRenderPayload
		});
	}

	getSurveyComponent(type: SurveyElementTypeJSON, opts: any, idx: number | string) {
		switch (type) {
			case SurveyElementTypeJSON.MultipleChoice: return <MultipleChoice ref={ref => this._surveyElementRefs[idx] = ref} key={idx} {...(opts as MultipleChoiceProps)} />;
			case SurveyElementTypeJSON.LikertScale: return <LikertScale ref={ref => this._surveyElementRefs[idx] = ref} key={idx} {...(opts as LikertScaleProps)} />;
			case SurveyElementTypeJSON.UserInput: return <UserInput ref={ref => this._surveyElementRefs[idx] = ref} key={idx} {...(opts as UserInputProps)} />;
			default: return null;
		}
	}

	render() {
		if (this.state.pageAdjusted) {
			return Array.from(this.state.renderPayload.keys()).map(pageNumber => (
				<Page key={pageNumber}>
					{this.state.renderPayload.get(pageNumber)}
				</Page>
			));
		} else {
			return (
				<div>
					<Page>
						{survey.map((surveyEl, idx) => this.getSurveyComponent(surveyEl.type, surveyEl.opts, idx))}
					</Page>
					<Page ref={ref => this._pageRef = ref} />
				</div>
			);
		}
	}
}

export default App;
