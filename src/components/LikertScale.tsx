import * as React from 'react';
import styled from 'styled-components';
import StyledComponentProps from '../types/StyledComponentProps';
import * as PropTypes from 'prop-types';
import SurveyElement from './SurveyElement';
import { Childable } from '../types/Childable';

interface LikertScaleItemCheckboxProps extends StyledComponentProps, Childable {
	selfRated: boolean;
}

const LikertScaleItemCheckbox: React.StatelessComponent<LikertScaleItemCheckboxProps> = ({ selfRated, className, children }) => (
	<div className={className}>{children}</div>
);

const StyledLikertScaleItemCheckbox = styled(LikertScaleItemCheckbox) `
	height: ${props => props.selfRated ? 34 : 22}px;
    width: ${props => props.selfRated ? 34 : 22}px;
    background-color: ${props => props.selfRated ? 'white' : '#eee'};
    border-radius: ${props => props.selfRated ? '8px' : '50%'};
	border: 1px solid #2c3e50;
	margin-left: auto;
	margin-right: auto;
	margin-top: 10px;
`;

const LikertScaleItemLabel: React.StatelessComponent<StyledComponentProps & Childable> = ({ children, className }) => (
	<div className={className}>{children}</div>
);

const StyledLikertScaleItemLabel = styled(LikertScaleItemLabel) `
	width: 100%;
	text-align: center;
`;

const StyledLikertScaleList = styled.ul`
	list-style: none;
	margin: 0px;
	padding: 0px;
	overflow: auto;
`;

interface LikertScaleItem extends StyledComponentProps, Childable {
	length: number;
}

const LikertScaleItem: React.StatelessComponent<LikertScaleItem> = ({ length, className, children }) => (
	<li className={className}>{children}</li>
);

const StyledLikertScaleItem = styled(LikertScaleItem) `
	float: left;
	width: ${props => 640 / props.length}px;
`;

StyledLikertScaleItem.propTypes = {
	length: PropTypes.number.isRequired,
};

export interface LikertScaleProps extends StyledComponentProps {
	question: string;
	hint?: string;
	from?: number;
	to?: number;
	step?: number;
	labels?: string[];
	randomInverse?: boolean;
	selfRated?: boolean;
}

const LikertScale: React.StatelessComponent<LikertScaleProps> = ({ className, question, hint, from, to, step, randomInverse, labels, selfRated }) => {
	if ((to - from) % step !== 0) {
		throw new Error(`Error at LikertScale: Range from ${from} to ${to} is divisible by ${step}`);
	}

	if (labels === undefined) {
		for (let i = from; i <= to; i = i + step) {
			labels.push(i.toString());
		}
	}

	if (randomInverse) {
		labels = Math.round(Math.random()) === 1 ? labels : labels.reverse();
	}

	return (
		<SurveyElement question={question} hint={hint}>
			<StyledLikertScaleList>
				{labels.map((l, idx) => (
					<StyledLikertScaleItem key={idx} length={labels.length}>
						<StyledLikertScaleItemLabel>{l}</StyledLikertScaleItemLabel>
					</StyledLikertScaleItem>
				))}
			</StyledLikertScaleList>
			<StyledLikertScaleList>
				{labels.map((l, idx) => (
					<StyledLikertScaleItem key={idx} length={labels.length}>
						<StyledLikertScaleItemCheckbox selfRated={selfRated} />
					</StyledLikertScaleItem>
				))}
			</StyledLikertScaleList>
		</SurveyElement>
	);
};

const StyledLikertScale = styled(LikertScale) `

`;

StyledLikertScale.propTypes = {
	question: PropTypes.string.isRequired,
	hint: PropTypes.string.isRequired,
	from: PropTypes.number.isRequired,
	to: PropTypes.number.isRequired,
	step: PropTypes.number.isRequired,
	randomInverse: PropTypes.bool.isRequired,
	labels: PropTypes.arrayOf(PropTypes.string),
	selfRated: PropTypes.bool.isRequired
};

StyledLikertScale.defaultProps = {
	hint: '',
	from: 1,
	to: 10,
	step: 1,
	randomInverse: false,
	selfRated: false
};

export default StyledLikertScale;