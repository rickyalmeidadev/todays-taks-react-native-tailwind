const fs = require('fs/promises')
const inquirer = require('inquirer')
const helpers = require('./helpers')
const utils = require('./utils')

inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Component name:',
      validate: input => (input.length > 0 ? true : 'Please enter a name')
    }
  ])
  .then(async answers => {
    const name = helpers.toPascalCase(answers.name)
    const paths = utils.makePaths(name)
    const templates = await utils.makeTemplates(paths, name)

    await fs.mkdir(paths.dir)
    await Promise.all([
      fs.writeFile(paths.component, templates.component),
      fs.writeFile(paths.test, templates.test),
      fs.appendFile(paths.index, templates.index)
    ])
  })
