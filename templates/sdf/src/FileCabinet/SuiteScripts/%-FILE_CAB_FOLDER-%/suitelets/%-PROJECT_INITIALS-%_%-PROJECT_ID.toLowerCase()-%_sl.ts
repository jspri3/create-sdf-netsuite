/**
 *@NApiVersion 2.0
 *@NScriptType Suitelet
 *@NModuleScope Public
 */

import { EntryPoints } from "N/types"

const onRequest: EntryPoints.Suitelet.onRequest = (context: EntryPoints.Suitelet.onRequestContext) => {
  const response = context.response
  const request = context.request

}

export = {
  onRequest
}
