const inquirer = require('inquirer');

export const askOptions = () => {
    const questions = [
        {
            name: 'select',
            type: 'list',
            message: 'Select search with text or date:',
            choices: ["search", "date"]
        },

    ];
    return inquirer.prompt(questions);
};


export const askGithubCredentials = () => {
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
};

let askGithubCredentials2 = () => {
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
};

