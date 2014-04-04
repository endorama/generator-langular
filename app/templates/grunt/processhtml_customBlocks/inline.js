/**
 * grunt-processhtml customBlock
 *
 * Enable inclusion of file content inline.
 * Can handle CSS or JS files.
 *
 * Example with css:
 *   <!-- process:inline css,css/style.css -->
 *   <link rel="stylesheet" type="text/css" href="css/style.css" />
 *   <!-- /process -->
 *
 * Example js:
 *   <!-- process:inline js,js/script.js -->
 *   <script src="js/script.js" type="text/javascript" charset="utf-8"></script>
 *   <!-- /process -->
 */
module.exports = function(processor) {
  processor.registerBlockType('inline', function(content, block, blockLine, blockContent) {
    var grunt = require('grunt');
    var path = require('path');
    var log = grunt.verbose;
    var args = block.asset.split(',');

    log.subhead('Processing inline');
    log.writeflags(block);

    // we need 2 args: inline resource type ( js or css ) and file path
    if (args.length < 2 ) {
      grunt.fail.warn('Unknown type of inline media, please specify one "type,file"');
      return content;
    }

    // get file
    var src = grunt.file.read(path.join(grunt.config('processhtml.options.inline.src'), args[1]));

    // wrap with correct tag
    var wrap = '';
    if (args[0] == 'css')
      wrap = '<style type="text/css">' + src + '</style>';
    else if (args[0] == 'js')
      wrap = '<script type="text/javascript">' + src + '</script>';

    // replace
    var result = content.replace(blockLine, wrap);

    // return
    return result;
  });
};
