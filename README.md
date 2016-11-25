# marked-token-tree

Build a tocken tree from [marked](https://www.npmjs.com/package/marked) tokens.

---

1. [Installation](#installation)
2. [Usage](#usage)
  1. [Get the tree object](#get-the-tree-object)
  2. [Walk the token tree](#walk-the-token-tree)


## Instalation

```sh
npm install --dev marked-token-tree
```

## Usage

### Get the tree object

```js
const tree = require('marked-token-tre')

const source = `
    # Main heading
    Main block text

    ## Section 1
    Second level block text

    ### Section 1.1
    Third level block text

    ### Section 1.2
    Third level block text

    \```stylus
    .element
    color: black
    \```

    \```css
    .element {
    color: #000;
    }
    \```

    ## Section 2

    Second level block text
  `;
  
  const output = tree(source);
  
  console.log(output);
```

will output:

```json
{  
  "heading":"Main heading",
    "depth":1,
    "content":[ {  
      "type":"paragraph",
      "text":"Main block text"
    }],
    "children":[{  
      "heading":"Section 1",
      "depth":2,
      "content":[{  
        "type":"paragraph",
        "text":"Second level block text"
      }],
      "children":[{  
        "heading":"Section 1.1",
        "depth":3,
        "content":[{  
            "type":"paragraph",
            "text":"Third level block text"
          }]
      }, {  
        "heading":"Section 1.2",
        "depth":3,
        "content": [{  
            "type":"paragraph",
            "text":"Third level block text"
          }, {  
            "type":"code",
            "text":".element\n    color: black",
            "lang":"stylus"
          }, {  
            "type":"code",
            "text":".element {\n    color: #000;\n}",
            "lang":"css"
          }]
      }]
    }, {  
      "heading":"Section 2",
      "depth":2,
      "content":[{  
          "type":"paragraph",
          "text":"Second level block text"
        }]
    }]
}
```

### Walk the token tree

```js
const fs = require('fs')
const tree = require('marked-token-tree')
const source = fs.readFileSync('./source.md')

tree(source).walk((token, block) => {
  // process token and coresponding block
})
