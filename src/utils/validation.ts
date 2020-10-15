//may only include letters, numbers, and underscores
export const defaultStringValidate = (input: string) => /^([A-Za-z\-\_\d])+$/.test(input)
