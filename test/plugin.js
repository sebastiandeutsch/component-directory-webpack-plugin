var ResolverFactory = require("enhanced-resolve/lib/ResolverFactory");
var ComponentDirectoryPlugin = require("../index");
var should = require("should");
var path = require("path");

describe("plugins", function() {
  it("should resolve with the ComponentDirectoryPlugin", function(done) {
    var resolver = ResolverFactory.createResolver({
      fileSystem: require("fs"),
      plugins: [
        new ComponentDirectoryPlugin()
      ]
    });

    resolver.resolve({}, __dirname, "./fixtures/MyAwesomeComponent", function(err, result) {
      if(err) return done(err);
      result.should.be.eql(path.resolve(__dirname, "fixtures/MyAwesomeComponent/MyAwesomeComponent.js"));
      done();
    });
  });

  it("should resolve with the ComponentDirectoryPlugin but use index as default case", function(done) {
    var resolver = ResolverFactory.createResolver({
      fileSystem: require("fs"),
      plugins: [
        new ComponentDirectoryPlugin()
      ]
    });

    resolver.resolve({}, __dirname, "./fixtures/RandomDirectory", function(err, result) {
      if(err) return done(err);
      result.should.be.eql(path.resolve(__dirname, "fixtures/RandomDirectory/index.js"));
      done();
    });
  });

  it("should resolve with the ComponentDirectoryPlugin but don't honor the index", function(done) {
    var resolver = ResolverFactory.createResolver({
      fileSystem: require("fs"),
      plugins: [
        new ComponentDirectoryPlugin(false)
      ]
    });

    resolver.resolve({}, __dirname, "./fixtures/UglyEdgeCase", function(err, result) {
      if(err) return done(err);
      result.should.be.eql(path.resolve(__dirname, "fixtures/UglyEdgeCase/UglyEdgeCase.js"));
      done();
    });
  });

  it("should resolve with the ComponentDirectoryPlugin but honor the index", function(done) {
    var resolver = ResolverFactory.createResolver({
      fileSystem: require("fs"),
      plugins: [
        new ComponentDirectoryPlugin(true)
      ]
    });

    resolver.resolve({}, __dirname, "./fixtures/UglyEdgeCase", function(err, result) {
      if(err) return done(err);
      result.should.be.eql(path.resolve(__dirname, "fixtures/UglyEdgeCase/index.js"));
      done();
    });
  });
});
