const inquirer = require('inquirer');

module.exports = {
    askGithubCredentials: () => {
        const questions = [
            {
                name: 'datey',
                type: 'date',
                message: 'Enter date you want to query\n dd/mm/yy: anyday\n t: today\n y: yesterday\n',
                validate: function (value: string) {
                    if (value.length) {
                        //todo: proper validation
                        return true;
                    } else {
                        return 'Please enter a date';
                    }
                }
            },

        ];
        return inquirer.prompt(questions);
    },
};
