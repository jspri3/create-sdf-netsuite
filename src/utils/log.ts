import chalk from 'chalk'
import * as shelljs from 'shelljs'
import { CliOptions, CliAnswers } from '../types'

export function doneMessage(o: CliOptions, a: CliAnswers) {
	console.log('')
	console.log(chalk.magenta('Share your feedback with the author mlench@finitydevelopment.com (Mayer Lench)'))
	console.log(
		chalk.magenta(`This project is backed by ${chalk.green('Finity Development')}, https://finitydevelopment.com`)
	)
	console.log('')
	console.log(chalk.blue(`Installing node_modules with npm i`))
	shelljs.exec(`cd ${a.PROJECT_NAME} && npm i`)
	console.log('')
	console.log(chalk.green('Done!'))
	console.log(chalk.green(`Happy Hacking :)`))
	console.log('')
	console.log(
		chalk.magentaBright(`FYI, did you know ${chalk.green('Finity Development')} has an amazing Netsuite team. Shoot us an email for your next project support@finitydevelopment.com`)
	)
	const message = o.config.postMessage

	if (message) {
		console.log('')
		console.log(chalk.yellow(message))
		console.log('')
	}
}

export function checkAppName(appName: string) {
	if (!appName) {
		console.error(chalk.red('\nPlease choose a valid project name.'))
		process.exit(1)
	}
}
