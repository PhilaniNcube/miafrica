"use server"

import configPromise from "@payload-config"
import { handleServerFunctions } from "@payloadcms/next/layouts"
import { importMap } from "./admin/importMap.js"
import type { ServerFunctionClient } from "payload"

const serverFunction: ServerFunctionClient = async (args) => {
  return handleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  })
}

export { serverFunction }