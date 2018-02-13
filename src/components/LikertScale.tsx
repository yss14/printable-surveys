import * as React from 'react';
import styled from 'styled-components';
import StyledComponentProps from '../types/StyledComponentProps';
import * as PropTypes from 'prop-types';
import SurveyElement from './SurveyElement';
import { Childable } from '../types/Childable';

const LikertScaleItemCheckbox = styled.div`
	height: 22px;
    width: 22px;
    background-color: #eee;
    border-radius: 50%;
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
	height: 20px;
	text-align: center;
`;

const StyledLikertScaleList = styled.ul`
	list-style: none;
	margin: 0px;
	padding: 0px;
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
	height: 30px;
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
}

const LikertScale: React.StatelessComponent<LikertScaleProps> = ({ className, question, hint, from, to, step, randomInverse, labels }) => {
	if ((to - from) % step !== 0) {
		throw new Error(`Error at LikertScale: Range from ${from} to ${to} is divisible by ${step}`);
	}

	let data: number[] = [];
	for (let i = from; i <= to; i = i + step) {
		data.push(i);
	}

	if (randomInverse) {
		data = Math.round(Math.random()) === 1 ? data : data.reverse();
	}

	if (labels !== undefined && labels.length !== data.length) {
		throw new Error('Error at LikertScale: Length of provided labels array does not fit range length');
	}

	labels = labels || data.map(d => d.toString());

	return (
		<SurveyElement question={question} hint={hint}>
			<StyledLikertScaleList>
				{data.map((d, idx) => (
					<StyledLikertScaleItem key={idx} length={data.length}>
						<StyledLikertScaleItemLabel>{labels[idx]}</StyledLikertScaleItemLabel>
						<LikertScaleItemCheckbox />
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
	labels: PropTypes.arrayOf(PropTypes.string)
};

StyledLikertScale.defaultProps = {
	hint: '',
	from: 1,
	to: 10,
	step: 1,
	randomInverse: false
};

export default StyledLikertScale;