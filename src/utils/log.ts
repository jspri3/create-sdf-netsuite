import chalk from 'chalk'
import * as validateProjectName from 'validate-npm-package-name'
import { CliOptions, CliAnswers } from '../types'

export function doneMessage(o: CliOptions, a: CliAnswers) {
  console.log('')
	console.log(chalk.magenta('Share your feedback with the author mlench@finitydevelopment.com (Mayer Lench)'))
	console.log(chalk.magenta(`This project is backed by ${chalk.green('Finity Development')}, https://finitydevelopment.com`))
	console.log('')
	console.log(chalk.blue(`cd ${a.PROJECT_NAME}/sdf npm i`))
	console.log(chalk.blue(`cd ${a.PROJECT_NAME}/client npm i`))
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
	const validationResult = validateProjectName(appName)
	if (!validationResult.validForNewPackages) {
		console.error(
			chalk.red(`Cannot create a project named ${chalk.green(`"${appName}"`)} because of npm naming restrictions:\n`)
		)
		;[...(validationResult.errors || []), ...(validationResult.warnings || [])].forEach((error) => {
			console.error(chalk.red(`  * ${error}`))
		})
		console.error(chalk.red('\nPlease choose a different project name.'))
		process.exit(1)
	}

	// TODO: there should be a single place that holds the dependencies
	const dependencies = ['react', 'react-dom', 'react-scripts', 'vue', 'angular'].sort()
	if (dependencies.includes(appName)) {
		console.error(
			chalk.red(
				`Cannot create a project named ${chalk.green(
					`"${appName}"`
				)} because a dependency with the same name exists.\n` +
					`Due to the way npm works, the following names are not allowed:\n\n`
			) +
				chalk.cyan(dependencies.map((depName) => `  ${depName}`).join('\n')) +
				chalk.red('\n\nPlease choose a different project name.')
		)
		process.exit(1)
	}
}
