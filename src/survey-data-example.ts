import { SurveyElementTypeJSON } from './types/SurveyElementTypeJSON';
import { SurveyElementJSON } from './types/SurveyElementJSON';

enum QuestionTopic {
	General,
	Topic1,
	Topic2
}

const data: SurveyElementJSON[] = [
	// Plain text field
	{
		type: SurveyElementTypeJSON.UserInput,
		block: QuestionTopic.General,
		opts: {
			question: 'Please state your name'
		},
		fixed: true,
		groups: [1, 2, 3]
	},
	// Single choice
	{
		type: SurveyElementTypeJSON.MultipleChoice,
		block: QuestionTopic.Topic1,
		opts: {
			question: 'What was your strategy?',
			options: [
				'Strategy 1',
				'Strategy 2',
				'Strategy 3',
				'Strategy 4'
			]
		},
		groups: [1, 2, 3]
	},
	// Multiple choice
	{
		type: SurveyElementTypeJSON.MultipleChoice,
		block: QuestionTopic.Topic2,
		opts: {
			question: 'What is your ~~~~?',
			options: [
				'Option 1',
				'Option 2',
				'Option 3',
				'Option 4'
			],
			enableOtherOption: true,
			multipleAnswers: true,
		},
		groups: [1, 2, 3]
	},
	// Likert scale
	{
		type: SurveyElementTypeJSON.LikertScale,
		block: QuestionTopic.Topic1,
		opts: {
			question: 'How do you like this forms framework?',
			hint: 'Only high ratings are accepected :P',
			labels: ['Like it', 'Really like it', 'Awesome!', 'Best thing I have ever seen'],
			randomInverse: true
		},
		groups: [2, 3]
	}
];

export default data;