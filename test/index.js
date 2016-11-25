/* global describe, it */

const path = require('path')
const fs = require('fs')
const { get } = require('lodash')
const assert = require('assert')
const tree = require('../')

const filename = path.join(__dirname, 'source.md')
const source = fs.readFileSync(filename, 'utf-8')
const tokens = tree(source)

const tests = {
  'heading.text': 'Main heading',
  'content[0].text': 'Main block text',
  'children[0].heading.text': 'Section 1',
  'children[0].children[1].content[1].type': 'code',
  'children[0].children[1].heading.text': 'Section 1.2',
  'children[1].content[0].text': 'Second level block text'
}

describe('Build the token tree', () => {
  for (let key in tests) {
    it(key, () => assert.equal(get(tokens, key), tests[key]))
  }
})
