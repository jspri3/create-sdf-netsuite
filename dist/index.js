#!/usr/bin/env node
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer = require("inquirer");
var path = require("path");
var utils_1 = require("./utils");
var yargs = require("yargs");
var CURR_DIR = process.cwd();
var args = yargs.argv['_'];
var PROJECT_NAME = args.length === 1 ? args[0] : '';
utils_1.checkAppName(PROJECT_NAME);
var QUESTIONS = [
    {
        name: 'PROJECT_ID',
        type: 'input',
        message: 'Project ID: (Choose a 3-4 letter unique project id)',
        when: function () { return !yargs.argv['PROJECT_ID']; },
        validate: function (input) {
            if (utils_1.defaultStringValidate(input) && input.length < 5)
                return true;
            else
                return 'Only include letters, numbers, and underscores. Must be under 5 chars';
        }
    },
    {
        name: 'PROJECT_INITIALS',
        type: 'input',
        message: 'Script initials (Used for prefixing script names, OPTIONAL)',
        when: function () { return !yargs.argv['PROJECT_INITIALS']; },
        validate: function (input) {
            if (!input)
                return true;
            else if (input.length < 4)
                return true;
            else
                return 'Must be less then 4 characters';
        }
    }
];
inquirer.prompt(QUESTIONS).then(function (results) {
    var answers = __assign(__assign(__assign({}, results), yargs.argv), { PROJECT_NAME: PROJECT_NAME });
    var template = 'sdf';
    var projectName = answers['PROJECT_NAME'];
    var templatePath = path.join(__dirname, '..', 'templates', template);
    var tartgetPath = path.join(CURR_DIR, projectName);
    var templateConfig = utils_1.getTemplateConfig(templatePath);
    var options = {
        projectName: answers['PROJECT_NAME'],
        targetCreateDir: CURR_DIR,
        templateName: template,
        templatePath: templatePath,
        tartgetPath: tartgetPath,
        config: templateConfig
    };
    var answersCli = {
        PROJECT_NAME: answers['PROJECT_NAME'],
        PROJECT_ID: answers['PROJECT_ID'],
        PROJECT_INITIALS: (answers['PROJECT_INITIALS'] || '').toLowerCase(),
        FILE_CAB_FOLDER: projectName,
        GITIGNORE_FILE: '.gitignore'
    };
    if (!utils_1.createProject(tartgetPath))
        return;
    //for SDF
    utils_1.createDirectoryContents(__assign(__assign({}, options), { templatePath: path.join(__dirname, '..', 'templates', 'sdf'), templateName: 'sdf' }), answersCli);
    utils_1.doneMessage(options, answersCli);
});
// function postProcess(options: CliOptions) {
//   if (isNode(options)) {
//     return postProcessNode(options);
//   }
//   return true;
// }
// function isNode(options: CliOptions) {
//   return fs.existsSync(path.join(options.templatePath, 'package.json'));
// }
// function postProcessNode(options: CliOptions) {
//   shell.cd(options.tartgetPath);
//   let cmd = '';
//   if (shell.which('yarn')) {
//     cmd = 'yarn';
//   } else if (shell.which('npm')) {
//     cmd = 'npm install';
//   }
//   if (cmd) {
//     const result = shell.exec(cmd);
//     if (result.code !== 0) {
//       return false;
//     }
//   } else {
//     console.log(chalk.red('No yarn or npm found. Cannot run installation.'));
//   }
//   return true;
// }
//# sourceMappingURL=index.js.map