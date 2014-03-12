# drouter

A node.js directory-driven router for connect/express.

It does not use the router functionality of connect/express. The new version of connect(3.x)/express(4.x) should be compatible.

## Usage

```javascript
    var drouter = require("drouter"),
        express = require("express"),
        app = express(); // connect();
    
    
    drouter("directory_root", app, "some user defined data object");
    // return a list of path and middleware pairs 
    //    [{pt:"loaded path", mw:"loaded module"}, ...].
    // at this point, app has all the middleware loaded at their path
    // using "app.use(path, middlewareCreator(userData))"
    
```

## Example

Suppose we have a directory structure as follow:

    +mw1
        index.js
        +abc
            index.js
            +def
                index.js
                +fgh
                   + hij
                        index.js
                    +ijk
                +ghi
            +efg
        +bcd
            index.js
        +cde

Each `index.js` file exports a function which takes in a user defined data object and returns a connect/express compatible middleware.
`drouter("mw1", app, {msg:"some msg"})` will load the app at these paths :

    /mw1
    /mw1/abc
    /mw1/abc/def
    /mw1/bcd

The `index.js` under hij will not be loaded because its parent directory `fgh` is not loadable and thus all its children are ignored.
Loadable condititon is applied by `require.resolve("module")`.

## Other

Suggestion and help are always welcome !

## Licence

MIT