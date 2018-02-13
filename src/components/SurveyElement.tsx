import * as React from 'react';
import styled from 'styled-components';
import StyledComponentProps from '../types/StyledComponentProps';
import { Childable } from '../types/Childable';
import * as PropTypes from 'prop-types';

//Question component
interface QuestionProps extends StyledComponentProps {
	text: string;
}

const Question: React.StatelessComponent<QuestionProps> = props => (
	<div className={props.className}>{props.text}</div>
);

const StyledQuestion = styled(Question) `
	font-size: 16px;
	padding-bottom: 5px;
`;

Question.propTypes = {
	text: PropTypes.string.isRequired
};

//Hint component
interface HintProps extends StyledComponentProps {
	text: string;
}

const Hint: React.StatelessComponent<HintProps> = props => (
	<div className={props.className}>{props.text}</div>
);

const StyledHint = styled(Hint) `
	padding-bottom: 10px;
	font-size: 14px;
	font-style: italic;
`;

Question.propTypes = {
	text: PropTypes.string.isRequired
};

//Survey component
interface SurveyElementProps extends StyledComponentProps, Childable {
	question: string;
	hint: string;
}

class SurveyElement extends React.Component<SurveyElementProps> {
	render() {
		const { className, children, question, hint } = this.props;

		return (
			<div className={className}>
				<StyledQuestion text={question} />
				<StyledHint text={hint} />

				{
					children
				}
			</div>
		);
	}
}

const StyledSurveyElement = styled(SurveyElement) `
	margin-bottom: 50px;
`;

export default StyledSurveyElement;