module.exports = {
  apidoc: {
    files: [ 'app/**/*.php' ],
    tasks: [ 'apidoc:compile', 'notify:apidoc' ]
  },

  angularapp: {
    files: 'angularapp/**/*.js',
    tasks: [ 'newer:jshint:angularapp' ],
  },

  assets_js: {
    files: 'assets/js/*.js',
    tasks: [ 'newer:jshint:assets' ],
  },

  laravelapp: {
    files: [ 'app/**/*.php', 'bootstrap/**/*.php' ],
    tasks: [ 'newer:phplint:laravelapp', 'shell:phpunit' ]
  },

  // enable livereload, see http://livereload.com/
  // little hack to include symlinked file in livereload
  livereload: {
    files: [ 'public/**/*', 'app/views/angularjs/application.php' ],
    tasks: [],
    options: {
      livereload: true
    }
  },

  backend_test: {
    files: [ 'app/tests/**/*Test.php' ],
    tasks: [ 'shell:phpunit' ]
  },

  frontend_test: {
    files: [ 'angularapp/**/*.js' ],
    tasks: [  ]
  },

};
