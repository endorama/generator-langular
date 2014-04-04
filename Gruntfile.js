module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json'], // '-a' for all files
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
      }
    },
    shell: {
      options: {
        callback: function(err, stdout, stderr, cb) {
          if (err)
            return grunt.log.error(err)

          grunt.log.writeln(stdout);

          cb();
        },
      },
      'npm-publish': {
        command: 'npm publish --registry="http://registry.npmjs.org"'
      },
      'npm-unpublish': {
        command: 'npm unpublish --registry="http://registry.npmjs.org" <%= pkg.name %>@<%= pkg.version %>'
      },
      'git-status': {
        options: {
          callback: function(err, stdout, stderr, cb) {
            if (err)
              return grunt.log.error(err)
            if (stdout)
              return grunt.fail.warn('Dirty workspace, cannot push to NPM.\n' + stdout + '\n');

            cb();
          },
        },
        command: 'git status -s'
      }
    }
  });

  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('release', 'Perform a release of the package', function(type) {
    // grunt.task.run([ 'shell:git-status', 'bump-only', 'shell:npm-publish']);
    grunt.task.run([ 'shell:git-status', 'bump:' + (type ? type : 'patch'), 'shell:npm-publish']);
  });

  return grunt;
};
