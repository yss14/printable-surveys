import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './App.css';
import Page from './components/Page';
import MultipleChoice, { MultipleChoiceProps } from './components/MultipleChoice';
import LikertScale, { LikertScaleProps } from './components/LikertScale';
import { SurveyElementTypeJSON } from './types/SurveyElementTypeJSON';
import UserInput, { UserInputProps } from './components/UserInput';
import { SurveyElementJSON } from './types/SurveyElementJSON';
import * as _ from 'lodash';

interface AppState {
	pageAdjusted: boolean;
	renderPayload: Map<number, JSX.Element[]>;
}

interface AppProps {
	survey: SurveyElementJSON[];
	group: number;
}

class App extends React.Component<AppProps, AppState> {
	private _surveyElementRefs: React.Component[];
	private _pageRef: React.Component;

	private _orderedSurvey: SurveyElementJSON[];

	constructor(props: AppProps) {
		super(props);

		this.state = {
			pageAdjusted: false,
			renderPayload: new Map<number, JSX.Element[]>()
		};

		this._surveyElementRefs = new Array<React.Component>(props.survey.length);
		this._orderedSurvey = [];
	}

	componentWillMount() {
		const { survey } = this.props;

		//Sort and shuffle survey
		let fixedElements: SurveyElementJSON[] = survey.filter(el => el.fixed !== undefined && el.fixed === true);

		this._orderedSurvey = fixedElements.concat(
			_.flatten(
				_.map(
					_.groupBy<SurveyElementJSON>(
						survey.filter(el => el.fixed === undefined || el.fixed === false)
							.sort((a, b) => b.block - a.block),
						(el) => el.block),
					(el => {
						return _.shuffle(el);
					}))
			)
		).filter(el => (new Set(el.groups)).has(this.props.group));
	}

	componentDidMount() {
		const pageDOM = ReactDOM.findDOMNode(this._pageRef);
		const maxPageHeight = parseInt(window.getComputedStyle(pageDOM).getPropertyValue('height').replace('px', ''), 10)
			- parseInt(window.getComputedStyle(pageDOM).getPropertyValue('padding-top').replace('px', ''), 10)
			- parseInt(window.getComputedStyle(pageDOM).getPropertyValue('padding-bottom').replace('px', ''), 10);

		let currentPageNumber = 0;
		let currentPageUsedHeight = 0;

		let newRenderPayload = new Map<number, JSX.Element[]>();

		for (let i = 0; i < this._orderedSurvey.length; i++) {
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

			newRenderPayload.get(currentPageNumber).push(this.getSurveyComponent(this._orderedSurvey[i].type, this._orderedSurvey[i].opts, `${currentPageNumber}-${i}`));
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
						{this._orderedSurvey.map((surveyEl, idx) => this.getSurveyComponent(surveyEl.type, surveyEl.opts, idx))}
					</Page>
					<Page ref={ref => this._pageRef = ref} />
				</div>
			);
		}
	}
}

export default App;
