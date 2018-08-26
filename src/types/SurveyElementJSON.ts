import { LikertScaleProps } from './../components/LikertScale';
import { MultipleChoiceProps } from './../components/MultipleChoice';
import { SurveyElementTypeJSON } from './SurveyElementTypeJSON';
import { UserInputProps } from '../components/UserInput';

export interface SurveyElementJSON {
	type: SurveyElementTypeJSON;
	opts: MultipleChoiceProps | LikertScaleProps | UserInputProps;
	block: any;
	groups: number[];
	fixed?: boolean;
}