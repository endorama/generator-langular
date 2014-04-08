module.exports = {
  options: {
    jshintrc: '.jshintrc',
    reporter: require('jshint-stylish')
  },
  angularapp: [ 'angularapp/**/*.js' ],
  assets: [ 'assets/js/**/*.js' ]
};
