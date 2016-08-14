## What
Normally, Webpack looks for **index** file when the path passed to `require` points to a directory; which means there may have a lot of **index** files. It's also hard for debugging since the DevTools will report an error in **index**.

This plugin makes it possible to use the name of the directory as the name of the entry file, makes it easier to find.

## Usage

Add the following to Webpack's config file:

```javascript
  var ComponentDirectoryPlugin = require("component-directory-webpack-plugin");

  resolve: {
    extensions: ['', '.js', '.jsx'],
    plugins: [new ComponentDirectoryPlugin()]
  },

```

Then when `import MyComponent from 'components/MyComponent'` and the path "component/MyComponent" is resolved to a directory, Webpack will try to look for `component/MyComponent/MyComponent.js` as the entry.

If there is also an index file, e.g. `index.js`, and it should be used as entry file instead of the file with the same name of directory, pass `true` as the first argument when creating new instance.

## Copyright

Copyright (c) 2016 Sebastian Deutsch / [9elements](http://9elements.com/)
