/**
 * @NAPIVersion 2.1
 * @NScriptType UserEventScript
 * @author Finity - Mayer Lench
 */

import { EntryPoints } from 'N/types'

export const afterSubmit: EntryPoints.UserEvent.afterSubmit = (context: EntryPoints.UserEvent.afterSubmitContext) => {
	const { newRecord, UserEventType, type } = context
}
export const beforeSubmit: EntryPoints.UserEvent.beforeSubmit = (context: EntryPoints.UserEvent.beforeSubmitContext) => {
	const { newRecord, UserEventType, type } = context
}
export const beforeLoad: EntryPoints.UserEvent.beforeLoad = (context: EntryPoints.UserEvent.beforeLoadContext) => {
	const { newRecord, UserEventType, type } = context
}

