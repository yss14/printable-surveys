import * as React from 'react';
import styled from 'styled-components';
import StyledComponentProps from '../types/StyledComponentProps';
import * as PropTypes from 'prop-types';
import SurveyElement from './SurveyElement';

type OnInputClickEventHandler = (e: React.MouseEvent<HTMLDivElement>, selectedIndex: number) => void;

//MultipleChoiceRadioButton
interface MultipleChoiceRadioButtonProps extends StyledComponentProps {
	selected: boolean;
	onSelect: OnInputClickEventHandler;
	idx: number;
}

const MultipleChoiceRadioButton: React.StatelessComponent<MultipleChoiceRadioButtonProps> = ({ className, selected, onSelect, idx }) => (
	<div className={className} onClick={(e) => onSelect(e, idx)} />
);

const StyledMultipleChoiceRadioButton = styled(MultipleChoiceRadioButton) `
	& {
		height: 22px;
		width: 22px;
		background-color: ${props => !props.selected ? '#eee' : '#2196F3'};
		border-radius: 50%;
		position: absolute;
		top: 0;
		left: 0;
		border: 1px solid #2c3e50;
	}

	&:hover{
		background-color: #ccc;
	}
`;

//MultipleChoiceLabel
interface MultipleChoiceLabelProps extends StyledComponentProps {
	text: string;
	freeText: boolean;
}

const MultipleChoiceLabel: React.StatelessComponent<MultipleChoiceLabelProps> = ({ className, text }) => (
	<label className={className}>{text}</label>
);

const StyledMultipleChoiceLabel = styled(MultipleChoiceLabel) `
	padding-left: 5px;
	border-bottom: ${props => props.freeText ? '1px solid #2c3e50' : 'none'};
	width: ${props => props.freeText ? '500px' : 'auto'};
	display: inline-block;
`;

StyledMultipleChoiceLabel.propTypes = {
	text: PropTypes.string.isRequired,
	freeText: PropTypes.bool.isRequired
};

//MultipleChoiceOption
interface MultipleChoiceOptionProps extends StyledComponentProps {
	text: string;
	selected: boolean;
	onSelect: OnInputClickEventHandler;
	idx: number;
	freeText?: boolean;
}

const MultipleChoiceOption: React.StatelessComponent<MultipleChoiceOptionProps> = ({ className, text, selected, onSelect, idx, freeText }) => (
	<label className={className}>
		<StyledMultipleChoiceRadioButton selected={selected} onSelect={onSelect} idx={idx} />
		<StyledMultipleChoiceLabel text={text} freeText={freeText} />
	</label>
);

const StyledMultipleChoiceOption = styled(MultipleChoiceOption) `
	& {
		display: block;
		position: relative;
		padding-left: 35px;
		margin-bottom: 12px;
		cursor: pointer;
		font-size: 16px;
		line-height: 22px;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
`;

StyledMultipleChoiceOption.propTypes = {
	text: PropTypes.string.isRequired,
	selected: PropTypes.bool.isRequired,
	onSelect: PropTypes.func.isRequired,
	idx: PropTypes.number.isRequired,
	freeText: PropTypes.bool.isRequired
};

StyledMultipleChoiceOption.defaultProps = {
	freeText: false
};

//MultipleChoice
interface MultipleChoiceProps extends StyledComponentProps {
	options: string[];
	question: string;
	hint?: string;
	enableOtherOption?: boolean;
	multipleAnswers?: boolean;
}

interface MultipleChoiceState {
	selectedIndices: number[];
}

class MultipleChoice extends React.Component<MultipleChoiceProps, MultipleChoiceState> {
	constructor(props: MultipleChoiceProps) {
		super(props);

		this.state = {
			selectedIndices: []
		};

		this.onRadioButtonClicked = this.onRadioButtonClicked.bind(this);
	}

	onRadioButtonClicked(e: React.MouseEvent<HTMLDivElement>, selectedIndex: number) {
		const { multipleAnswers } = this.props;
		const { selectedIndices } = this.state;

		this.setState({
			...this.state,
			selectedIndices: multipleAnswers ? [...selectedIndices].concat([selectedIndex]) : [selectedIndex]
		});
	}

	render() {
		const { className, options, question, hint, enableOtherOption } = this.props;
		const { selectedIndices } = this.state;

		return (
			<SurveyElement question={question} hint={hint}>
				<form className={className}>
					{options.map((option, idx) =>
						<StyledMultipleChoiceOption
							text={option}
							key={`multiple-choice-option-${idx}`}
							selected={selectedIndices.some(val => val === idx)}
							onSelect={this.onRadioButtonClicked}
							idx={idx}
						/>)}
					{enableOtherOption ? <StyledMultipleChoiceOption
						text={''}
						key={`multiple-choice-option-${options.length}`}
						selected={false}
						onSelect={this.onRadioButtonClicked}
						idx={options.length}
						freeText={true}
					/> : null}
				</form>
			</SurveyElement>
		);
	}
}

const StyledMultipleChoice = styled(MultipleChoice) `

`;

StyledMultipleChoice.propTypes = {
	options: PropTypes.arrayOf(PropTypes.string).isRequired,
	enableOtherOption: PropTypes.bool.isRequired,
	question: PropTypes.string.isRequired,
	hint: PropTypes.string.isRequired,
	multipleAnswers: PropTypes.bool.isRequired
};

StyledMultipleChoice.defaultProps = {
	enableOtherOption: false,
	hint: '',
	multipleAnswers: false
};

export default StyledMultipleChoice;