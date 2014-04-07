'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var fs = require('fs');

var LangularGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.tagline = 'Generated on ' + new Date() + ' by generator-langular#' + this.pkg.version;

    this.on('end', function () {
      if (!this.options['skip-install']) {

        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic Langular generator.'));

    var prompts = [
      {
        name: 'angularAppName',
        message: 'Please enter your Angular application name: '
      },
      {
        type: 'confirm',
        name: 'useGruntTime',
        message: 'Would you like to enable time-grunt?',
        default: false
      },
      {
        type: 'confirm',
        name: 'overwriteLaravel',
        message: 'Would you like to overwrite some Laravel config automatically?',
        default: true
      },
      // {
      //   type: 'confirm',
      //   name: 'useCoffee',
      //   message: 'Would you like to enable coffeescript?',
      //   default: false
      // },
      // {
      //   type: 'confirm',
      //   name: 'useSass',
      //   message: 'Would you like to enable sass?',
      //   default: false
      // }
    ];

    this.prompt(prompts, function (props) {
      this.opts = {
        laravelAppName: (props.laravelAppName) ? props.laravelAppName : false,
        angularAppName: (props.angularAppName) ? props.angularAppName : false,
        useGruntTime: (props.useGruntTime) ? props.useGruntTime : false,
        overwriteLaravel: (props.overwriteLaravel) ? props.overwriteLaravel : false,
        useCoffee: (props.useCoffee) ? props.useCoffee : false,
        useSass: (props.useSass) ? props.useSass : false,
      };

      done();
    }.bind(this));
  },

  app: function () {
    console.log(this.opts);

    var prepareGrunt = function() {
      this.template('_Gruntfile.js', 'Gruntfile.js');
      this.directory('grunt', '.grunt');
      this.template('_aliases.yml', '.grunt/aliases.yml');
    }.bind(this);

    var createAngular = function() {
      // scaffold folders
      this.mkdir('angularapp');
      this.write('angularapp/.gitkeep', '');
      this.mkdir('angularapp/modules');
      this.write('angularapp/modules/.gitkeep', '');
      this.mkdir('angularapp/specs');
      this.write('angularapp/specs/.gitkeep', '');
      this.mkdir('angularapp/templates');
      this.write('angularapp/templates/.gitkeep', '');

      // scaffold files
      this.template('angularjs/_app.js', 'angularapp/app.js');
      this.template('angularjs/_config.js', 'angularapp/config.js');
      this.template('angularjs/_routes.js', 'angularapp/routes.js');

      // copy example module
      this.directory('angularmodule', 'angularapp/modules/example');

      // scaffold laravel angular index template folder
      this.mkdir('app/views/angularjs');

      // copy angularjs index template
      this.template('_angularjs.php', 'app/views/angularjs/application.php');
      
      // overwrite laravel home controller
      if (this.opts.overwriteLaravel)
        this.copy('HomeController.php', 'app/controllers/HomeController.php');

    }.bind(this);

    var createAssets = function() {
      this.mkdir('assets');

      if (this.opts.useSass) {
        this.mkdir('assets/sass');
        this.write('assets/sass/.gitkeep', '');
      }
      else {
        this.mkdir('assets/css');
        this.write('assets/css/.gitkeep', '');
      }

      this.mkdir('assets/font');
      this.write('assets/font/.gitkeep', '');
      this.mkdir('assets/img');
      this.write('assets/img/.gitkeep', '');
      this.mkdir('assets/js');
      this.write('assets/js/.gitkeep', '');
      this.mkdir('assets/json');
      this.write('assets/json/.gitkeep', '');
      this.mkdir('assets/vendor');
      this.write('assets/vendor/.gitkeep', '');
    }.bind(this);

    var createDocs = function() {
      this.mkdir('docs');
      this.mkdir('docs/api');
    }.bind(this);

    var moveTemplate = function() {
      this.template('_bower.json', 'bower.json');
      this.template('_package.json', 'package.json');
    }.bind(this);

    var copyFiles = function() {
      this.copy('bowerrc', '.bowerrc');
      this.copy('editorconfig', '.editorconfig');
      this.copy('jshintrc', '.jshintrc');
      this.copy('jshintignore', '.jshintignore');
    }.bind(this);

    var editGitignore = function() {
      var path = require('path');

      var gitignore = path.join(this.destinationRoot(), '.gitignore');

      var to_be_added = "\n\
# generator-langular #\n\
# dependencies\n\
assets/vendor\n\
node_modules\n\
# development\n\
public/angularapp\n\
public/css\n\
public/js\n\
public/json\n\
public/vendor\n\
# production\n\
public/angularapp.js\n\
public/styles.css\n\
public/vendors.js\n\
# docs\n\
api/docs\n\
# cache\n\
.tmp\n\
# End generator-langular #\n";

      fs.appendFileSync(gitignore, to_be_added);
    }.bind(this);

    prepareGrunt();
    createAngular();
    createAssets();
    createDocs();
    moveTemplate();
    copyFiles();
    editGitignore();
  },
});

module.exports = LangularGenerator;
