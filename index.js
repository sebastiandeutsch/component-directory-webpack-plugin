var path = require("path");
var forEachBail = require("enhanced-resolve/lib/forEachBail");
var createInnerCallback = require("enhanced-resolve/lib/createInnerCallback");
var basename = require("enhanced-resolve/lib/getPaths").basename;

var assign = require("object-assign");

module.exports = ComponentDirectoryPlugin;

function ComponentDirectoryPlugin(honorIndexFile) {
  if(honorIndexFile === undefined) {
    this.honorIndexFile = false;
  } else {
    this.honorIndexFile = honorIndexFile;
  }
}

ComponentDirectoryPlugin.prototype.apply = function (resolver) {
  var honorIndexFile = this.honorIndexFile;
  resolver.plugin("directory", function(request, callback) {
    var fs = resolver.fileSystem;
    var topLevelCallback = callback;
    var filename = basename(request.path);

    var filePath = resolver.join(request.path, filename);

    forEachBail(
      honorIndexFile ? [resolver.join(request.path, "index"), filePath] : [filePath],
      function(file) {
        var obj = assign({}, request, {
          path: file,
          relativePath: request.relativePath && resolver.join(request.relativePath, filename)
        });
        resolver.doResolve("raw-file", obj, "using path: " + filePath, callback);
      },
      function(result) {
        return result ? callback(null, result) : callback();
      }
    );
  });
};
