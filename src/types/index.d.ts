export interface TemplateConfig {
  files?: string[]
  postMessage?: string
}

export interface CliOptions {
  projectName: string
  targetCreateDir: string
  templateName: string
  templatePath: string
  tartgetPath: string
  config: TemplateConfig
}

export interface CliAnswers {
  PROJECT_NAME: string
  PROJECT_INITIALS: string
  PROJECT_ID: string
  ACCOUNT_ID: string
  GITIGNORE_FILE: string
  FILE_CAB_FOLDER: string
}
