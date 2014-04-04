module.exports = {
  options: {
    livereload: true,
    spawn: true
  },

  apidoc: {
    files: [ 'app/**/*.php' ],
    tasks: [ 'apidoc:compile', 'notify:apidoc' ]
  },

  angularapp: {
    files: 'angularapp/*.js',
    tasks: [ 'newer:jshint:angularapp' ],
  },

  assets_js: {
    files: 'assets/js/*.js',
    tasks: [ 'newer:jshint:assets' ],
  },

  laravelapp: {
    files: [ 'app/**/*.php', 'bootstrap/**/*.php' ],
    tasks: [ 'newer:phplint:laravelapp' ]
  },

  // enable livereload, see http://livereload.com/
  // little hack to include symlinked file in livereload
  livereload: {
    files: [ 'public/**/*', 'app/views/angularjs/application.php' ],
    tasks: []
  },

  backend_test: {
    files: [ 'app/tests/**/*Test.php' ],
    tasks: [ 'shell:phpunit' ]
  },

  frontend_test: {},

};
