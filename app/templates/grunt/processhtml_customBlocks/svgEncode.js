/**
 * grunt-processhtml customBlock
 *
 * Include svg file base64 encoded in a <img> tag
 *
 * Example:
 *   <!-- build:svgEncode path/to/image.svg -->
 *   <img alt="" src="image.svg" />
 *   <!-- /build -->
 */
module.exports = function(processor) {
  processor.registerBlockType('svgEncode', function(content, block, blockLine, blockContent) {
    var grunt = require('grunt');
    var log = grunt.verbose;
    var cheerio = require('cheerio');

    log.subhead('Processing customBlock');
    log.writeflags(block);

    log.write('Encoding content as base64...');

    var src = grunt.file.read(block.asset);
    var base64src = new Buffer(src).toString('base64');

    log.ok();
    log.debug(base64src);

    log.write('Replacing src with encoded string...');

    var $ = cheerio.load(blockContent);
    $('img').attr('src', 'data:image/svg+xml;base64,' + base64src);
    var result = content.replace(blockLine, $.html());

    log.ok();

    return result;
  });
};
