import { readFileSync, existsSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { createRequire } from 'node:module'
import { resolve, dirname, join } from 'node:path'

const projectRoot = resolve(process.cwd())
const require = createRequire(resolve(projectRoot, 'package.json'))

// Manually load .env file
const envContent = readFileSync(resolve(projectRoot, '.env'), 'utf-8')
for (const line of envContent.split('\n')) {
  const match = line.match(/^\s*([^#=\s]+)\s*=\s*(.*)$/)
  if (match) {
    process.env[match[1]] = match[2].trim()
  }
}

// Resolve payload package directory without triggering loadEnv
const payloadEntryPath = require.resolve('payload')
const payloadDir = dirname(payloadEntryPath)

// Import findConfig and generateImportMap directly by file path
const findConfigPath = join(payloadDir, 'config', 'find.js')
const genImportMapPath = join(payloadDir, 'bin', 'generateImportMap', 'index.js')

const { findConfig } = require(findConfigPath)
const { generateImportMap } = await import(pathToFileURL(genImportMapPath).toString())

const configPath = findConfig()
console.log('Config found at:', configPath)

const configModule = await import(pathToFileURL(configPath).toString())
let config = configModule
if (configModule.default) {
  config = await configModule.default
}

console.log('Generating import map...')
await generateImportMap(config)
console.log('Done!')
process.exit(0)