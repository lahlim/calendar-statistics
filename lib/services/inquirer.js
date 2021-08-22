"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.askGithubCredentials = exports.askOptions = void 0;
const inquirer = require('inquirer');
const askOptions = () => {
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
exports.askOptions = askOptions;
const askGithubCredentials = () => {
    const questions = [
        {
            name: 'query',
            type: 'string',
            message: 'Search for events: ',
            validate: function (value) {
                if (value.length) {
                    //todo: proper validation
                    return true;
                }
                else {
                    return 'Please enter a query';
                }
            }
        },
    ];
    return inquirer.prompt(questions);
};
exports.askGithubCredentials = askGithubCredentials;
let askGithubCredentials2 = () => {
    const questions = [
        {
            name: 'query',
            type: 'string',
            message: 'Search for events: ',
            validate: function (value) {
                if (value.length) {
                    //todo: proper validation
                    return true;
                }
                else {
                    return 'Please enter a query';
                }
            }
        },
    ];
    return inquirer.prompt(questions);
};
