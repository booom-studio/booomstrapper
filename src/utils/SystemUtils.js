'use strict'

import { exec } from 'child_process'
import Logger from '../Logger'

async function runCommand(command, showOutput = true, resolveOutput = true) {
  Logger.debug(`Running command: ${command}`)

  const childProcess = exec(command, { cwd: process.cwd() }, error => {
    if (error) {
      Logger.error(`exec error: ${error}`)
    }
  })
  let data = ''
  childProcess.stdout.on('data', chunck => data += chunck)
  if (showOutput) {
    childProcess.stdout.pipe(process.stdout)
  }
  return new Promise(resolve => {
    childProcess.on('exit', async () => {
      if (resolveOutput) {
        resolve(data)
      } else {
        resolve(true)
      }
    })
  })
}

module.exports = {
  runCommand
}
