module.exports = {
  artisan: {
    options: {
      stdout: true
    },
    command: 'php artisan serve'
  },
  phpunit: {
    options: {
      stdout: true,
      stderr: true
    },
    command: './vendor/bin/phpunit'
  },
};
