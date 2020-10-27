import chalk from 'chalk'
import { CliOptions, CliAnswers } from '../types'

export function doneMessage(o: CliOptions, a: CliAnswers) {
	console.log('')
	console.log(chalk.magenta('Share your feedback with the author mlench@finitydevelopment.com (Mayer Lench)'))
	console.log(
		chalk.magenta(`This project is backed by ${chalk.green('Finity Development')}, https://finitydevelopment.com`)
	)
	console.log('')
	console.log(chalk.blue(`cd ${a.PROJECT_NAME}/sdf npm i`))
	console.log('')
	console.log(chalk.green('Done!'))
	console.log(chalk.green(`Happy Hacking :)`))

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
