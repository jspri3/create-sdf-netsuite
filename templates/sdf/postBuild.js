const JavaScriptObfuscator = require('javascript-obfuscator')
const fs = require('fs')
const path = require('path')
const projectFolder = 'dist/FileCabinet/SuiteScripts/<%=FILE_CAB_FOLDER%>/'

const options = {
	obfuscator: false
}

console.log('Executing post-build')

function obfuscatorRecursive(directoryPath) {
	console.log('obfuscating your beautiful code')
	const filesToProcess = fs.readdirSync(directoryPath)

	filesToProcess.forEach((fileName) => {
		const origFilePath = path.join(directoryPath, fileName)

		// get stats about the current file
		const stats = fs.statSync(origFilePath)
		const SKIP_FILES = ['libs', 'client']

		if (SKIP_FILES.includes(fileName)) return

		if (stats.isFile()) {
			if (!includeFile(fileName)) return
			console.log('obfuscatorRecursive -> origFilePath', fileName)
			var contents = JavaScriptObfuscator.obfuscate(fs.readFileSync(origFilePath, 'utf8'))

			fs.writeFileSync(origFilePath, contents, 'utf8')
		} else if (stats.isDirectory()) {
			// recursive call
			obfuscatorRecursive(path.join(directoryPath, fileName))
		}
	})
}

const includeFile = (fileName) => {
	return ['.js'].find((f) => fileName.includes(f))
}

if (options.obfuscator) obfuscatorRecursive(projectFolder)
else	
	console.log('Obfuscator is not running on deploys.\nTo have it run, set "obfuscator: true" in the postBuild.js file')
