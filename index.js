var findRoot = require('find-root'),
    path = require('path'),
    through2 = require('through2');

function versionify(options) {

    options = options || {};

    var filter = options.filter,
        placeholder = options.placeholder || '__VERSION__',
        version = options.version ||
            require(path.join(findRoot(process.cwd()), 'package.json')).version,
        re = new RegExp(placeholder, 'g');

    return function(file, opts) {
        if (filter && !filter.test(file)) return through2();
        return through2({objectMode: true}, function(chunk, encoding, callback) {
            return callback(null, chunk.toString().replace(re, version))
        });
    }
}

exports = module.exports = versionify();

exports.configure = versionify;
