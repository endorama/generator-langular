module.exports = {
  options: {
    logConcurrentOutput: true,
    limit: 20
  },
  frontend: {
    tasks: [
      'shell:artisan',
      'customWatch:angularapp:livereload:frontend_test'
    ]
  },
  backend: {
    tasks: [
      'watch:apidoc:backend_test:laravelapp'
    ]
  }
};
