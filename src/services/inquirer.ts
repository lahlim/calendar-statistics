import inquirer from 'inquirer';

export const askOptions = async () => {
	const questions = [
		{
			name: 'select',
			type: 'list',
			message: 'Select search with text or date:',
			choices: ['search', 'date'],
		},

	];
	return inquirer.prompt(questions);
};

export const askGithubCredentials = async () => {
	const questions = [
		{
			name: 'query',
			type: 'string',
			message: 'Search for events: ',
			validate(value: string) {
				if (value.length > 0) {
					return true;
				}

				return 'Please enter a query';
			},
		},

	];
	return inquirer.prompt(questions);
};

