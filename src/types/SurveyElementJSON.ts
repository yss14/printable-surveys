import { LikertScaleProps } from './../components/LikertScale';
import { MultipleChoiceProps } from './../components/MultipleChoice';
import { SurveyElementTypeJSON } from './SurveyElementTypeJSON';

export interface SurveyElementJSON {
	type: SurveyElementTypeJSON;
	opts: MultipleChoiceProps | LikertScaleProps;
}