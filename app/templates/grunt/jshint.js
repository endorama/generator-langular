module.exports = {
  options: {
    jshintrc: true,
    reporter: require('jshint-stylish')
  },
  angularapp: [ 'angularapp/**/*.js' ],
  assets: [ 'assets/js/**/*.js' ]
};
