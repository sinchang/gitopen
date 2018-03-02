#!/usr/bin/env node
'use strict'

const execSync = require(`child_process`).execSync
const cac = require(`cac`)
const updateNotifier = require(`update-notifier`)
const opn = require(`opn`)
const pkg = require(`./package.json`)

updateNotifier({ pkg }).notify()

const cli = cac()

// Add a default command
const defaultCommand = cli.command(
  `*`,
  {
    desc: `The default command`
  },
  (input, flags) => {
    try {
      const cmd = execSync(`git remote get-url ${flags.name || `origin`}`)

      opn(cmd.toString().trim())
      process.exit()
    } catch (err) {
      console.error(err.message)
      process.exit(1)
    }
  }
)

defaultCommand.option(`name`, {
  desc: `Tell me the remote name`
})

// Bootstrap the CLI app
cli.parse()
