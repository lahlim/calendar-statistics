const inquirer = require('inquirer');

module.exports = {
    askGithubCredentials: () => {
        const questions = [
            {
                name: 'query',
                type: 'string',
                message: 'Search for events: ',
                validate: function (value: string) {
                    if (value.length) {
                        //todo: proper validation
                        return true;
                    } else {
                        return 'Please enter a query';
                    }
                }
            },

        ];
        return inquirer.prompt(questions);
    },
};
