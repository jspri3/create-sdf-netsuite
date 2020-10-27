#!/usr/bin/env node

import * as inquirer from 'inquirer'
import * as path from 'path'
import {
	defaultStringValidate,
	getTemplateConfig,
	createProject,
	createDirectoryContents,
	doneMessage,
	checkAppName
} from './utils'
import * as yargs from 'yargs'
import { CliOptions, CliAnswers } from './types'

const CURR_DIR = process.cwd()

const args = yargs.argv['_']
const PROJECT_NAME = args.length === 1 ? args[0] : ('' as string)

checkAppName(PROJECT_NAME)

const QUESTIONS = [
	{
		name: 'PROJECT_ID',
		type: 'input',
		message: 'Project ID: (Choose a 3-4 letter unique project id)',
		when: () => !yargs.argv['PROJECT_ID'],
		validate: (input: string) => {
			if (defaultStringValidate(input) && input.length < 5) return true
			else return 'Only include letters, numbers, and underscores. Must be under 5 chars'
		}
	},
	{
		name: 'PROJECT_INITIALS',
		type: 'input',
		message: 'Script initials (Used for prefixing script names, OPTIONAL)',
		when: () => !yargs.argv['PROJECT_INITIALS'],
		validate: (input: string) => {
			if (!input) return true
			else if (input.length < 4) return true
			else return 'Must be less then 4 characters'
		}
	}
]

inquirer.prompt(QUESTIONS).then((results: any) => {
	const answers = {
		...results,
		...yargs.argv,
		PROJECT_NAME
	}

	const template = 'sdf'
	const projectName = answers['PROJECT_NAME']
	const templatePath = path.join(__dirname, '..', 'templates', template)
	const tartgetPath = path.join(CURR_DIR, projectName)
	const templateConfig = getTemplateConfig(templatePath)

	const options: CliOptions = {
		projectName: answers['PROJECT_NAME'],
		targetCreateDir: CURR_DIR,
		templateName: template,
		templatePath,
		tartgetPath,
		config: templateConfig
	}

	const answersCli: CliAnswers = {
		PROJECT_NAME: answers['PROJECT_NAME'],
		PROJECT_ID: answers['PROJECT_ID'],
		PROJECT_INITIALS: (answers['PROJECT_INITIALS'] || ('' as string)).toLowerCase(),
		FILE_CAB_FOLDER: projectName,
		GITIGNORE_FILE: '.gitignore'
	}

	if (!createProject(tartgetPath)) return

	//for SDF
	createDirectoryContents(
		{ ...options, templatePath: path.join(__dirname, '..', 'templates', 'sdf'), templateName: 'sdf' },
		answersCli
	)

	doneMessage(options, answersCli)
})

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
