import * as React from 'react';
import StyledComponentProps from '../types/StyledComponentProps';
import styled from 'styled-components';
import SurveyElement from './SurveyElement';
import * as PropTypes from 'prop-types';

export enum UserInputSize {
	small,
	medium,
	large
}

export interface UserInputProps extends StyledComponentProps {
	question: string;
	hint?: string;
	size?: UserInputSize;
}

const UserInput: React.StatelessComponent<UserInputProps> = ({ className, question, hint }) => (
	<SurveyElement question={question + ':'} hint={hint}>
		<div className={className} />
	</SurveyElement>
);

const StyledUserInput = styled(UserInput) `
	width: ${props => props.size === UserInputSize.small ? '200px' : (props.size === UserInputSize.medium ? '400px' : '100%')};
	height: 23px;
	border-bottom: 1px solid #2c3e50;
`;

StyledUserInput.propTypes = {
	question: PropTypes.string.isRequired,
	hint: PropTypes.string.isRequired,
	size: PropTypes.oneOf(Object.keys(UserInputSize).map(k => UserInputSize[k])).isRequired
};

StyledUserInput.defaultProps = {
	hint: '',
	size: UserInputSize.medium
};

export default StyledUserInput;