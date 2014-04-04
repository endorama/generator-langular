module.exports = {
  options: {
    // to avoid conflicts with grunt-usemin
    commentMarker: 'process',
    customBlockTypes: [
      '.grunt/processhtml_customBlocks/inline.js',
      '.grunt/processhtml_customBlocks/pngEncode.js',
      '.grunt/processhtml_customBlocks/svgEncode.js',
    ],
    data: {
      // set a custom path for insile custom block file
      inline: {
        src: ''
      }
    }
  },
  build_index: {
    options: {
      data: {
        googleAnalytics: {
          uid: '',
          url: ''
        },
      }
    },
    files: {
      'app/views/angularjs/application_production.php': [ 'app/views/angularjs/application.php' ]
    }
  },
  build_templates: {
    options: {
      data: {}
    },
    files: [{
      expand: true,
      cwd: 'angularapp',
      src: ['**/*.html'],
      dest: 'public/angularapp/'
    }]
  }
};
