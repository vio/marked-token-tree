const marked = require('marked')

module.exports = buildTree

function buildTree (source) {
  const tokens = marked.lexer(source)

  let tree = new Block({})
  let currentBlock = tree

  tokens.forEach((token) => {
    if (token.type !== 'heading') {
      currentBlock.addContent(token)
      return
    }

    // The main header
    if (currentBlock.depth === 0) {
      currentBlock.depth = 1
      currentBlock.heading = token.text
      return
    }
      // Create a new child block when the depth is smaller than current
    if (token.depth >= currentBlock.depth + 1) {
      token.depth = currentBlock.depth + 1
      currentBlock = currentBlock.addChild(token)
      return
    }

    const parent = lookupParent(currentBlock, token.depth - 1)
    currentBlock = parent.addChild(token)
  })

  return tree
}

function lookupParent (block, depth) {
  if (block.depth === depth) {
    return block
  }

  return lookupParent(block.parent, depth)
}

function Block ({ text = '', depth = 0 }) {
  this.heading = text
  this.depth = depth
  this.content = []
  this.children = []

  return this
}

Block.prototype.addContent = function (token) {
  this.content.push(token)
}

Block.prototype.addChild = function (token) {
  const childBlock = new Block(token)

  childBlock.parent = this
  this.children.push(childBlock)

  return childBlock
}
