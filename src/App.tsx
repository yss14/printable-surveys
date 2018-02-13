import * as React from 'react';
import './App.css';
import Page from './components/Page';
import MultipleChoice from './components/MultipleChoice';

class App extends React.Component {
	render() {
		return (
			<div>
				<Page>
					<MultipleChoice question="How are you?" hint="Some hint" options={['Greate!', 'Well, I am ok', 'Not that good', 'Horrible']} multipleAnswers={false} enableOtherOption={true} />
				</Page>
			</div>
		);
	}
}

export default App;
