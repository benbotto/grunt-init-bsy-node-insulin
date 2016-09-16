'use strict';

// Basic template description.
exports.description = 'Create a seed for a project using Node.js and insulin.';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install project dependencies with _npm install_.';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({}, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('version'),
    init.prompt('description'),
    init.prompt('repository', function(val, props, done) {
      done(null, `git://github.com/benbotto/${props.name}.git`);
    }),
    init.prompt('license', 'ISC'),
    init.prompt('author_name', 'Ben Botto'),
    init.prompt('node_version', grunt.package.engines.node),
    init.prompt('private', false)
  ], function(err, props) {
    // Set a few scaffolding-specific properties.
    props.devDependencies = {
      "grunt": "^1.0.1",
      "grunt-contrib-jshint": "^1.0.0",
      "grunt-contrib-watch": "^1.0.0",
      "grunt-jasmine-nodejs": "^1.5.4"
    };

    props.dependencies = {
      "deferred": "^0.7.5",
      "glob": "^7.0.6",
      "insulin": "^1.0.7"
    };

    props.scripts = {
      start: 'node ./app'
    };

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file.
    init.writePackageJSON('package.json', props);

    // All done!
    done();
  });
};
