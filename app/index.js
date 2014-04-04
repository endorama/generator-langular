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
        default: false
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
      this.mkdir('angularapp');
      this.mkdir('angularapp/modules');
      this.mkdir('angularapp/specs');
      this.mkdir('angularapp/templates');

      // create file array for the first scaffolding
      var files = [];
      if (this.opts.useCoffee) {
        files.push('angularapp/app.coffee');
        files.push('angularapp/config.coffee');
        files.push('angularapp/routes.coffee');
      }
      else {
        files.push('angularapp/app.js');
        files.push('angularapp/config.js');
        files.push('angularapp/routes.js');
      }

      // create files, but only if do not exists ( enable updating project )
      for (var i = files.length - 1; i >= 0; i--) {
        var file = files[i];

        if (!fs.existsSync(file)) {
          if (this.opts.useCoffee)
            this.write(file, '# ' + this.tagline);
          else
            this.write(file, '// ' + this.tagline);
        }
      };

      this.mkdir('app/views/angularjs');
      this.template('_angularjs.php', 'app/views/angularjs/application.php');
      if (this.opts.overwriteLaravel)
        this.copy('HomeController.php', 'app/controllers/HomeController.php');
    }.bind(this);

    var createAssets = function() {
      this.mkdir('assets');

      (this.opts.useSass) ? this.mkdir('assets/sass') : this.mkdir('assets/css');

      this.mkdir('assets/font');
      this.mkdir('assets/img');
      this.mkdir('assets/js');
      this.mkdir('assets/json');
      this.mkdir('assets/vendor');
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
