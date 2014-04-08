module.exports = {
  options: {
    logConcurrentOutput: true,
    limit: 20
  },
  frontend: {
    tasks: [
      'shell:artisan',
      'customWatch:angularapp:livereload'
    ]
  },
  backend: {
    tasks: [
      'customWatch:laravelapp:apidoc'
    ]
  }
};
