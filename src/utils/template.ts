import * as ejs from "ejs"
import * as fs from "fs"
import * as path from "path"
import chalk from "chalk"
import { TemplateConfig, CliOptions, CliAnswers } from "../types"

export const render = (content: string, data: CliAnswers) => ejs.render(content, data)

export function getTemplateConfig(templatePath: string): TemplateConfig {
  const configPath = path.join(templatePath, ".template.json")

  if (!fs.existsSync(configPath)) return {}

  const templateConfigContent = fs.readFileSync(configPath)

  if (templateConfigContent) {
    return JSON.parse(templateConfigContent.toString())
  }

  return {}
}

export function createProject(projectPath: string) {
  if (fs.existsSync(projectPath)) {
    console.log(chalk.red(`Folder ${projectPath} exists. Delete or use another name.`))
    return false
  }

  fs.mkdirSync(projectPath)
  return true
}

export function createDirectoryContents(o: CliOptions, a: CliAnswers) {
  const filesToCreate = fs.readdirSync(o.templatePath)

  filesToCreate.forEach((file) => {
    const origFilePath = path.join(o.templatePath, file)

    // get stats about the current file
    const stats = fs.statSync(origFilePath)
    const SKIP_FILES = ["node_modules", ".template.json"]
    if (SKIP_FILES.indexOf(file) > -1) return

    const fileName = renderFileName(file, a)
    if (stats.isFile()) {
      
      var writePath = path.join(o.targetCreateDir, o.projectName, fileName)
      if (excludeFromRender(file)) return fs.copyFileSync(origFilePath, writePath)

      var contents = render(fs.readFileSync(origFilePath, "utf8"), a)
      fs.writeFileSync(writePath, contents, "utf8")
    } else if (stats.isDirectory()) {
      fs.mkdirSync(path.join(o.targetCreateDir, o.projectName, fileName))
      if (fileName === "ello") console.log("YOO", path.join(o.projectName, fileName))
      // recursive call
      createDirectoryContents(
        {
          ...o,
          templatePath: path.join(o.templatePath, file),
          projectName: path.join(o.projectName, fileName),
        },
        a
      )
    }
  })
}

const renderFileName = (fileName: string, a: CliAnswers) => {
  const name = fileName.replace(/%-/g, "<%=").replace(/-%/g, "%>")

  return ejs.render(name, a)
}

const excludeFromRender = (fileName: string) => {
  return [".png", ".jpg", ".tiff", '.html'].find((f) => fileName.includes(f))
}
