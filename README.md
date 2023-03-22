# Coding Graphics

### Getting started

#### Execution
```sh
node index.js
```

#### For development
```sh
nodemon -x "clear;node" index.js
```

#### Inputs ([index.js](index.js))
```js
const graphics = [
    new Graphic("Label 1", 6),
    new Graphic("Label 2", 2.9),
    new Graphic("Label 3", 3.85),
]
```

#### Result
```sh
 | ********** |            |            | 
 | ********** |            |            | 
 | ********** |            |            | 
 | ********** |            | ****       | 
 | ********** |            | ********** | 
 | ********** | ********** | ********** | 
 | ********** | ********** | ********** | 
 | ********** | ********** | ********** | 
 | ********** | ********** | ********** | 
 | ********** | ********** | ********** | 
 | Label 1    | Label 2    | Label 3    |
```
