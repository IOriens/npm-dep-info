#!/usr/bin/env node
const fs = require('fs')
const nfo = require('nfo')
const { resolve } = require('path')

let content = JSON.parse(
  fs.readFileSync(resolve(process.cwd(), 'package.json'))
)

if (content.dependencies) {
  parseDeps(content.dependencies)
}

if (content.devDependencies) {
  parseDeps(content.devDependencies)
}

function parseDeps (deps) {
  let items = Object.keys(deps)
  nfo(items, 'description').then(results => {
    Object.keys(results).forEach(name => {
      console.log(name)
      console.log('  => ' + results[name].value)
      console.log('  => ' + `https://www.npmjs.com/package/${name}`)
      console.log('')
    })
  })
}
